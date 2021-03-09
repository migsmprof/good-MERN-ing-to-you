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
		this.fillOptions = this.fillOptions.bind(this)
		this.changeOptions = this.changeOptions.bind(this)
	}

	setOptions(entries, label) {
		const options = organizeValues(entries, label)
		this.setState(() => {
			return {
				options,
			}
		})
	}

	removeLabelVisibility(bool) {
		this.setState(() => {
			return {
				removeLabel: bool
			}
		})
	}

	fromDisable(bool) {
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

	fillOptions(fn) {
		if (fn()) {	
			this.setOptions(fn().entries, fn().label)
		} else {
			this.removeLabelVisibility(false)
			this.fromDisable(false)
		}
	}

	changeOptions(e) {
		(this.props.fillEffect && this.props.fillEffect(e))
	}

	componentDidMount() {
		if (this.props.fillOptions) {
			this.fillOptions(this.props.fillOptions)
		}
	}

	render() {
		return (
			<select 
				className = {this.props.className} 
				id = {this.props.id} 
				name = {this.props.id} 
				aria-label = {this.props.label} 
				onChange = {this.props.fillOptions ? this.changeOptions : this.props.onChange}
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