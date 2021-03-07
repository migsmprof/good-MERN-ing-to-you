import 'bootstrap/dist/css/bootstrap.min.css'

import { Component } from 'react'

// Functions
function extractValues(o, i) {
	let a = Object.values(o)
	return a[i]
}
function organizeValues(d, e) {
	return d.map((datum) => (
		{
			value: extractValues(datum, 0),
			label: extractValues(datum, 1) + `${(e) ? (' ' + e) : ''}`
		}
	))
}

class Dropdown extends Component {
	constructor(props) {
		super(props)
		this.state = {
			options: [],
			removeLabel: false,
			disabled: false,
			controlledValue: '',
		}
		this.setOptions = this.setOptions.bind(this)
	}

	setOptions(entries, label) {
		let options = organizeValues(entries, label)
		this.setState(() => {
			return {
				options: options
			}
		}, () => {
			this.setState(() => {
				return {
					label: label
				}
			})
		})
	}

	removeLabelVisibility(bool) {
		this.setState(() => {
			return {
				removeLabel: bool
			}
		})
	}

	toDisable(bool) {
		this.setState(() => {
			return {
				disabled: !bool
			}
		})
	}

	setControlledValue(value) {
		this.setState(() => {
			return {
				controlledValue: value
			}
		})
	}

	render() {
		return (
			<select 
				className = {this.props.className} 
				id = {this.props.id} 
				name = {this.props.id} 
				aria-label = {this.props.label} 
				onChange = {this.props.onChange}
				disabled = {this.state.disabled ? true : false}
			>
				{
					!this.state.removeLabel
						&& (
							<option 
								key='' 
								value='' 
								defaultValue
							>{this.props.label}</option>
						)
				}
				{
					!this.state.disabled 
						&& this.state.options.map(option => (
							<option 
								key={option.value} 
								value={option.value}
							>{option.label}</option>
						))
				}
			</select>
		)
	}
}

export default Dropdown