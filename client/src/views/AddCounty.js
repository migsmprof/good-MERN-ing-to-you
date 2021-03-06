import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

import { Container, Row, Col } from 'reactstrap'

import DynamicForm from '../components/DynamicForm'
import Dropdown from '../components/Dropdown'

import StateDataService from '../services/states.service'
import CountyDataService from '../services/counties.service'

class AddCounty extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			entries: [],
			dropdownOpen: false,
			home_state: null,
		}
		
		this.selectStateRef = React.createRef()

		this.componentattrs = {
			title: {
				text: 'Add Counties',
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
				placeholder: 'County Code',
				note: 'ANSI numeric (e.g. 07)'
			},
			{
				colmd: '5',
				type: 'text',
				field: 'county_name',
				placeholder: 'County Name',
				note: 'Capitalized.'
			}
		]

		this.toggle = this.toggle.bind(this)
		this.handleChooseStateChange = this.handleChooseStateChange.bind(this)
	}

	handleSubmit(e, data) {
		e.preventDefault()
		const final = data.map(datum => {
			return {
				code: datum[`${Object.keys(datum).filter(key => key.includes('code'))}`],
				county_name: datum[`${Object.keys(datum).filter(key => key.includes('county_name'))}`],
				home_state: this.state.home_state
			}
		})
		CountyDataService
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

	handleChooseStateChange(e) {
		this.setState(() => {
			return {
				home_state: e.target.value
			}
		})
	}

	componentDidMount() {
		StateDataService
			.getAll()
			.then(res => {
				this.setState(
					{ 
						allStates: res.data
					}, () => {	
						this.selectStateRef
							.current
							.setOptions(this.state.allStates, "Choose State")
					}
				)
			})
			.catch(err => {
				console.log(err)
			})
	}

	toggle() {
		this.setState((state) => {
			return {
				dropdownOpen: !state.dropdownOpen
			}
		})
	}

	render() {
		return (
			<Container>
				<Row>
					<Col md='4 offset-8'>
						<Dropdown 
							className="form-select"
							id="home_state" 
							label="Choose State" 
							onChange={this.handleChooseStateChange} 
							ref={this.selectStateRef}
						/>
					</Col>
				</Row>
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

export default AddCounty