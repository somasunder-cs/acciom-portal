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
                <td className="manageConnectionLabel"><label className="manageConnectionHeading">Select Connection Type:</label></td>
                <td>
                <div >
                  <label className="form-check-label">
                    <input
                      type="radio"
                      value="source"
                      name="connectionType"
                      onChange={ (e) => handleConnectionChange()}
                    />&nbsp;
                    Source&nbsp;
                  </label>

                  <label className="form-check-label">
                    <input
                      type="radio"
                      value="target"
                      name="connectionType"
                      onChange={ (e) => handleConnectionChange()}
                    />&nbsp;
                    Target
                  </label>
						    </div>
                    {/* <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
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
                    </RadioGroup>                     */}
                  </td>
              </tr>
          </tbody>
          </Table>
  );
}