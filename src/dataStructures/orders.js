// Lynn Ong. 2021

import * as React from 'react';
import { useState } from 'react';
import { Container, Input } from '@material-ui/core';
import {
	List,
	Datagrid,
	TextField,
	DateField,
	ArrayField,
	ReferenceField,
	EditButton,
	Edit,
	SimpleForm,
	SimpleFormIterator,
	TextInput,
	DateInput,
	ArrayInput,
	NumberInput,
	Create,
	ReferenceInput,
	SelectInput,
	AutocompleteInput,
	NumberField,
	Button,
	Confirm,
	useUpdateMany,
	useRefresh,
	useNotify,
	useUnselectAll,
	BulkDeleteWithUndoButton,
	useGetMany,
	BooleanField,
	BooleanInput,
	useGetList
} from 'react-admin';
import { AttachMoney, Clear, Check, Height, LocalShipping, Print, GpsFixed } from '@material-ui/icons';
import { Back } from './globals.js';
import { Filter } from './orders-filter.js';
import uniqid from 'uniqid';
import printjs from 'print-js';

const BiggestOrderCodePlusOne = () => {
	let biggest = 0;
	const { data } = useGetList("orders");

	for (const x in data){
		if (data[x].order_code > biggest) {
			biggest = data[x].order_code;
		}

		return biggest + 1;
	}
}

const BiggestShipmentCode = () => {
	let biggest = 0;
	const { data } = useGetList("shipments");

	for (const x in data){
		if (data[x].code > biggest) {
			biggest = data[x].code;
		}

		
		return biggest;
	}
}

const ShipmentCode = ({ selectedIds }) => {
	const [open, setOpen] = useState(false);
	const [code, setCode] = useState(BiggestShipmentCode());
	const refresh = useRefresh();
	const notify = useNotify();
	const unselectAll = useUnselectAll();
	const [updateMany, { loading }] = useUpdateMany(
		"orders",
		selectedIds,
		{ shipment_code: code },
		{
			onSuccess: () => {
				refresh();
				notify("Orders updated", "info", {}, true);
				unselectAll("orders");
			},
			onFailure: () => notify("Error: orders can not updated", "warning"),
		}
	);
	const handleClick = () => setOpen(true);
	const handleDialogClose = () => setOpen(false);

	const handleConfirm = () => {
		updateMany();
		setOpen(false);
	};

	return (
		<Button label="Shipment Code" startIcon={<LocalShipping />} onClick={handleClick} color="default"> 
			<Confirm
				isOpen={open}
				loading={loading}
				title="Set Shipment Code"
				content={<Input type="number" placeholder="Shipment Code" defaultValue={BiggestShipmentCode()} onChange={(e) => setCode(e.target.value)} />}
				onConfirm={handleConfirm}
				onClose={handleDialogClose}
				CancelIcon={Clear}
				ConfirmIcon={Check}
			/>
		</Button>
	);
}

const PrintOrders = ({ selectedIds }) => {
	let orders = [];
	let shipping_codes = [];

	const getUsers = useGetList("users");
	const getProducts = useGetList("products");
	const getOrders = useGetMany("orders", selectedIds);

	getOrders.data.forEach(x => {
		let order = JSON.parse(JSON.stringify(x));

		if (!order.formatted){
			order.formatted = true;

			order.customer_reference = getUsers.data[order.customer];
			order.items = order.items.map(i => {
				let item = i;
				item.item_reference = getProducts.data[item.product];
				return item;
			});

			order.order_date = new Date(order.order_date).toDateString();
			order.paid = order.paid ? "DEL" : "COD";
			
			order.customer_name = order.customer_reference.name;
			order.city = order.customer_reference.location.city;
			order.address = order.customer_reference.location.address;

			order.quantity = 0;
			order.price = 0;

			order.order = "<table> <tr>";
			order.order += "<th> Product </th>";
			order.order += "<th> Size </th>";
			order.order += "<th> Price </th>";
			order.order += "<th> Quantity </th>";
			order.order += "<th> Amount </th>";
			order.order += "</tr>";

			order.items.forEach(x => {
				if (x){
					order.quantity += x.quantity;
					order.price += x.item_reference.price * x.quantity;

					order.order += "<tr>";
					order.order += `<td> ${x.item_reference.name} </td>`;
					order.order += `<td> ${x.item_reference.size} </td>`;
					order.order += `<td> ${x.item_reference.price} </td>`;
					order.order += `<td> ${x.quantity} </td>`;
					order.order += `<td> ${x.item_reference.price * x.quantity} </td>`;
					order.order += "</tr>";
				}
			});

			order.price += order.shipping;

			order.order += "</table>";

			if (!shipping_codes.includes(order.shipment_code)) {
				shipping_codes.push(order.shipment_code);
				shipping_codes.sort();
			}
		}

		orders.push(order);
	});

	const handleClick = () => {
		printjs({
			printable: orders,
			properties: [
				{ field: "order_code", displayName: "Order Code" },
				{ field: "order_date", displayName: "Order Date" },
				{ field: "customer_name", displayName: "Customer"},
				{ field: "paid", displayName: "Paid"},
				{ field: "order", displayName: "Order"},
				{ field: "quantity", displayName: "Total Quantity"},
				{ field: "price", displayName: "Total Price"},
			],
			type: "json",
			gridHeaderStyle: 'border 2px solid #ddd;',
			gridStyle: 'border: 2px solid #ddd; font-size: 14px; padding: 5px;',
			header: `<h3> Shwe Nu Cosmetics, Shipping Code : ${shipping_codes.join(" & ")} </h3>`
		});
	}

	return (
		<Button label="Print" startIcon={<Print />} onClick={handleClick} color="default" /> 
	);
}

const BulkButtons = props => {
	return (
		<div>
			<PrintOrders {...props} />
			<ShipmentCode {...props} />
			<BulkDeleteWithUndoButton {...props} />
		</div>
	);
}

const TotalQuantity = ({ record }) => {
	let total = 0;

	if ( record.items ) {
		record.items.forEach(x => {
			if (x){
				total += x.quantity;
			}
		});
	}

	return (
		<Container>
			{total.toLocaleString()}
		</Container>
	);
}

const TotalPrice = ({ record }) => {
	let products = [];
	let quantities = {};
	let prices = {};
	let total = 0;

	if ( record.items ) {
		record.items.forEach(x => {
			if (x){
				products.push(x.product); quantities[x.product] ? quantities[x.product] += x.quantity : quantities[x.product] = x.quantity;
			}
		});
	}
	const { data, loading } = useGetMany("products", products);
	if (loading) { return <div> Loading... </div> }

	if (data.every(x => x !== undefined)) { data.forEach(x => prices[x.id] = x.price) };

	products.forEach(x => total += quantities[x] * prices[x]);
	
	if ( record.shipping ) {
		total += record.shipping;
	}

	return (
		<Container>
			{total.toLocaleString()}
		</Container>
	);
}

// Can not embed in List, must be separate components
const ProductsFromOrders = () => {
	return (
		<Datagrid currentSort={{ field: "id", order: "ADC" }}>
			<ReferenceField source="product" reference="products" label="Name" sortable={false}>
				<TextField source="name" />
			</ReferenceField>
			<ReferenceField source="product" reference="products" label="Size" sortable={false}>
				<TextField source="size" />
			</ReferenceField>
			<ReferenceField source="product" reference="products" label="Price" sortable={false}>
				<TextField source="price" />
			</ReferenceField>
			<NumberField source="quantity" />
		</Datagrid>
	);
}

export const OrdersList = props => (
	<List {...props} bulkActionButtons={<BulkButtons />} aside={<Filter />}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="order_code" label="Order Code" />
			<TextField source="shipment_code" label="Shipment Code" />
			<DateField source="order_date" label="Order Date" />
			<ReferenceField source="customer" reference="users" label="Customer" sortable={false}>
				<TextField source="name" />
			</ReferenceField>
			<BooleanField source="paid" label="Paid" FalseIcon={() => (<div> COD </div>)} TrueIcon={() => (<div> DEL </div>)} />
			<ArrayField source="items">
				<ProductsFromOrders />
			</ArrayField>
			<NumberField source="shipping" />
			<TotalQuantity source="items" label="Total Quantity" textAlign="right" addLabel={true} sortable={false} />
			<TotalPrice source="items" label="Total Price" textAlign="right" addLabel={true} sortable={false} />
			<EditButton />
		</Datagrid>
	</List>
);

export const OrdersEdit = props => (
	<Edit {...props} title="Edit" actions={<Back />}>
		<SimpleForm redirect="./">
			<TextInput source="id" defaultValue={uniqid("o-")} />
			<TextInput source="order_code" label="Order Code" defaultValue={BiggestOrderCodePlusOne()} />
			<TextInput source="shipment_code" label="Shipment Code" defaultValue={0} />
			<DateInput source="order_date" defaultValue={new Date()} />
			<ReferenceInput source="customer" reference="users" >
				<AutocompleteInput source="name" resettable={true} />
			</ReferenceInput>
			<ReferenceInput source="customer" reference="users" label="City">
				<SelectInput optionText="location.city" inputProps={{disabled: true}} SelectProps={{IconComponent: GpsFixed}} />
			</ReferenceInput>
			<NumberInput source="shipping" label="Shipping" />
			<BooleanInput source="paid" />
			<ArrayInput source="items">
				<SimpleFormIterator>
					<TextInput source="id" label="Id" defaultValue={uniqid("i-")} />
					<ReferenceInput source="product" reference="products" label="Product">
						<AutocompleteInput source="name" />
					</ReferenceInput>
					<ReferenceInput source="product" reference="products" label="Price">
						<SelectInput optionText="price" inputProps={{disabled: true}} SelectProps={{IconComponent: AttachMoney}} />
					</ReferenceInput>
					<ReferenceInput source="product" reference="products" label="Size">
						<SelectInput optionText="size" multiline inputProps={{disabled: true}} SelectProps={{IconComponent: Height}} />
					</ReferenceInput>
					<NumberInput source="quantity" label="Quantity" defaultValue={1} />
				</SimpleFormIterator>
			</ArrayInput>
			<TextInput source="notes" />
		</SimpleForm>
	</Edit>
);

export const OrdersCreate= props => (
	<Create {...props}>
		<SimpleForm redirect="./">
			<TextInput source="id" defaultValue={uniqid("o-")} />
			<TextInput source="order_code" label="Order Code" defaultValue={BiggestOrderCodePlusOne()} />
			<TextInput source="shipment_code" label="Shipment Code" defaultValue={0} />
			<DateInput source="order_date" defaultValue={new Date()} />
			<ReferenceInput source="customer" reference="users" >
				<AutocompleteInput source="name" resettable={true} />
			</ReferenceInput>
			<ReferenceInput source="customer" reference="users" label="City">
				<SelectInput optionText="location.city" inputProps={{disabled: true}} SelectProps={{IconComponent: GpsFixed}} />
			</ReferenceInput>
			<NumberInput source="shipping" label="Shipping" />
			<BooleanInput source="paid" />
			<ArrayInput source="items">
				<SimpleFormIterator>
					<TextInput source="id" label="Id" defaultValue={uniqid("i-")} />
					<ReferenceInput source="product" reference="products" label="Product">
						<AutocompleteInput source="name" />
					</ReferenceInput>
					<ReferenceInput source="product" reference="products" label="Price">
						<SelectInput optionText="price" inputProps={{disabled: true}} SelectProps={{IconComponent: AttachMoney}} />
					</ReferenceInput>
					<ReferenceInput source="product" reference="products" label="Size">
						<SelectInput optionText="size" multiline inputProps={{disabled: true}} SelectProps={{IconComponent: Height}} />
					</ReferenceInput>
					<NumberInput source="quantity" label="Quantity" defaultValue={1} />
				</SimpleFormIterator>
			</ArrayInput>
			<TextInput source="notes" />
		</SimpleForm>
	</Create>
);