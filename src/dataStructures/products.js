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
import uniqid from 'uniqid';

export const ProductsList = props => (
	<List {...props}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="name" />
			<TextField source="size" />
			<NumberField source="price" />
			<TextField source="description" sortable={false} />
			<EditButton />
		</Datagrid>
	</List>
);

export const ProductsEdit = props => (
	<Edit {...props} title="Edit" actions={<Back />}>
		<SimpleForm submitOnEnter redirect="products">
			<TextInput source="id" defaultValue={uniqid('p-')} />
			<TextInput source="name" />
			<TextInput source="description" multiline />
			<TextInput source="size" />
			<NumberInput source="price" step={100} />
		</SimpleForm>
	</Edit>
);

export const ProductsCreate= props => (
	<Create {...props} actions={<Back />}>
		<SimpleForm submitOnEnter redirect="products">
			<TextInput source="id" defaultValue={uniqid('p-')} />
			<TextInput source="name" />
			<TextInput source="description" multiline />
			<TextInput source="size" />
			<NumberInput source="price" step={100} />
		</SimpleForm>
	</Create>
);