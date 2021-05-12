// Lynn Ong. 20201
/* eslint-disable no-unused-vars */

// Packages
import React, { } from 'react';
import { } from '@material-ui/core';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import uniqid from 'uniqid';

// Data Structures
import UsersList from './dataStructures/users.js';

function App() {
	/*
	const [Data, setData] = useState({})
	setData({
		users : [
			{
				name: "customer 1",
				id : uniqid('u-'),
			}
		]
	})
	*/
	let data = jsonServerProvider('https://jsonplaceholder.typicode.com');

	return (
		<div>
			<Admin dataProvider={data}>
				<Resource name="users" list={UsersList} edit={EditGuesser}>

				</Resource>
			</Admin>
		</div>
	);
}

export default App;
