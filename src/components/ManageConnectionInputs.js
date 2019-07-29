import React from 'react';
import { Panel, Button, Table } from 'react-bootstrap';

export default function FormControlLabelPosition() {
	const [value, setValue] = React.useState('source');

	function handleConnectionChange(event) {
		setValue(event.target.value);
	}

	function handleManageConnectionCaseUpdate(val) {
		console.log("handleManageConnectionCaseUpdate.state", val);
	};

	return (
		<Table className="manageConnection">
			<tbody>
				<tr>
					<td className="manageConnectionLabel"><label className="manageConnectionHeading manageConnectionsLabel">Select Connection Type:</label></td>
					<td>
						<div >
							<label className="form-check-label">
								<input
									type="radio"
									value="source"
									checked={true}
									name="connectionType"
									onChange={ (e) => handleConnectionChange(e)}
								/>
							</label>&nbsp; Source &nbsp;
							<label className="form-check-label">
								<input
									type="radio"
									value="target"
									name="connectionType"
									onChange={ (e) => handleConnectionChange(e)}
								/>
							</label>&nbsp; Target
						</div>
					</td>
				</tr>
			</tbody>
		</Table>
	);
}