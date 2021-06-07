// Lynn Ong. 2021
/* eslint-disable no-unused-vars */

import fakeDataProvider from 'ra-data-fakerest';
import uniqid from 'uniqid';

let data = fakeDataProvider({
	users: [
		{ 
			id: 'u-0', 
			name: 'Frank', 
			phone: '123 456 7890', 
			location: {
				city : 'Yangon',
				address : '1234 Street Road',
				instructions : '',
			},
			joined: new Date(2020, 11, 15),
			notes : '',
		},
		{ 
			id: 'u-1', 
			name: 'Billy', 
			phone: '222 222 2223', 
			location: {
				city : 'Yangon',
				address : '1234 Park Drive',
				instructions : 'Leave at front door',
			},
			joined: new Date(2021, 0, 10),
			notes : '',
		},
		{ 
			id: 'u-2', 
			name: 'Trevor', 
			phone: '111 222 333',
			location: {
				city : 'Mandalay',
				address : '1234 Road Street',
				instructions : '',
			},
			joined: new Date(2021, 1, 7),
			notes : '',
		},
		{ 
			id: 'u-3', 
			name: 'John', 
			phone: '123 123 123',
			location: {
				city : 'Yangon',
				address : '1234 Ave Lane',
				instructions : 'Put in mailbox',
			},
			joined: new Date(2021, 2, 7),
			notes : '',
		},
		{ 
			id: 'u-4', 
			name: 'Mary', 
			phone: '000 111 000',
			location: {
				city : 'Yangon',
				address : '1234 Road Road',
				instructions : '',
			},
			joined: new Date(2021, 2, 8),
			notes : '',
		},
	],
	shipments: [
		{
			id: uniqid('s-'),
			code: 17,
			start_date: new Date(2021, 1, 20),
			ship_date: new Date(2021, 4, 1),
			shipped: true,
		},
		{
			id: uniqid('s-'),
			code: 18,
			start_date: new Date(2021, 4, 1),
			ship_date: undefined,
			shipped: false,
		}
	],
	orders: [
		{ 
			id: uniqid('o-'), 
			order_code: 1,
			shipment_code: 17,
			order_date: new Date(2021, 0, 20),
			customer: 'u-0',
			items: [
				{
					id: uniqid('i-'),
					product: 'p-0',
					quantity: 1,
				},
				{
					id: uniqid('i-'),
					product: 'p-1',
					quantity: 1,
				},
			],
			paid: false,
			notes: '',
		},
		{ 
			id: uniqid('o-'), 
			order_code: 2,
			shipment_code: 17,
			order_date: new Date(2021, 0, 20),
			customer: 'u-1',
			items: [
				{
					id: uniqid('i-'),
					product: 'p-1',
					quantity: 1,
				},
				{
					id: uniqid('i-'),
					product: 'p-0',
					quantity: 1,
				},
				{
					id: uniqid('i-'),
					product: 'p-2',
					quantity: 3,
				},
			],
			paid: false,
			notes: '',
		},
		{ 
			id: uniqid('o-'), 
			order_code: 3,
			shipment_code: 17,
			order_date: new Date(2021, 1, 7),
			customer: 'u-1',
			items: [
				{
					id: uniqid('i-'),
					product: 'p-1',
					quantity: 1,
				},
				{
					id: uniqid('i-'),
					product: 'p-2',
					quantity: 1,
				},
			],
			paid: true,
			notes: '',
		},
		{ 
			id: uniqid('o-'), 
			order_code: 4,
			shipment_code: 17,
			order_date: new Date(2021, 2, 25),
			customer: 'u-3',
			items: [
				{
					id: uniqid('i-'),
					product: 'p-0',
					quantity: 2,
				},
			],
			paid: false,
			notes: '',
		},
		{ 
			id: uniqid('o-'), 
			order_code: 5,
			shipment_code: 17,
			order_date: new Date(2021, 2, 26),
			customer: 'u-4',
			items: [
				{
					id: uniqid('i-'),
					product: 'p-1',
					quantity: 2,
				},
				{
					id: uniqid('i-'),
					product: 'p-3',
					quantity: 1,
				},
			],
			paid: false,
			notes: '',
		},
		{ 
			id: uniqid('o-'), 
			order_code: 6,
			shipment_code: 0,
			order_date: new Date(2021, 3, 8),
			customer: 'u-2',
			items: [
				{
					id: uniqid('i-'),
					product: 'p-2',
					quantity: 3,
				},
			],
			paid: true,
			notes: '',
		},
		{ 
			id: uniqid('o-'), 
			order_code: 7,
			shipment_code: 0,
			order_date: new Date(2021, 3, 16),
			customer: 'u-4',
			items: [
				{
					id: uniqid('i-'),
					product: 'p-0',
					quantity: 1,
				},
				{
					id: uniqid('i-'),
					product: 'p-1',
					quantity: 1,
				},
				{
					id: uniqid('i-'),
					product: 'p-4',
					quantity: 1,
				},
			],
			paid: false,
			notes: '',
		},
		{ 
			id: uniqid('o-'), 
			order_code: 8,
			shipment_code: 0,
			order_date: new Date(2021, 3, 16),
			customer: 'u-0',
			items: [
				{
					id: uniqid('i-'),
					product: 'p-2',
					quantity: 1,
				},
				{
					id: uniqid('i-'),
					product: 'p-3',
					quantity: 2,
				},
				{
					id: uniqid('i-'),
					product: 'p-4',
					quantity: 1,
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
			name: 'Shirt Large',
			description: 'A bottle of Water.',
			size: 'L',
			price: 13000,
		},
		{
			id: 'p-4',
			name: 'Water',
			description: 'A bottle of Water.',
			size: '',
			price: 1000,
		},
	],
})

export default data;