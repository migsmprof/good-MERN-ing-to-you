//React
import {Component, createRef} from 'react'

//Reactstrap
import {Container, Row, Col, Form, FormGroup, Input, Button, Alert} from 'reactstrap'

//DataServices
import StateDataService from '../services/states.service'
import CountyDataService from '../services/counties.service'
import VoterDataService from '../services/voters.service'

//Components
import Dropdown from '../components/Dropdown'

class AddVoter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allStates: [],
			allCounties: [],
			voter_state: null,
			voter_county: null,
			noticeColor: "primary",
			noticeMessage: "Complete the form below"
		}
		this.selectStateRef = createRef()
		this.selectCountyRef = createRef()
		this.inputLastNameRef = createRef()
		this.inputFirstNameRef = createRef()
		this.inputMiddleNameRef = createRef()
		this.handleChooseStateChange = this.handleChooseStateChange.bind(this)
		this.handleChooseCountyChange = this.handleChooseCountyChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
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
						this.selectCountyRef
							.current
							.toDisable(false)
					}
				)
			})
			.catch(err => {
				console.log(err)
			})
	}

	handleChooseStateChange(e) {
		if (e.target.value) {
			CountyDataService
				.getAll({ 
					home_state: e.target.value 
				})
				.then(res => {
					this.setState(
						{ 
							voter_state: e.target.value,
							allCounties: res.data
						}, () => {
							this.selectCountyRef
								.current
								.removeLabelVisibility(this.state.allCounties.length > 0)
							this.selectCountyRef
								.current
								.setOptions(this.state.allCounties, "County")
							this.selectCountyRef
								.current
								.toDisable(this.state.allCounties.length !== 0)
						})
				})
				.catch(err => {
					this.setState(() => {
						return {
							noticeColor: "danger",
							noticeMessage: `${err.message}.`
						}
					})
				})
		} else {
			this.setState(
				{
					allCounties: []
				}, () => {
					this.selectCountyRef
						.current
						.removeLabelVisibility(false)
					this.selectCountyRef
						.current
						.setOptions(this.state.allCounties)
					this.selectCountyRef
						.current
						.toDisable(false)
				}
			)
		}
	}

	handleChooseCountyChange(e) {
		if(e.target.value) {
			this.setState(() => {
				return {
					voter_county: e.target.value
				}
			})
		} else {
			this.setState(() => {
				return {
					voter_county: null
				}
			})
		}
	}

	handleClick() {
		const req = {
			last_name: this.inputLastNameRef.current.value,
			first_name: this.inputFirstNameRef.current.value,
			middle_name: this.inputMiddleNameRef.current.value,
			home_state: this.state.voter_state,
			home_county: this.state.voter_county
		}
		VoterDataService
			.create(req)
			.then(res => {
				let fullName 
					= res.data.first_name + " " + res.data.middle_name + " " + res.data.last_name
				this.setState(() => {
					return {
						noticeColor: "success",
						noticeMessage: `${fullName} is now a registered voter with ID number ${res.data.id}.`
					}
				})
			})
			.catch(err => {
				this.setState(() => {
					return {
						noticeColor: "danger",
						noticeMessage: `${err.message}`
					}
				})
			})
	}

	changeNoticeColor(color) {
		return color
	}

	changeNoticeMessage(message) {
		return message
	}


    render() {
		return (
			<Container>
				<Alert color={this.state.noticeColor}>
					{this.state.noticeMessage}
				</Alert>
				<h3>Registration Form</h3>
				<Form className="mt-3">
					<FormGroup>
						<Row>
							<Col md="2">
								<Dropdown 
									className="form-select"
									id="voter_state" 
									label="Choose State" 
									onChange={this.handleChooseStateChange} 
									ref={this.selectStateRef}
								/>
							</Col>
							<Col md="2">
								<Dropdown 
									className="form-select"
									id="voter_county"
									label="County: Choose State First"
									onChange={this.handleChooseCountyChange}
									ref={this.selectCountyRef}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Input 
							innerRef={this.inputLastNameRef} 
							type="text" 
							id="last_name" 
							name="last_name" 
							placeholder="Last Name" />
					</FormGroup>
					<FormGroup>
						<Input 
							innerRef={this.inputFirstNameRef} 
							type="text" 
							id="first_name" 
							name="first_name" 
							placeholder="First Name" />
					</FormGroup>
					<FormGroup>
						<Input 
							innerRef={this.inputMiddleNameRef} 
							type="text" 
							id="middle_name" 
							name="middle_name" 
							placeholder="Middle Name" />
					</FormGroup>
					<Row>
						<Col md={{size: 3, offset: 9}}>
							<Button 
								color="primary" 
								block 
								onClick={this.handleClick}
							>Submit</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		)
	}
}

export default AddVoter