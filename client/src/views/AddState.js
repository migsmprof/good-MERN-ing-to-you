import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

import { Container } from 'reactstrap'

import FormGenerator from '../components/FormGenerator'

import StateDataService from '../services/states.service'

class AddState extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			entries: [],
		}
		
		this.componentIDs = {
			title: 'Add States',
			formgroup: 'inputs_',
			morerowsbtn: 'addrows',
			lessrowsbtn: 'remrows',
		}

		this.inputAttributes = [
			{
				colmd: '2',
				type: 'number',
				id: 'code_',
				placeholder: 'State Code',
				note: 'ANSI numeric (e.g. 07)'
			},
			{
				colmd: '4',
				type: 'text',
				id: 'name_',
				placeholder: 'State Name',
				note: 'Capitalized.'
			}
		]

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit() {
		console.log()
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

	render() {
		return (
			<Container>
				<FormGenerator 
					min='4' 
					max='10'  
					componentIDs={this.componentIDs}
					inputAttributes={this.inputAttributes}
					handleSubmit={this.handleSubmit}
				/>
			</Container>
		)
	}
}

export default AddState