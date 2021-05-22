// Lynn Ong. 2021

import * as React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { FilterList, FilterListItem, FilterLiveSearch } from 'react-admin';
import { AttachMoney, Clear, Check, LocalShipping, Block } from '@material-ui/icons';
import { IconLabel } from './globals';

const DeliveryFilter = () => (
	<FilterList label="Delivery" icon={<LocalShipping />}>
		<FilterLiveSearch label="Shipment Code" source="shipment_code" />

		<FilterListItem 
			label={<IconLabel icon={<Block />} label="No Shipment Code" />}
			value={{
				shipment_code: 0,
			}}
		/>

	</FilterList>
)

const PaidFilter = () => (
	<FilterList label="Paid" icon={<AttachMoney />}>
		<FilterListItem 
			label={<IconLabel icon={<Clear />} label="Not Paid" />}
			value={{
				paid: false,
			}}
		/>

		<FilterListItem 
			label={<IconLabel icon={<Check />} label="Paid" />}
			value={{
				paid: true,
			}}
		/>
	</FilterList>
);

export const Filter = () => (
	<Card>
		<CardContent>
			<Typography>
				Filters
			</Typography>
			<DeliveryFilter />
			<PaidFilter />
		</CardContent>
	</Card>
);