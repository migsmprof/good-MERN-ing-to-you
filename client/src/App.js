/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

// Components
import Dropdown from './components/dropdown'

// Routes/Data Services
import StateDataService from './services/states.service'
import CountyDataService from './services/voters.service'

class App extends Component {
	constructor(props) {
		super(props)
		this.retrieveAllStates = this.retrieveAllStates.bind(this)
		this.retrieveAllCounties = this.retrieveAllCounties.bind(this)
		this.state = {
			allStates: {},
			allCounties: {}
		}
	}

	retrieveAllStates() {
		StateDataService
			.getAll()
			.then(response => {
				this.setState({
					allStates: Object.values(response.data)
				})
			})
			.catch(err => {
				this.setState({
					allStates: {}
				})
			})
	}

	retrieveAllCounties() {
		CountyDataService
			.getAll()
			.then(response => {
				return response.data
			})
			.catch(err => {
				return {}
			})
	}

    render() {
		const allStates = this.retrieveAllStates()
        return ( 
			<Dropdown name="home_state" label="Select State" optionItems={allStates}/>
		)
    }
}

export default App