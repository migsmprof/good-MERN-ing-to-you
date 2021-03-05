import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import ReactDOM from 'react-dom'

import {Container, Row, Col, Form, FormGroup, Input, Button} from 'reactstrap'

import ControllableButton from '../components/ControllableButton'

import StateDataService from '../services/states.service'

/*
	formGroupDOM parameters:
	k = maximum limit of inputs to render
	h = current numper of hidden inputs
	m = event listener for FormGroup
	f = prefix for FormGroup key and id
	c = prefix for 'code' Input id and name
	n = prefix for 'state_name' Input id and name
*/
function formGroupDOM(k, h, m, f, c, n) {
	let inputgroups = []
	for (let i = 1; i <= k; i++) {
		inputgroups.push(
			<FormGroup 
				key={`${f}${i}`} 
				id={`${f}${i}`} 
				onChange={m}
				hidden={i > h ? true : false}
			>
				<Row>
					<Col md='3'>
						<Input 
							type='text' 
							id={`${c}${i}`} 
							name={`${c}${i}`}
							placeholder='State Code (e.g. 07)'
						/>
					</Col>
					<Col md='3'>
						<Input 
							type='text' 
							id={`${n}${i}`} 
							name={`${n}${i}`}
							placeholder='Name of State'
						/>
					</Col>
				</Row>
			</FormGroup>
		)
	}
	return inputgroups
}

class AddState extends React.Component {
	constructor(props) {
		super(props)

		this.min = 4
		this.max = 8
		this.alertInterval = 20

		this.state = {
			counter: this.min,
			entries: [],
		}

		this.formRef = React.createRef()
		this.moreRowsRef = React.createRef()
		this.lessRowsRef = React.createRef()

		this.moreRowsId = 'addrows'
		this.lessRowsId = 'remrows'
		this.formGroupPrefix = 'inputs_'
		this.stateCodeInputPrefix = 'code_'
		this.stateNameInputPrefix = 'name_'

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputUpdate = this.handleInputUpdate.bind(this)

		this.modifyRows = this.modifyRows.bind(this)
		this.moreRows = this.moreRows.bind(this)
		this.lessRows = this.lessRows.bind(this)
	}

	handleSubmit() {
		StateDataService
			.create({
				entries: this.state.entries
			})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}

	handleInputUpdate(e) {
		let found = this.state.entries.find(entry =>
			entry.entry_id === e.nativeEvent.path[3].id
		)

		if (found) {
			let toCompare = found
			this.setState((state) => {
				const entries = state.entries.filter((entry) => toCompare.entry_id !== entry.entry_id)
				return { 
					entries,
				}
			}, () => {
				this.setState(() => {
					let new_entry = {}
					if (e.target.id.includes('code')) {
						new_entry.code = e.target.value * 1
						new_entry.state_nam = found.state_name
					} else if (e.target.id.includes('name')) {
						new_entry.code = found.code
						new_entry.state_name = e.target.value
					}
					new_entry.entry_id = e.nativeEvent.path[3].id

					return {
						value: new_entry,
					}
				}, () => {
					this.setState(state => {
						const entries = [...state.entries, state.value]

						return {
							entries,
							value: {},
						}
					})
				})
			})
		} else {
			this.setState(() => {
				let entry = {}
				if (e.target.id.includes('code')) {
					entry.code = e.target.value
				} else if (e.target.id.includes('name')) {
					entry.state_name = e.target.value
				}
				entry.entry_id = e.nativeEvent.path[3].id

				return {
					value: entry,
				}
			}, () => {
				this.setState(state => {
					const entries = [...state.entries, state.value]

					return {
						entries,
						value: {},
					}
				})
			})
		}
	}

	modifyRows(e) {
		if (e.target.id === this.moreRowsId) {
			this.moreRows()
		} else if (e.target.id === this.lessRowsId) {
			this.lessRows()
		}
	}

	moreRows() {
			this.setState((state) => {
				return {
					counter: state.counter + 1
				}
			}, () => {
				ReactDOM.render(
					formGroupDOM(
						this.max, 
						this.state.counter, 
						this.handleInputUpdate, 
						this.formGroupPrefix, 
						this.stateCodeInputPrefix, 
						this.stateNameInputPrefix
					), 
					this.formRef.current
				)
				this.moreRowsRef.current.setVisibility((this.state.counter + 1) <= this.max)
				this.lessRowsRef.current.setVisibility(this.state.counter > this.min)
			})
	}

	lessRows() {
			this.setState((state) => {
				const entries = state.entries.filter(
					entry => !entry.entry_id.includes(state.counter)
				)

				return {
					entries,
				}
			}, () => {
				this.setState((state) => {
					return {
						counter: state.counter - 1
					}
				}, () => {
					ReactDOM.render(
						formGroupDOM(
							this.max, 
							this.state.counter, 
							this.handleInputUpdate, 
							this.formGroupPrefix, 
							this.stateCodeInputPrefix, 
							this.stateNameInputPrefix
						), 
						this.formRef.current
					)
					this.lessRowsRef.current.setVisibility((this.state.counter - 1) >= this.min)
					this.moreRowsRef.current.setVisibility(this.state.counter < this.max)
				})
			})
	}

	componentDidMount() {
		ReactDOM.render(
			formGroupDOM(
				this.max, 
				this.min, 
				this.handleInputUpdate, 
				this.formGroupPrefix, 
				this.stateCodeInputPrefix, 
				this.stateNameInputPrefix
			), 
			this.formRef.current
		)
		this.moreRowsRef.current.setVisibility(true)
		this.lessRowsRef.current.setVisibility(false)
	}

	render() {
		return (
			<Container>
				<Row onMouseUp={this.modifyRows}>
					<Col md='3'><h3>Add States</h3></Col>
					<Col md='1 offset-1'>
						<ControllableButton color='info' block id={this.lessRowsId} ref={this.lessRowsRef}>
							-
						</ControllableButton>
					</Col>
					<Col md='1'>
						<ControllableButton color='warning' block id={this.moreRowsId} ref={this.moreRowsRef}>
							+
						</ControllableButton>
					</Col>
				</Row>
				<Form innerRef={this.formRef} className='mt-4'>
				</Form>
				<Row>
					<Col md='3 offset-3'>
						<Button color='primary' block onClick={this.handleSubmit}>Submit</Button>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default AddState