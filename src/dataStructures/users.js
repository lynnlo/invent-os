// Lynn Ong. 20201

import * as React from "react";
import { List, Datagrid, TextField, EmailField } from 'react-admin';

const UserList = props => (
	<List {...props}>
		<Datagrid rowClick="edit">
			<TextField source="id" />
			<TextField source="name" />
			<EmailField source="email" />
			<TextField source="address.city" label="City" />
			<TextField source="phone" />
		</Datagrid>
	</List>
);

export default UserList;