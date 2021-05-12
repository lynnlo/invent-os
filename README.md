## Invent OS
#### Created by Lynn O.
#
#### Full featured inventory and order management system

&nbsp;


## Developer's Guide

&nbsp;

### Data Types
#1

## ` User `

```js
- Name : String
- ID : String // 'u-' + id
- Orders : Object
	- Order.ID : Number
```

## ` Order `

```js
- Name : String
- ID : Number // 'o-' + id
- Items : Object
	- Item.Name : String
	- Item.ID : String
	- Item.Image : String
	- Item.Price : Number
	- Item.Amount : Number
```

## ` Item `

```js
- Name : String
- ID : String // 'i-' + id
- Image : String
- Price : Number
- Amount : Number
```

&nbsp;

### 