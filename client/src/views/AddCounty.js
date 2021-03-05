import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

import { Container } from 'reactstrap'

import FormGenerator from '../components/FormGenerator'

import CountyDataService from '../services/counties.service'

class AddCounty extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			entries: [],
		}
		
		this.componentIDs = {
			title: 'Add Counties',
			formgroup: 'inputs_',
			morerowsbtn: 'addrows',
			lessrowsbtn: 'remrows',
		}

		this.inputAttributes = [
			{
				colmd: '2',
				type: 'number',
				id: 'code_',
				placeholder: 'County Code',
				note: 'ANSI numeric (e.g. 070020)'
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
		const finalEntries = this.state.entries.map(entry => {
			return { 
				...entry, 
				home_state: ''
			}
		})

		CountyDataService
			.create({
				entries: finalEntries
			})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}

	handleChange() {

	}

	render() {
		return (
			<Container>
				<FormGenerator 
					min='4' 
					max='10'  
					componentIDs={this.componentIDs}
					inputAttributes={this.inputAttributes}
					handleSubmit={this.handleSubmit.bind(this)}
				/>
			</Container>
		)
	}
}
export default AddCounty