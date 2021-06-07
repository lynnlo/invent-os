// Lynn Ong. 2021

import * as React from 'react';
import { 
	List,
	Datagrid,
	TextField,
	EditButton,
	Edit,
	SimpleForm,
	TextInput,
	Create,
	ReferenceManyField,
	ReferenceField,
	DateField,
	DateInput,
	BooleanField,
	BooleanInput,
	useUpdateMany,
	useRefresh,
	useNotify,
	useUnselectAll,
	Button,
	BulkDeleteWithUndoButton,
	useGetList,
} from 'react-admin';
import { Clear, Check, Send } from '@material-ui/icons';
import { Back } from './globals.js'
import uniqid from 'uniqid';

const BiggestShipmentCodePlusOne = () => {
	let biggest = 0;
	const { data } = useGetList('shipments');

	for (const x in data){
		if (data[x].code > biggest) {
			biggest = data[x].code;
		}
				
		return biggest + 1;
	}
}

const ShipmentsSend = ({ selectedIds }) => {
	const refresh = useRefresh();
	const notify = useNotify();
	const unselectAll = useUnselectAll();
	const [updateMany] = useUpdateMany(
		'shipments',
		selectedIds,
		{ shipped: true },
		{
			onSuccess: () => {
				refresh();
				notify('Shipments updated', 'info', {}, true);
				unselectAll('shipments');
			},
			onFailure: () => notify('Error: Shipments can not updated', 'warning'),
		}
	);

	return (
		<Button label="Send Shipments" startIcon={<Send />} onClick={updateMany} color="default" />
	);
}

const BulkButtons = props => {
	return (
		<div>
			<ShipmentsSend {...props} />
			<BulkDeleteWithUndoButton {...props} />
		</div>
	)
}

export const ShipmentsList = props => (
	<List {...props} bulkActionButtons={<BulkButtons />}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="code" label="Shipment Code" />
			<DateField source="start_date" label="Start Date" />
			<DateField source="ship_date" label="Ship Date" />
			<BooleanField source="shipped" label="Shipped" FalseIcon={Clear} TrueIcon={Check} />
			<ReferenceManyField source="code" reference="orders" target="shipment_code" label="Orders" sortable={false}>
				<Datagrid>
					<ReferenceField source="id" reference="orders" label="Order" sortable={true}>
						<TextField source="order_code" />
					</ReferenceField>
					<ReferenceField source="customer" reference="users" label="Customer" sortable={false}>
						<TextField source="name" />
					</ReferenceField>
					<ReferenceField source="customer" reference="users" label="City" link={false} sortable={false}>
						<TextField source="location.city" />
					</ReferenceField>
				</Datagrid>
			</ReferenceManyField>
			<EditButton />
		</Datagrid>
	</List>
);

export const ShipmentsEdit = props => (
	<Edit {...props} title="Edit" actions={<Back />}>
		<SimpleForm submitOnEnter>
			<TextInput source="id" defaultValue={uniqid('s-')} />
			<TextInput source="code" />
			<DateInput source="start_date" label="Start Date" />
			<DateInput source="ship_date" label="Ship Date" />
			<BooleanInput source="shipped" label="Shipped" defaultValue={false} />
		</SimpleForm>
	</Edit>
);

export const ShipmentsCreate= props => (
	<Create {...props} actions={<Back />}>
		<SimpleForm submitOnEnter redirect="./">
			<TextInput source="id" defaultValue={uniqid('s-')} />
			<TextInput source="code" defaultValue={BiggestShipmentCodePlusOne()} />
			<DateInput source="start_date" label="Start Date" />
			<DateInput source="ship_date" label="Ship Date" />
			<BooleanInput source="shipped" label="Shipped" defaultValue={false} />
		</SimpleForm>
	</Create>
);