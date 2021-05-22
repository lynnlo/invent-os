// Lynn Ong. 2021

import * as React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { Title, useGetList } from 'react-admin';
import { People, CollectionsBookmark, LocalShipping, Category } from '@material-ui/icons';
import { IconLabel } from './globals';

// Total sum or sum of field values in a list
const BigNumber = ({ reference, label, field, icon }) => {
	let display = 0;

	const { data, loading } = useGetList(reference);
	if (loading) {display = "Loading..."}

	for (const x in data){
		if (x) {
			display += field ? data[x][field] : 1;
		}
	}

	return (
		<Grid item xs={4}>
			<Card elevation={6}>
				<CardContent>
					<IconLabel icon={icon} label={label} />
					<Typography variant="h1">
						{display}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	)
}

// First value of a sort in a list
const BigFirstSort = ({ reference, label, field, sort, func, icon }) => {
	let display;

	const { data, loading } = useGetList(reference, { page: 1, perPage: 1 }, sort);
	if (loading) {display = "Loading..."}
	
	for (const x in data){
		if (x) {
			display = func ? data[x][field][func]() : data[x][field];
		}	
	}

	return (
		<Grid item xs={3}>
			<Card elevation={6}>
				<CardContent>
					<IconLabel icon={icon} label={label} />
					<Typography variant="h2">
						{display}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	)
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
				<BigNumber reference="users" label="Total Customers" icon={<People />} />
				<BigNumber reference="orders" label="Total Orders" icon={<CollectionsBookmark />} />
				<BigNumber reference="products" label="Total Products" icon={<Category />} />
				<BigFirstSort reference="shipments" label="Last Shipment" field="ship_date" sort={{ field: "ship_date", order: "DESC" }} func="toDateString" icon={<LocalShipping />} />
			</Grid>
		</CardContent>
	</Card>
); 