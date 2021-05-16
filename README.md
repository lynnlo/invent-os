## Invent OS
#### Created by Lynn O.
#
#### Full featured inventory and order management system

&nbsp;


## Developer's Guide

&nbsp;

### Data Types

## ` User `

```js
- ID : String // 'u-' + id
- Name : String
- Phone : String
- Location : Object
	- City : String
	- Address : String
	- Instruction : String
- Notes : String
```

## ` Shipment `
```js
- ID : String // 's-' + id
- Code : Number
- Start_Date : Date
- Ship_Date : Date
- Shipped : Boolean
```


## ` Order `

```js
- ID : String // 'o-' + id
- Order_Code : Number
- Shipment_Code : Number // Reference Code
- Order_Date : Date
- Customer : String // Reference ID
- Items : Array<Object>
	- Items.ID : String // 'i-' + id
	- Items.Product : String // Reference ID
	- Items.Quantity : Number
- Notes : String
```

## ` Product  `

```js
- ID : String // 'p-' + id
- Name : String
- Description : String
- Size : String
- Price : Number
```

&nbsp;

### 