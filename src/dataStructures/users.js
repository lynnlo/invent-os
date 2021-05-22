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
} from 'react-admin';
import { Back } from './globals.js'
import uniqid from 'uniqid';

export const UsersList = props => (
	<List {...props}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="name" />
			<TextField source="phone" />
			<TextField source="location.city" label="City" />
			<TextField source="location.address" label="Address" />
			<TextField source="notes" sortable={false} />
			<EditButton />
		</Datagrid>
	</List>
);

export const UsersEdit = props => (
	<Edit {...props} title="Edit" actions={<Back />}>
		<SimpleForm submitOnEnter redirect="edit">
			<TextInput source="id" defaultValue={uniqid('u-')} />
			<TextInput source="name" />
			<TextInput source="phone" />
			<TextInput source="location.city" label="City" />
			<TextInput source="location.address" label="Address" />
			<TextInput source="notes" defaultValue="" multiline />
		</SimpleForm>
	</Edit>
);

export const UsersCreate= props => (
	<Create {...props} actions={<Back />}>
		<SimpleForm>
			<TextInput source="id" defaultValue={uniqid('u-')} />
			<TextInput source="name" defaultValue="" />
			<TextInput source="phone" defaultValue="" />
			<TextInput source="location.city" label="City" defaultValue="" />
			<TextInput source="location.address" label="Address" defaultValue="" />
			<TextInput source="notes" defaultValue="" multiline />
		</SimpleForm>
	</Create>
);