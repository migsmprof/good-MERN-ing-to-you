import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import {Form, FormGroup, Col, Button } from 'reactstrap'

import ControllableButton from './ControllableButton'
import FormGroupGenerator from './FormGroupGenerator'

export default class DynamicForm extends React.Component {
	constructor(props) {
		super(props)
		this.min = this.props.min * 1
		this.max = this.props.max * 1
		this.componentattrs = this.props.componentattrs
		
		this.state = {
			counter: this.min,
			entries: [],
			items: [ ...new Array(this.max)].map((n, i) => {
				return {
					isHidden: ((i + 1) > (this.min)) ? true : false,
					noteIsHidden: (i + 1 === 1) ? false : true
				}
			})
		}
		
		
		this.formRef = React.createRef()
		this.moreRowsBtnRef = React.createRef()
		this.lessRowsBtnRef = React.createRef()

		this.controlFormGroups = this.controlFormGroups.bind(this)
		this.moreRows = this.moreRows.bind(this)
		this.lessRows = this.lessRows.bind(this)
		this.submitValues = this.submitValues.bind(this)

		this.getFormGroupValues = (newset) => {
			this.setState((state) => {
				const oldset =  (state.entries.length > 0) ?
									state.entries.filter(entry => 
										JSON.stringify(entry) !== JSON.stringify(newset)
									) : 
									state.entries
				const entries = [
					...oldset,
					newset
				]

				return {
					entries,
				}
			})
		}
	}

	componentDidMount() {
		this.moreRowsBtnRef.current.setVisibility(true)
		this.lessRowsBtnRef.current.setVisibility(false)
	}

	moreRows(e) {
		e.preventDefault()
		// Increments state variable "counter"
		this.setState(
			{ counter: this.state.counter + 1 }, 
			() => {
				// Updates state variable "items"
				this.setState(() => {
					let inputSetup = []
					for (let i = 1; i <= this.max; i++) {
						inputSetup.push(
							{
								key: 'formgroup-' + i,
								isHidden: (i > this.state.counter) ? true : false,
								noteIsHidden: (i === 1) ? false : true
							}
						)
					}
					const items = inputSetup
					return {
						items,
					}
				}, () => {
					// Toggles visibility of both buttons depending on the counter variable
					this.moreRowsBtnRef
						.current
						.setVisibility(
							(this.state.counter + 1) <= this.max
						)
					this.lessRowsBtnRef
						.current
						.setVisibility(
							this.state.counter > this.min
						)
				})
			}
		)
	}
	
	lessRows(e) {
		e.preventDefault()
		this.setState((state) => {
			const entries = state.entries.filter(entry =>
				Object.keys(entry)[0] !== `${this.props.inputattrs[0].field}-${state.counter}`
			)
			return {
				entries,
			}
		}, () => this.setState((state) => {
			return {
				counter: state.counter - 1
			}
		}, () => {
			this.setState(() => {
				let inputSetup = []
				for (let i = 1; i <= this.max; i++) {
					inputSetup.push(
						{
							key: 'formgroup-' + i,
							isHidden: (i > this.state.counter) ? true : false,
							noteIsHidden: (i === 1) ? false : true
						}
					)
				}
				const items = inputSetup
				return {
					items,
				}
			}, () => {
				let hiddenInputs = document.getElementsByClassName('inputsToHide')
				for (let i = 0; i < hiddenInputs.length; i++) {
					let inputID = hiddenInputs.item(i).id
					if (inputID.includes(`-${this.state.counter + 1}`))
						hiddenInputs.namedItem(inputID).value = ""
				}

				this.lessRowsBtnRef
					.current
					.setVisibility(
						(this.state.counter - 1) >= this.min
					)
				this.moreRowsBtnRef
					.current
					.setVisibility(
						this.state.counter < this.max
					)
			})
		})
	)
		
	}

	controlFormGroups(e) {
		e.preventDefault()
		if (e.target.id === this.componentattrs.morerowsbtn.id) {
			this.moreRows(e)
		} else if (e.target.id === this.componentattrs.lessrowsbtn.id) {
			this.lessRows(e)
		}
	}

	submitValues(e) {
		this.state.entries.length > 0 && this.props.onSubmit(e, this.state.entries)
	}

	render() {
		return (
			<Form id = 'theform'>
				<FormGroup row onClick = {this.controlFormGroups} onChange = {this.submitValues}>
					<Col md = {this.componentattrs.title.colmd}>
						<h3>{this.componentattrs.title.text}</h3>
					</Col>
					<Col md = {this.componentattrs.lessrowsbtn.colmd}>
						<ControllableButton 
							color = 'info' 
							block 
							id = {this.componentattrs.lessrowsbtn.id} 
							ref = {this.lessRowsBtnRef}
						>
							-
						</ControllableButton>
					</Col>
					<Col md = {this.componentattrs.morerowsbtn.colmd}>
						<ControllableButton 
							color = 'warning' 
							block 
							id = {this.componentattrs.morerowsbtn.id} 
							ref = {this.moreRowsBtnRef}
						>
							+
						</ControllableButton>
					</Col>
				</FormGroup>
				{
					this.state.items.map((item, i) => (
						<FormGroupGenerator
							inputattrs = {this.props.inputattrs}
							key = {`formgroup-${i + 1}`}
							keyname = {`formgroup-${i + 1}`}
							index = {i + 1 + ''}
							hidden = {item.isHidden}
							notehidden = {item.noteIsHidden}
							onChange = {(newset) => this.getFormGroupValues(newset)}
							className = {(i + 1 > this.min) ? 'inputsToHide' : ''}
						/> 
					))
				}
				<FormGroup row>
					<Col md={this.componentattrs.submitbtn.colmd}>
						<Button 
							color = 'primary' 
							block
							onClick = {this.submitValues}
						>Submit</Button>
					</Col>
				</FormGroup>
			</Form>
		)
	}
}