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
			label: '',
		}
		this.setOptions = this.setOptions.bind(this)
		this.removeLabelVisibility = this.removeLabelVisibility.bind(this)
	}

	setOptions(entries, label) {
		let options = organizeValues(entries)
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

	render() {
		if (this.state.removeLabel) {
			return (
				<select 
					className = {this.props.className} 
					id = {this.props.id} 
					name = {this.props.id} 
					aria-label = {this.state.label} 
					onChange = {this.props.onChange} 
					value = {this.state.options[0].value}
				>
					{
						this.state.options.map(option => (
							<option 
								key={option.value} 
								value={option.value}
							>{option.label}</option>
						))
					}
				</select>
			)
		} else if (this.state.disabled) {
			return (
				<select 
					className = {this.props.className} 
					id = {this.props.id} 
					name = {this.props.id} 
					aria-label = {this.state.label} 
					onChange = {this.props.onChange} 
					disabled
				>
					<option 
						key='' 
						value='' 
					defaultValue>{this.state.label}</option>
				</select>
			)
		} else {
			return (
				<select 
					className = {this.props.className} 
					id = {this.props.id} 
					name = {this.props.id} 
					aria-label = {this.state.label} 
					onChange = {this.props.onChange}
				>
					<option 
						key='' 
						value='' 
						defaultValue
					>{this.state.label}</option>
					{
						this.state.options.map(option => (
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
}

export default Dropdown