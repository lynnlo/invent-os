// Lynn Ong. 2021

import * as React from 'react';
import { ArrowBack } from '@material-ui/icons';
import { TextInput, Filter, Button } from 'react-admin';

export const Search = props => (
	<Filter {...props}>
		<TextInput label="Search" source="q" alwaysOn />
	</Filter>
)

export const Back = () => (
	<Button label="Back" startIcon={<ArrowBack />} onClick={() => {window.history.back()}} />
)