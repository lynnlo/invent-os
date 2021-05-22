// Lynn Ong. 2021
/* eslint-disable no-unused-vars */

import jsonServerProvider from 'ra-data-json-server';
import fakeDataProvider from 'ra-data-fakerest';

let data = fakeDataProvider({
	users: [
		{ 
			id: 'u-0', 
			name: 'Name One', 
			phone: '123 456 7890', 
			location: {
				city : 'Yangon',
				address : '1234 Street Road',
				instructions : '',
			},
			notes : '',
		},
		{ 
			id: 'u-1', 
			name: 'Name Two', 
			phone: '222 222 2223', 
			location: {
				city : 'Yangon',
				address : '1234 Park Drive',
				instructions : 'Leave at front door',
			},
			notes : '',
		},
		{ 
			id: 'u-2', 
			name: 'Name Three', 
			phone: '111 222 333',
			location: {
				city : 'Mandalay',
				address : '1234 Road Street',
				instructions : '',
			},
			notes : '',
		},
	],
	shipments: [
		{
			id: 's-0',
			code: 17,
			start_date: new Date(),
			ship_date: new Date(),
			shipped: false,
		}
	],
	orders: [
		{ 
			id: 'o-0', 
			order_code: 1,
			shipment_code: 17,
			order_date: new Date(),
			customer: 'u-0',
			items: [
				{
					id: 'i-0',
					product: 'p-0',
					quantity: 1,
				},
				{
					id: 'i-1',
					product: 'p-1',
					quantity: 1,
				},
			],
			paid: false,
			notes: '',
		},
		{ 
			id: 'o-1', 
			order_code: 2,
			shipment_code: 17,
			order_date: new Date(),
			customer: 'u-1',
			items: [
				{
					id: 'i-3',
					product: 'p-1',
					quantity: 1,
				},
				{
					id: 'i-4',
					product: 'p-0',
					quantity: 1,
				},
				{
					id: 'i-5',
					product: 'p-2',
					quantity: 3,
				},
			],
			paid: true,
			notes: '',
		},
	],
	products: [
		{
			id: 'p-0',
			name: 'Face Cream',
			description: '',
			size: 'S',
			price: 5000,
		},
		{
			id: 'p-1',
			name: 'Shirt Small',
			description: '',
			size: 'S',
			price: 10000,
		},
		{
			id: 'p-2',
			name: 'Shirt Medium',
			description: '',
			size: 'M',
			price: 12000,
		},
		{
			id: 'p-3',
			name: 'Water',
			description: 'A bottle of Water.',
			size: '',
			price: 12000,
		},
	],
})

export default data;