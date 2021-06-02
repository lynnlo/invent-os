// Lynn Ong. 2021
/* eslint-disable no-unused-vars */

// Packages
import React from 'react';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import { People, LocalShipping, CollectionsBookmark, Category } from '@material-ui/icons';
import { Admin, Resource } from 'react-admin';
import { FirebaseAuthProvider, FirebaseDataProvider } from 'react-admin-firebase';
import axios from 'axios'

// Structures
import data from './data.js';
import { Dashboard } from './dataStructures/dashboard.js';
import { UsersList, UsersEdit, UsersCreate } from './dataStructures/users.js';
import { ShipmentsList, ShipmentsEdit, ShipmentsCreate } from './dataStructures/shipments.js';
import { OrdersList, OrdersEdit, OrdersCreate } from './dataStructures/orders.js';
import { ProductsList, ProductsEdit, ProductsCreate } from './dataStructures/products.js';

// Firebase API
const firebaseConfig = {
	apiKey: "AIzaSyC4W6jxNGcZv21odBSaa2KNsavNzlAG1JU",
    authDomain: "inventos-81af5.firebaseapp.com",
    projectId: "inventos-81af5",
    storageBucket: "inventos-81af5.appspot.com",
    messagingSenderId: "746767026671",
    appId: "1:746767026671:web:24421173fc90512528ce1a"
};

const authProvider = FirebaseAuthProvider(firebaseConfig);
const dataProvider = FirebaseDataProvider(firebaseConfig);
//const dataProvider = data;

function App() {
	const styles = createMuiTheme({
		palette: {
			type: "dark",
			background: {
				default: "#262626",
				paper: "#333333",
			},
			text: {
				primary: "#FFFFFF",
				secondary: "#F2F9F1",
			},
			primary: {
				main: "#3DA2F5",
			},
			secondary: {
				main: "#00A393",
			},
			error: {
				main: "#EB704B",
			}
		},
		typography: {
			fontFamily: "Comfortaa, Montserrat"
		},
	})

	return (
		<div>
			<CssBaseline />
			<Admin theme={styles} authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} title="Invent OS" disableTelemetry>
				<Resource name="users" list={UsersList} edit={UsersEdit} create={UsersCreate} icon={People} />
				<Resource name="shipments" list={ShipmentsList} edit={ShipmentsEdit} create={ShipmentsCreate} icon={LocalShipping} />
				<Resource name="orders" list={OrdersList} edit={OrdersEdit} create={OrdersCreate} icon={CollectionsBookmark} />
				<Resource name="products" list={ProductsList} edit={ProductsEdit} create={ProductsCreate} icon={Category} />
			</Admin>
		</div>
	);
}

export default App;