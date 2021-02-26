/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component, Fragment, useState } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

//DataServices
import StateDataService from './services/states.service'
import CountyDataService from './services/counties.service'

// Functions
function extractValues(o, i) {
	let a = Object.values(o)
	return a[i]
}

function organizeValues(d, e) {
	let o = []
	o = d.map((datum) => ({
		value: extractValues(datum, 0),
		label: extractValues(datum, 1) + `${(e) ? (' ' + e) : ''}`
	}))
	return o
}

function populateDropdown(v) {
	return v.map(choice => (
		<option key={choice.value} value={choice.value}>{choice.label}</option>
	))
}

function renderToDropdown(c, l, s) {
	ReactDOM.render(
		<Fragment>
			{(l) ? l : null}
			{c}
		</Fragment>,
		document.getElementById(s)
	)
}

// Routes/Data Services
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allStates: [],
			allCounties: [],
			voterState: null,
		}
		this.handleChooseStateChange = this.handleChooseStateChange.bind(this)
		// this.handleSelectCountyChange = this.handleSelectCountyChange.bind(this)
	}

	componentDidMount() {
		let options = []
		StateDataService
			.getAll()
			.then(res => {
				options = organizeValues(res.data)
				this.setState(
					{ allStates: options }, 
					() => renderToDropdown(
						populateDropdown(this.state.allStates), 
						<option defaultValue>Voter State</option>, 
						"voter_state")
					)
			})
			.catch(err => {
				console.log(err)
			})
	}

	handleChooseStateChange(e) {
		CountyDataService
			.getAll({ home_state: e.target.value })
			.then(res => {		
				let options = []
				options = organizeValues(res.data, "County")
				this.setState(
					{ 
						voterState: e.target.value,
						allCounties: options 
					}, 
					() => renderToDropdown(
						populateDropdown(this.state.allCounties), 
						null, 
						"voter_county")
					)
			})
			.catch(err => {
				console.log(err)
			})
	}

    render() {
		return (
			<div>
				<select className="form-control" id="voter_state" aria-label="Choose State" onChange={this.handleChooseStateChange}></select>
				<select className="form-control" id="voter_county" aria-label="Choose County">
				</select>
			</div>
		)
	}
}

export default App