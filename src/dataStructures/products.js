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
	NumberInput,
	NumberField,
} from 'react-admin';
import { Back } from './globals.js'

export const ProductsList = props => (
	<List {...props}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="name" />
			<TextField source="description" sortable={false} />
			<TextField source="size" />
			<NumberField source="price" />
			<EditButton />
		</Datagrid>
	</List>
);

export const ProductsEdit = props => (
	<Edit {...props} title="Edit" actions={<Back />}>
		<SimpleForm>
			<TextInput source="id" />
			<TextInput source="name" />
			<TextInput source="description" multiline />
			<TextInput source="size" />
			<NumberInput source="price" />
		</SimpleForm>
	</Edit>
);

export const ProductsCreate= props => (
	<Create {...props} actions={<Back />}>
		<SimpleForm>
			<TextInput source="id" />
			<TextInput source="name" />
			<TextInput source="description" multiline />
			<TextInput source="size" />
			<NumberInput source="price" />
		</SimpleForm>
	</Create>
);