import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ManageConnectionSelect from './ManageConnectionSelect';

export default function FormControlLabelPosition() {
	const [value, setValue] = React.useState('source');

	function handleChange(event) {
		setValue(event.target.value);
	}

	return (
		<FormControl component="fieldset">
			<label>Select Connection Type:</label>
			<RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
				<FormControlLabel
					value="source"
					control={<Radio color="primary" />}
					label="Source"
				/>
				<FormControlLabel
					value="target"
					control={<Radio color="primary" />}
					label="Target"
				/>
			</RadioGroup>
			<ManageConnectionSelect></ManageConnectionSelect>
		</FormControl>
	);
}