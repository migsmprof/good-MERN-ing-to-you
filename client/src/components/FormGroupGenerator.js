import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

import {FormGroup, Col, Input, FormText } from 'reactstrap'

export default class FormGroupGenerator extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			values: {}
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.setValues = this.setValues.bind(this)
	}

	handleInputChange(e) {
		const found = Object.entries(this.state.values).filter(value =>
			Object.keys(value) === e.target.name
		)
		
		if (found) {
			this.setState(state => {
				delete state.values[found[0]]
				const tosave = {
					[e.target.name]: e.target.value
				}
				return {
					values: Object.assign(state.values, tosave)
				}
			}, () => {
				this.setValues(e)
			})	
		} else {
			this.setValues(e)
		}

		
	}

	setValues(e) {
		this.setState(state => {
			const values = {
				...state.values,
				[e.target.name]: e.target.value
			}
			return {
				values,
			}
		}, () => {
			Object.entries(this.state.values).length === this.props.inputattrs.length 
				&& this.props.onChange(this.state.values)
		})
	}

	render() {
		return (
			<FormGroup
				id = {this.props.keyname}
				hidden = {this.props.hidden ? true : false}
				onChange = {this.handleInputChange}
				row
			>
				{ 
					this.props.inputattrs.map(attr => (
						<Col 
							md = {attr.colmd}
							key = {`${this.props.keyname}-${attr.field}`}
						>
							<Input 
								type = {attr.type}
								idfield = {`${attr.field}-${this.props.index}`} 
								name = {`${attr.field}-${this.props.index}`}
								placeholder = {attr.placeholder}
								min = {attr.type === 'number' ? '1' : ''}
								hidden = {this.props.hidden}
							/>
							{
								(this.props.notehidden) 
									? '' 
									: <FormText color='muted'>{attr.note}</FormText>
							}
						</Col>
					))
				}
			</FormGroup>
		)
	}
}

