// Lynn Ong. 2021

import * as React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid } from '@material-ui/core';
import { Title, useGetList, useGetOne } from 'react-admin';

// Total sum or sum of field values in a list
const BigNumber = ({reference, label, field}) => {
	let display = 0;

	const { data, loading } = useGetList(reference);
	if (loading) {display = "Loading..."}

	for (const x in data){
		display += field ? data[x][field] : 1;
	}

	return (
		<Card>
			<CardContent>
				<Typography variant="subtitle1">
					{label}
				</Typography>
				<Typography variant="h1">
					{display}
				</Typography>
			</CardContent>
		</Card>
	)
}

// First value of a sort in a list
const BigFirstSort = ({reference, label, field, sort, func }) => {
	let display;

	const { data, loading } = useGetList(reference, { page: 1, perPage: 1 }, sort);
	if (loading) {display = "Loading..."}

	for (const x in data){
		display = func ? data[x][field][func]() : data[x][field];
	}

	return (
		<Card>
			<CardContent>
				<Typography variant="subtitle1">
					{label}
				</Typography>
				<Typography variant="h2">
					{display}
				</Typography>
			</CardContent>
		</Card>
	)
}

export const Dashboard = props => (
	<Card {...props}>
		<Title title="Invent OS" />
		<CardHeader title="Invent OS" subheader="Lynn Ong." />
		<CardContent>
			<Grid>
				<BigNumber reference="users" label="Total Customers" />
				<BigNumber reference="orders" label="Total Orders" />
				<BigFirstSort reference="shipments" label="Last Shipment" field="ship_date" sort={{ field: "ship_date", order: "ASC" }} func="toDateString" />
			</Grid>
		</CardContent>
	</Card>
); 