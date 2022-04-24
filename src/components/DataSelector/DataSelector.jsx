import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import React from "react";

export default class DataSelector extends React.Component {
  render() {
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.infectedOn}
              onChange={this.props.toggleInfectedData}
              className="checkedA"
              style={{ color: "red" }}
            />
          }
          label="Infected"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.recoveredOn}
              onChange={this.props.toggleRecoveredData}
              className="checkedB"
              style={{ color: "green" }}
            />
          }
          label="Recovered"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.deathOn}
              onChange={this.props.toggleDeathData}
              name="checkedC"
              style={{ color: "black" }}
            />
          }
          label="Dead"
        />
      </FormGroup>
    );
  }
}
