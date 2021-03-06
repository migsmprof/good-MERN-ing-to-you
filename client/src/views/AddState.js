import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

import { Container } from 'reactstrap'

import DynamicForm from '../components/DynamicForm'

import StateDataService from '../services/states.service'

class AddState extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			entries: [],
		}
		
		this.componentattrs = {
			title: {
				text: 'Add States',
				colmd: '2',
			},
			morerowsbtn: {
				id: 'addrows',
				colmd: '1',
			},
			lessrowsbtn: {
				id: 'remrows',
				colmd: '1 offset-3',
			},
			submitbtn: {
				colmd: '2 offset-5',
			}
		}

		this.inputattrs = [
			{
				colmd: '2',
				type: 'number',
				field: 'code',
				placeholder: 'State Code',
				note: 'ANSI numeric (e.g. 07)'
			},
			{
				colmd: '5',
				type: 'text',
				field: 'state_name',
				placeholder: 'State Name',
				note: 'Capitalized.'
			}
		]
	}

	handleSubmit(e, data) {
		e.preventDefault()
		const final = data.map(datum => {
			return {
				code: datum[`${Object.keys(datum).filter(key => key.includes('code'))}`],
				state_name: datum[`${Object.keys(datum).filter(key => key.includes('state_name'))}`]
			}
		})
		StateDataService
			.create({
				entries: final
			})
			.then(res =>
				console.log('Successfully created! Status Code ' + res.status)	
			)
			.catch(err =>
				console.log(err.message)	
			)
	}


	render() {
		return (
			<Container>
				<DynamicForm 
					min ='4' 
					max = '10'  
					componentattrs = {this.componentattrs}
					inputattrs = {this.inputattrs}
					onSubmit = {(e, finalset) => this.handleSubmit(e, finalset)}
				/>
			</Container>
		)
	}
}

export default AddState