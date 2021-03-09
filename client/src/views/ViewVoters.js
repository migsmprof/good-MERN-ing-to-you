//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

//React
import React from 'react'

//Reactstrap
import {Container, Row, Col} from 'reactstrap'

//Components
import DynamicTableForm from '../components/DynamicTableForm'

//Data Services
import StateDataService from '../services/states.service'
import CountyDataService from '../services/counties.service'
import VoterDataService from '../services/voters.service'

class ViewVoters extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			updateVoters: [], //for deleting one or more voters from system
			rows: [],
			states: [],
			counties: [],
			updateVoter: [], //for editing a single voter in the system
		}
		
		this.columns = [
			{
				name: 'ID'
			},
			{
				name: 'FULLNAME'
			},
			{
				name: 'STATE PRECINCT'
			},
			{
				name: 'COUNTY PRECINCT'
			}
		]
		
		this.handleGetCounties = (e) => {
			if (e.target.value) {
	
			}
			CountyDataService
				.getAll({
					home_state: e.target.value
				})
				.then(res => {
					this.setState(() => {
						return {
							counties: res.data
						}
					})
				}, () => {
					this.loadAllCounties()
				})
				.catch(err => {
					console.log(err)
				})
		}
	
		this.loadAllStates = () => {
			return {
				entries: this.state.states,
				label: null
			}
		}
	
		this.loadAllCounties = () => {
			if (this.state.counties.length > 0) {
				return {
					entries: this.state.counties,
					label: 'County'
				}
			} else {
				return null
			}
		}

		this.refChooseCounty = React.createRef()
	}

	handleUpdate(e, data) {
	}

	handleDelete(e) {
		const toDelete = e.target.id.split('_')[1]
		VoterDataService
			.delete(toDelete)
			.then((res) => {
					this.setState(() => {
						const updateVoters = this.state.updateVoters.filter(voter => voter.id !== toDelete)
						return {
							updateVoters,
						}
					}, () => {
						console.log('Delete entry. Message: ' + res.data)
					})
				}
			)
			.catch(err => 
				console.log('Failed. Message: ' + err.message)
			)
	}


	componentDidMount() {
		VoterDataService
		.getAll()
		.then(res => {
			this.loadAllStates(this.state.states, null)
			
			this.setState(() => {
				const rows = res.data.map((datum, i) => {
					return {
						pk: datum.id,
						fields: [
							//FULLNAME
							{
								value: `${datum.first_name} ${datum.middle_name} ${datum.last_name}`,
								forms: [
									{
										keyComponent: 'first_name',
										keyword: 'input',
										componentAttr: {
											type: 'text',
											id: `first_name_${i}`,
											name: 'first_name',
											legend: 'First Name',
											value: datum.first_name
										},
									},
									{
										keyComponent: 'middle_name',
										keyword: 'input',
										componentAttr: {
											type: 'text',
											id: `middle_name_${i}`,
											name: 'middle_name',
											legend: 'Middle Name',
											value: datum.middle_name
										},
									},
									{
										keyComponent: 'last_name',
										keyword: 'input',
										componentAttr: {
											type: 'text',
											id: `last_name_${i}`,
											name: 'last_name',
											legend: 'Last Name',
											value: datum.last_name
										},
									},
								]
							},
							//STATE PRECINCT
							{
								value: `${datum.state.state_name}`,
								forms: [
									{
										keyComponent: 'home_state',
										keyword: 'select',
										componentAttr: {
											id: `home_state_${i}`,
											name: 'home_state',
											legend: 'Choose State',
											value: datum.state.code,
											refe: React.createRef(),
										},
										componentFn: this.loadAllStates,
										componentFx: this.handleGetCounties,
									}
								]
							},
							//COUNTY PRECINCT
							{
								value: `${datum.county.county_name}`,
								forms: [
									{
										keyComponent: 'home_county',
										keyword: 'select',
										componentAttr: {
											id: `home_county_${i}`,
											name: 'home_county',
											legend: 'Choose State First',
											value: datum.state.code,
											refe: this.refChooseCounty,
										},
										componentFn: this.loadAllCounties
									}
								]
							}
						]
					}
				})
				return {
					rows,
				}
			}, () => {
				StateDataService
					.getAll()
					.then(res => {
						this.setState(() => {
							return {
								states: res.data
							}
						}, () => {
							this.loadAllStates(this.state.states, null)
							})
						})
						.catch(err => {
							console.log(err)
						})
					})
		})
		.catch(err => {
			console.log(err)
		})
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.counties !== this.state.counties) {
			console.log(this.refChooseCounty.current)
		}
	}

	render() {
		return (
			<Container>
				<Row>
					<Col md='3'>
						<h3>Registered Voters</h3>
					</Col>
					<Col md='offset-6 3' id='loc'></Col>
				</Row>
				<DynamicTableForm 
					onUpdate = {(e, data) => this.handleUpdate(e, data)}
					onDelete = {(e) => this.handleDelete(e)}
					columns = {this.columns}
					rows = {this.state.rows}
				/>
			</Container>
		)
	}
}

export default ViewVoters