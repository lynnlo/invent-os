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
import { AttachMoney, Clear, Check, Height, LocalShipping } from '@material-ui/icons';
import { Back } from './globals.js';
import { Filter } from './orders-filter.js';
import uniqid from 'uniqid';

const BiggestOrderCodePlusOne = () => {
	let biggest = 0;
	const { data } = useGetList('orders');

	for (const x in data){
		if (data[x].order_code > biggest) {
			biggest = data[x].order_code;
		}
	}

	return biggest + 1;
}

const BiggestShipmentCode = () => {
	let biggest = 0;
	const { data } = useGetList('shipments');

	for (const x in data){
		if (data[x].code > biggest) {
			biggest = data[x].code;
		}
	}

	return biggest;
}

const ShipmentCode = ({ selectedIds }) => {
	const [open, setOpen] = useState(false);
	const [code, setCode] = useState(BiggestShipmentCode());
	const refresh = useRefresh();
	const notify = useNotify();
	const unselectAll = useUnselectAll();
	const [updateMany, { loading }] = useUpdateMany(
		'orders',
		selectedIds,
		{ shipment_code: code },
		{
			onSuccess: () => {
				refresh();
				notify('Orders updated', 'info', {}, true);
				unselectAll('orders');
			},
			onFailure: () => notify('Error: orders can not updated', 'warning'),
		}
	);
	const handleClick = () => setOpen(true);
	const handleDialogClose = () => setOpen(false);

	const handleConfirm = () => {
		updateMany();
		setOpen(false);
	};

	return (
		<div>
			<Button label="Shipment Code" startIcon={<LocalShipping />} onClick={handleClick} />
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
		</div>
	);
}

const BulkButtons = props => {
	return (
		<div>
			<ShipmentCode {...props} />
			<BulkDeleteWithUndoButton {...props} />
		</div>
	)
}

const TotalQuantity = ({ record }) => {
	let total = 0;

	record.items.forEach(x => total += x.quantity);

	return (
		<Container>
			{total.toLocaleString()}
        </Container>
	)
}

const TotalPrice = ({ record }) => {
	let products = [];
	let quantities = {};
	let prices = {};
	let total = 0;

	record.items.forEach(x => {products.push(x.product); quantities[x.product] ? quantities[x.product] += x.quantity : quantities[x.product] = x.quantity});

	const { data, loading } = useGetMany('products', products);
	if (loading) { return <div> Loading... </div> }

	if (data.every(x => x !== undefined)) { data.forEach(x => prices[x.id] = x.price) };

	products.forEach(x => total += quantities[x] * prices[x]);

	return (
		<Container>
			{total.toLocaleString()}
        </Container>
	)
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
			<ReferenceField source="customer" reference="users" label="City" link={false} sortable={false}>
				<TextField source="location.city" />
			</ReferenceField>
			<BooleanField source="paid" label="Paid" FalseIcon={() => (<div> COD </div>)} TrueIcon={() => (<div> DEL </div>)} />
			<ArrayField source="items" sortable={false}>
				<Datagrid>
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
			</ArrayField>
			<TotalQuantity source="items" label="Total Quantity" textAlign="right" addLabel={true} sortable={false} />
			<TotalPrice source="items" label="Total Price" textAlign="right" addLabel={true} sortable={false} />
			<EditButton />
		</Datagrid>
	</List>
);

export const OrdersEdit = props => (
	<Edit {...props} title="Edit" actions={<Back />}>
		<SimpleForm submitOnEnter redirect="orders">
			<TextInput source="id" defaultValue={uniqid('o-')} />
			<TextInput source="order_code" label="Order Code" defaultValue={BiggestOrderCodePlusOne()} />
			<TextInput source="shipment_code" label="Shipment Code" defaultValue={0} />
			<DateInput source="order_date" defaultValue={new Date()} />
			<ReferenceInput source="customer" reference="users">
				<AutocompleteInput optionText="name" />
			</ReferenceInput>
			<BooleanInput source="paid" />
			<ArrayInput source="items">
				<SimpleFormIterator>
					<TextInput source="id" label="Id" defaultValue={uniqid('i-')} />
					<ReferenceInput source="product" reference="products" label="Product">
						<AutocompleteInput optionText="name" />
					</ReferenceInput>
					<ReferenceInput source="product" reference="products" label="Price">
						<SelectInput optionText="price" inputProps={{disabled: true}} SelectProps={{IconComponent: AttachMoney}} />
					</ReferenceInput>
					<ReferenceInput source="product" reference="products" label="Size">
						<SelectInput optionText="size" multiline inputProps={{disabled: true}} SelectProps={{IconComponent: Height}} />
					</ReferenceInput>
					<NumberInput source="quantity" label="Quantity" />
				</SimpleFormIterator>
			</ArrayInput>
			<TextInput source="notes" />
		</SimpleForm>
	</Edit>
);

export const OrdersCreate= props => (
	<Create {...props} actions={<Back />}>
		<SimpleForm submitOnEnter redirect="orders">
			<TextInput source="id" defaultValue={uniqid('o-')} />
			<TextInput source="order_code" label="Order Code" defaultValue={BiggestOrderCodePlusOne()} />
			<TextInput source="shipment_code" label="Shipment Code" defaultValue={0} />
			<DateInput source="order_date" defaultValue={new Date()} />
			<ReferenceInput source="customer" reference="users">
				<AutocompleteInput optionText="name" />
			</ReferenceInput>
			<BooleanInput source="paid" />
			<ArrayInput source="items">
				<SimpleFormIterator>
					<TextInput source="id" label="Id" defaultValue={uniqid('i-')} />
					<ReferenceInput source="product" reference="products" label="Product">
						<AutocompleteInput optionText="name" />
					</ReferenceInput>
					<ReferenceInput source="product" reference="products" label="Price">
						<SelectInput optionText="price" inputProps={{disabled: true}} SelectProps={{IconComponent: AttachMoney}} />
					</ReferenceInput>
					<ReferenceInput source="product" reference="products" label="Size">
						<SelectInput optionText="size" multiline inputProps={{disabled: true}} SelectProps={{IconComponent: Height}} />
					</ReferenceInput>
					<NumberInput source="quantity" label="Quantity" />
				</SimpleFormIterator>
			</ArrayInput>
			<TextInput source="notes" />
		</SimpleForm>
	</Create>
);