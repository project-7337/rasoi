import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	Grid,
	TextField,
	Button,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio
} from '@material-ui/core';

export default function AddressBox(props) {

	const { open, handleClose, handleSubmit, operation } = props;

	const onClose = () => {
		handleClose();
	}

	const onSubmit = () => {
		handleSubmit();
	}

	return (
		<div>
			<Dialog
				open={open}
				onClose={onClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">{operation=="ADD" ? "Add" : "Update"} Address</DialogTitle>
				<DialogContent>
					<Grid container spacing={3} >
						<Grid item xs={12} sm={12} md={12} >
							<TextField required fullWidth id="completeAddress" label="Complete Address" variant="outlined" type='input' />
						</Grid>
						<Grid item xs={12} sm={12} md={12} >
							<TextField id="Floor" fullWidth label="Floor (optional)" variant="outlined" type='input' />
						</Grid>
						<Grid item xs={12} sm={12} md={12} >
							<TextField id="Landmark" fullWidth label="Nearby Landmark (Optional)" variant="outlined" type='input' />
						</Grid>
						<Grid item xs={12} sm={12} md={12} >
							<FormControl component="fieldset">
								<RadioGroup row aria-label="addressType" name="addressType">
									<FormControlLabel
										value="Home"
										control={<Radio color="primary" />}
										label="Home"
									/>
									<FormControlLabel
										value="Office"
										control={<Radio color="primary" />}
										label="Office"
									/>
									<FormControlLabel
										value="Hotel"
										control={<Radio color="primary" />}
										label="Hotel" />
									<FormControlLabel
										value="Other"
										control={<Radio color="primary" />}
										label="Other"
									/>
								</RadioGroup>
							</FormControl>
						</Grid>
					</Grid>
				</DialogContent >
				<DialogActions>
					<Button onClick={onClose} color="primary">
						Later
					</Button>
					<Button onClick={onClose} color="primary">
						Update
					</Button>
				</DialogActions>
			</Dialog >
		</div >
	)
}