import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col, Form, Button } from 'reactstrap'

import ControllableButton from './ControllableButton'
import InputGroupGenerator from './InputGroupGenerator'

export default class FormGenerator extends React.Component {
	constructor(props) {
		super(props)

		this.min = this.props.min * 1
		this.max = this.props.max * 1

		this.state = {
			counter: this.min,
			data: []
		}

		this.formRef = React.createRef()
		this.moreRowsBtnRef = React.createRef()
		this.lessRowsBtnRef = React.createRef()

		this.controlFormGroups = this.controlFormGroups.bind(this)
		this.moreRows = this.moreRows.bind(this)
		this.lessRows = this.lessRows.bind(this)
		this.generateForm = this.generateForm.bind(this)
	}

	componentDidMount() {
		ReactDOM.render(
			<InputGroupGenerator
				max = {this.max} 
				min = {this.min}
				formgroupprefix = {this.props.componentIDs.formgroup}
				inputattr = {this.props.inputAttributes}
			/>, 
			this.formRef.current
		)
		this.moreRowsBtnRef.current.setVisibility(true)
		this.lessRowsBtnRef.current.setVisibility(false)
	}

	generateForm() {
		ReactDOM.render(
			<InputGroupGenerator
				max = {this.max} 
				min = {this.state.counter}
				formgroupid = {this.props.componentIDs.formgroup}
				inputattr = {this.props.inputAttributes}
			/>, 
			this.formRef.current
		)
	}

	moreRows() {
		this.setState((state) => {
			return {
				counter: state.counter + 1
			}
		}, () => {
			this.generateFormGroups()
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
				this.generateFormGroups()
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
	}

	controlFormGroups(e) {
		if (e.target.id === this.props.componentIDs.morerowsbtn) {
			this.moreRows()
		} else if (e.target.id === this.props.componentIDs.lessrowsbtn) {
			this.lessRows()
		}
	}

	render() {
		return (
			<>
				<Row onMouseUp={this.controlFormGroups}>
					<Col md='3'>
						<h3>{this.props.componentIDs.title}</h3>
					</Col>
					<Col md='1 offset-1'>
						<ControllableButton 
							color = 'info' 
							block 
							id = {this.props.componentIDs.lessrowsbtn} 
							ref = {this.lessRowsBtnRef}
						>
							-
						</ControllableButton>
					</Col>
					<Col md='1'>
						<ControllableButton 
							color = 'warning' 
							block 
							id = {this.props.componentIDs.morerowsbtn} 
							ref = {this.moreRowsBtnRef}
						>
							+
						</ControllableButton>
					</Col>
				</Row>
				<Form
					innerRef = {this.formRef}
					className = 'mt-3'
				>
				</Form>
				<Row>
					<Col md='3 offset-3'>
						<Button 
							color = 'primary' 
							block
						>Submit</Button>
					</Col>
				</Row>
			</>
		)
	}
}