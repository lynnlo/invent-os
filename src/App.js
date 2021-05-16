// Lynn Ong. 2021
/* eslint-disable no-unused-vars */

// Packages
import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import uniqid from 'uniqid';

// Data
import data from './data.js';
import { Dashboard } from './dataStructures/dashboard.js';
import { UsersList, UsersEdit, UsersCreate } from './dataStructures/users.js';
import { ShipmentsList, ShipmentsEdit, ShipmentsCreate } from './dataStructures/shipments.js';
import { OrdersList, OrdersEdit, OrdersCreate } from './dataStructures/orders.js';
import { ProductsList, ProductsEdit, ProductsCreate } from './dataStructures/products.js';
import {People, LocalShipping, CollectionsBookmark, Category } from '@material-ui/icons';

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

	return (
		<div>
			<Admin dataProvider={data} dashboard={Dashboard} title="Invent OS" disableTelemetry>
				<Resource name="users" list={UsersList} edit={UsersEdit} create={UsersCreate} icon={People} />
				<Resource name="shipments" list={ShipmentsList} edit={ShipmentsEdit} create={ShipmentsCreate} icon={LocalShipping} />
				<Resource name="orders" list={OrdersList} edit={OrdersEdit} create={OrdersCreate} icon={CollectionsBookmark} />
				<Resource name="products" list={ProductsList} edit={ProductsEdit} create={ProductsCreate} icon={Category} />
			</Admin>
		</div>
	);
}

export default App;