// Lynn Ong. 2021

import * as React from 'react';
import { Fragment, useState } from 'react';
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
} from 'react-admin';
import { AttachMoney, Clear, Check, Height, LocalShipping } from '@material-ui/icons';
import { Back } from './globals.js'

const ShipmentCode = ({ selectedIds }) => {
	const [open, setOpen] = useState(false);
	const [code, setCode] = useState(0);
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
				notify('Posts updated', 'info', {}, true);
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
		<Fragment>
			<Button label="Shipment Code" startIcon={<LocalShipping />} onClick={handleClick} />
			<Confirm
				isOpen={open}
				loading={loading}
				title="Set Shipment Code"
				content={<Input type="number" placeholder="Shipment Code" onChange={(e) => setCode(e.target.value)} />}
				onConfirm={handleConfirm}
				onClose={handleDialogClose}
				CancelIcon={Clear}
				ConfirmIcon={Check}
			/>
		</Fragment>
	);
}

const BulkButtons = props => {
	return (
		<Fragment>
			<ShipmentCode {...props} />
			<BulkDeleteWithUndoButton {...props} />
		</Fragment>
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
	if (loading) { return <Fragment> Loading... </Fragment> }
	
	if (data.every(x => x !== undefined)) { data.forEach(x => prices[x.id] = x.price) };

	products.forEach(x => total += quantities[x] * prices[x]);

	return (
		<Container>
			{total.toLocaleString()}
        </Container>
	)
}

export const OrdersList = props => (
	<List {...props} bulkActionButtons={<BulkButtons />}>
		<Datagrid>
			<TextField source="id" />
			<NumberField source="order_code" label="Order Code" />
			<NumberField source="shipment_code" label="Shipment Code" />
			<DateField source="order_date" label="Order Date" />
			<ReferenceField source="customer" reference="users" label="Customer" sortable={false}>
				<TextField source="name" />
			</ReferenceField>
			<ReferenceField source="customer" reference="users" label="City" link={false} sortable={false}>
				<TextField source="location.city" />
			</ReferenceField>
			<ArrayField source="items" sortable={false}>
				<Datagrid>
					<ReferenceField source="product" reference="products" label="Name">
						<TextField source="name" />
					</ReferenceField>
					<ReferenceField source="product" reference="products" label="Size">
						<TextField source="size" />
					</ReferenceField>
					<ReferenceField source="product" reference="products" label="Price">
						<TextField source="price" />
					</ReferenceField>
					<NumberField source="quantity" />
				</Datagrid>
			</ArrayField>
			<TotalQuantity source="items" label="Total Quantity" textAlign="right" addLabel={true} sortable={false} />
			<TotalPrice source="items" label="Total Price" textAlign="right" addLabel={true} sortable={false} />
			<TextField source="notes" sortable={false} />
			<EditButton />
		</Datagrid>
	</List>
);

export const OrdersEdit = props => (
	<Edit {...props} title="Edit" actions={<Back />}>
		<SimpleForm>
			<TextInput source="id" />
			<NumberInput source="order_code" label="Order Code" />
			<NumberInput source="shipment_code" label="Shipment Code" />
			<DateInput source="order_date" />
			<ReferenceInput source="customer" reference="users">
				<AutocompleteInput optionText="name" />
			</ReferenceInput>
			<ArrayInput source="items">
				<SimpleFormIterator>
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
		<SimpleForm>
			<TextInput source="id" />
			<NumberInput source="order_code" label="Order Code" />
			<NumberInput source="shipment_code" label="Shipment Code" />
			<DateInput source="order_date" />
			<ReferenceInput source="customer" reference="users">
				<AutocompleteInput optionText="name" />
			</ReferenceInput>
			<ArrayInput source="items">
				<SimpleFormIterator>
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