import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

class Dropdown extends Component {
	constructor(props) {
		super(props)
		this.handleSelectChange = this.handleSelectChange.bind(this)
		this.state = {
			selected: 1,
		}
	}

	handleSelectChange(e) {
		this.setState(e => ({
			selected: e.target.value
		}))
	}

	render() {
		return (
			<select className="form-control" id={this.props.id} aria-label={this.props.label} onSelect={this.props.handleSelectChange}>
				<option defaultValue>{this.props.label}</option>
				{
					this.props.choices.map((choice) => (
						<option key={choice.value} value={choice.value}>{choice.label}</option>
					))
				}
			</select>
		)
	}
}
// function Dropdown(props) {

// 	handleSelectChange = (e) => {
		
// 	}

// 	const choices = props.choices
// 	const dropdownItems = choices.map((choice) => 
// 		<option key={choice.value.toString()} value={choice.value}>{choice.label}</option>
// 	)

// 	return (
// 		<select className={props.id} aria-label={props.label}>
// 			<option defaultValue>{props.label}</option>
// 			{dropdownItems}
// 		</select>
// 	)
// }

export default Dropdown