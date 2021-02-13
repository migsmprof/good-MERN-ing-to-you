import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Dropdown = (props) => {
	const results = props.res;
	return (
		<select className="form-select" name={props.name}>
			<option selected>Choose {props.text}</option>
			<DropdownItems res={results} />
		</select>
	);
}

const DropdownItems = (props) => {
	const results = props.res;
	const dropdownItems = results.map((result) => (
		<option value={result.val}>{result.text}</option>
	));
	return {dropdownItems};
}

export default Dropdown;