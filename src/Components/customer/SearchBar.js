import React from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	searchBar: {
		padding: '0px',
		margin: theme.spacing(2),
	},
	textField: {
		border: "none",
	}
}))
function sleep(delay = 0) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}
export const SearchBar = () => {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const loading = open && options.length === 0;
	const classes = useStyles()
	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
			await sleep(1e3); // For demo purposes.
			const countries = await response.json();

			if (active) {
				setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<Paper elevation={3} className={classes.searchBar} >
			<Autocomplete
				
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				getOptionSelected={(option, value) => option.name === value.name}
				getOptionLabel={(option) => option.name}
				options={options}
				loading={loading}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search for restaurants, cuisines or a dish"
						variant="outlined"
						className={classes.textField}
						InputProps={{
							...params.InputProps,
							endAdornment: (

								<InputAdornment position="end">
									<SearchIcon />
								</InputAdornment>

							), classes: { notchedOutline: classes.textField }
						}}
					/>
				)}
			/>
		</Paper>
	);
}
