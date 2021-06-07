// Lynn Ong. 2021

import * as React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { Title, useGetList } from 'react-admin';
import { People, CollectionsBookmark, LocalShipping, Category, BarChart, AttachMoney } from '@material-ui/icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { IconLabel } from './globals';

// Total sum or sum of field values in a list
const BigNumber = ({ reference, label, field, icon, size }) => {
	let display = 0;

	const { data, loading } = useGetList(reference);
	if (loading) {display = "Loading..."}

	for (const x in data){
		if (x) {
			display += field ? data[x][field] : 1;
		}
	}

	return (
		<Grid item xs={size ? size : 4}>
			<Card style={{height: "100%"}} elevation={6}>
				<CardContent>
					<IconLabel icon={icon} label={label} />
					<Typography variant="h1">
						{display}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

// First date value of a sort in a list
const BigFirstDateSort = ({ reference, label, field, sort, func, icon, size }) => {
	let display;

	const { data, loading } = useGetList(reference, { page: 1, perPage: 1 }, sort);
	if (loading) {display = "Loading..."}
	
	for (const x in data){
		if (x) {
			let date = new Date(data[x][field])
			display = func ? date[func]() : date;
		}	
	}

	return (
		<Grid item xs={size ? size : 4}>
			<Card style={{height: "100%"}} elevation={6}>
				<CardContent>
					<IconLabel icon={icon} label={label} />
					<Typography variant="h2">
						{display}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

// Graph a sum of a field over time
const BigGraphSumOverTime = ({ reference, label, field, sort, icon, size }) => {
	let values = {};
	let graphData = [];

	const { data } = useGetList(reference, { page: 1, perPage: 20 }, sort);

	for (const x in data){
		if (x) {
			let date = new Date(data[x][field]);
			let index = Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
			values[index] ? values[index] += 1 : values[index] = 1;
		}
	}

	for (const x in values){
		graphData.push({ index: x, value: values[x] });
	}

	return (
		<Grid item xs={size ? size : 6}>
			<Card elevation={6}>
				<CardContent>
					<IconLabel icon={icon} label={label} />
					<ResponsiveContainer width="100%" height={300}>
						<AreaChart
							width={80}
							height={80}
							data={graphData}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="index" fontFamily="Comfortaa" />
							<YAxis dataKey="value" fontFamily="Comfortaa" />
							<Area type="monotone" dataKey="value" label="field" />
						</AreaChart>
					</ResponsiveContainer>
					<Typography variant="h5" color="secondary">
						+{graphData.length > 0 ? graphData.slice(-1)[0].value + " " + label : "Loading..."}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

// Graph projected revenue over time
const BigGraphRevenue = ({ label, icon, size }) => {
	let values = {};
	let graphData = [];

	const getProducts = useGetList("products", { page: 1, perPage: 20 });
	const { data } = useGetList('orders');

	for (const x in data){
		if (x) {
			let date = new Date(data[x]['order_date']);
			let index = Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

			if (data[x].items) {
				data[x].items.forEach(i => {
					values[index] ? values[index] += getProducts.data[i.product].price * i.quantity : values[index] = getProducts.data[i.product].price * i.quantity;
				});
			}
		}
	}

	for (const x in values){
		graphData.push({ index: x, value: values[x] });
	}

	return (
		<Grid item xs={size ? size : 12}>
			<Card elevation={6}>
				<CardContent>
					<IconLabel icon={icon} label={label} />
					<ResponsiveContainer width="100%" height={300}>
						<AreaChart
							width={80}
							height={80}
							data={graphData}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="index" fontFamily="Comfortaa" />
							<YAxis dataKey="value" fontFamily="Comfortaa" />
							<Area type="monotone" dataKey="value" label="field" />
						</AreaChart>
					</ResponsiveContainer>
					<Typography variant="h5" color="secondary">
						+{graphData.length > 0 ? graphData.slice(-1)[0].value + " Kyat" : "Loading..."}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

export const Dashboard = props => (
	<Card {...props}>
		<Title title="Dashboard" />
		<CardContent>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Card elevation={4}>
						<CardContent>
							<Typography variant="h6">
								Shwe Nu Cosmetics
							</Typography>
							<Typography variant="h2">
								Invent OS
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<BigGraphRevenue label="Revenue" icon={<AttachMoney />} />
				<BigGraphSumOverTime reference="orders" label="Orders" field="order_date" sort={{ field: "order_date", order: "ASC" }} icon={<BarChart />} />
				<BigGraphSumOverTime reference="users" label="Users" field="joined" sort={{ field: "joined", order: "ASC" }} icon={<BarChart />} />
				<BigNumber reference="users" label="Total Customers" icon={<People />} />
				<BigNumber reference="orders" label="Total Orders" icon={<CollectionsBookmark />} />
				<BigNumber reference="shipments" label="Total Shipments" icon={<LocalShipping />} />
				<BigFirstDateSort reference="shipments" label="Last Shipment" field="ship_date" sort={{ field: "ship_date", order: "DESC" }} func="toDateString" icon={<LocalShipping />} />
				<BigFirstDateSort reference="orders" label="Last Order" field="order_date" sort={{ field: "order_date", order: "DESC" }} func="toDateString" icon={<CollectionsBookmark />} />
				<BigNumber reference="products" label="Total Products" icon={<Category />} />
			</Grid>
		</CardContent>
	</Card>
);