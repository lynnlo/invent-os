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
	NumberInput,
	NumberField,
	BooleanField,
	BooleanInput,
} from 'react-admin';
import { Clear, Check } from '@material-ui/icons';
import { Back } from './globals.js'

export const ShipmentsList = props => (
	<List {...props}>
		<Datagrid>
			<TextField source="id" />
			<NumberField source="code" label="Shipment Code" />
			<DateField source="start_date" label="Start Date" />
			<DateField source="ship_date" label="Ship Date" />
			<BooleanField source="shipped" label="Shipped" FalseIcon={Clear} TrueIcon={Check} />
			<ReferenceManyField source="code" reference="orders" target="shipment_code" sortable={false}>
				<Datagrid>
					<TextField source="id" />
					<ReferenceField source="id" reference="orders" label="Order">
						<TextField source="order_code" />
					</ReferenceField>
					<ReferenceField source="customer" reference="users" label="Customer">
						<TextField source="name" />
					</ReferenceField>
					<ReferenceField source="customer" reference="users" label="City" link={false}>
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
		<SimpleForm>
			<TextInput source="id" />
			<NumberInput source="code" />
			<DateInput source="start_date" label="Start Date" />
			<DateInput source="ship_date" label="Ship Date" />
			<BooleanInput source="shipped" label="Shipped" />
		</SimpleForm>
	</Edit>
);

export const ShipmentsCreate= props => (
	<Create {...props} actions={<Back />}>
		<SimpleForm>
			<TextInput source="id" />
			<NumberInput source="code" />
			<DateInput source="start_date" label="Start Date" />
			<DateInput source="ship_date" label="Ship Date" />
			<BooleanInput source="shipped" label="Shipped" />
		</SimpleForm>
	</Create>
);