import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

import {FormGroup, Col, Input, FormText } from 'reactstrap'

/*
	generateInputs parameter:
	c = literal object containing customized input attributes
*/
function generateInputs(c, p, f) {
	let i = []
	for(let j = 0; j < c.length; j++) {
		i.push(
			<Col 
				md = {`${c[j].colmd}`} 
				key = {`${c[j].id}${j + 1}`}
			>
				<Input 
					type = {`${c[j].type}`}
					id = {`${c[j].id}${j + 1}`} 
					name = {`${c[j].id}${j + 1}`}
					placeholder = {`${c[j].placeholder}`}
					min = {c[j].type === 'number' ? '1' : ''}
					onChange = {f}
				/>
				{
					(p) ? <FormText color='muted'>{`${c[j].note}`}</FormText> : ''
				}
			</Col>
		)
	}
	return i
}

export default class InputGroupGenerator extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			entries: [],
			value: {}
		}

		this.createNewEntry = this.createNewEntry.bind(this)
		this.handleInputsChanges = this.handleInputsChanges.bind(this)
		this.generateFormGroups = this.generateFormGroups.bind(this)
	}

	createNewEntry(e, found) {
		let newEntry = {}
		for (let n = 0; n < this.props.inputattr.length; n++) {
			if (e.target.id.includes(`${this.props.inputattr[n].id}`)) {
				newEntry[`${this.props.inputattr[n].id}`] = e.target.value
				if (found) {
					continue
				} else {
					break
				}
			}
			newEntry[`${this.props.inputattr[n].id}`] = found[`${this.props.inputattr[n].id}`]
		}
		newEntry.entry_id = e.nativeEvent.path[3].id

		this.setState(() => {
			return{
				value: newEntry
			}
		}, () => {
			this.setState((state) => {
				const entries = [ ...state.entries, state.value ]
				const value = {}
				return {
					entries,
					value
				}
			})
		})
	}

	handleInputsChanges(e) {
		let found = this.state.entries.find(entry =>
			entry.entry_id === e.nativeEvent.path[3].id
		)

		if (found) {
			let toCompare = found
			this.setState((state) => {
				const entries = state.entries.filter((entry) => 
					toCompare.entry_id !== entry.entry_id
				)
				return { 
					entries,
				}
			}, () => {
				this.createNewEntry(e, found)
			})
		} else {
			this.createNewEntry(e, found)
		}
	}

	/*
		formGroupDOM parameters:
		k = maximum limit of inputs to render
		h = current numper of hidden inputs
		m = event listener for FormGroup
		f = prefix for each FormGroup key and id
		c = literal object containing customized input attributes
	*/
	generateFormGroups(k, h, f, c) {
		let inputgroups = []
		for (let i = 1; i <= k; i++) {
			inputgroups.push(
				<FormGroup 
					key = {`${f}${i}`} 
					id = {`${f}${i}`} 
					onChange = {this.handleInputsChanges}
					hidden = {i > h ? true : false}
					row
				>
					{ generateInputs(c, (i === 1)) }
				</FormGroup>
			)
		}
		return inputgroups
	}

	render() {
		return (
			<>
				{
					this.generateFormGroups(
						this.props.max, 
						this.props.min, 
						this.props.formgroupprefix, 
						this.props.inputattr
					)
				}
			</>
		)
	}
}

