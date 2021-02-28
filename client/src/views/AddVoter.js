//React
import {Component, createRef} from 'react'

//DataServices
import StateDataService from '../services/states.service'
import CountyDataService from '../services/counties.service'
//import VoterDataService from '../services/voters.service'

//Components
import Dropdown from '../components/dropdown'

// Functions
function extractValues(o, i) {
	let a = Object.values(o)
	return a[i]
}
function organizeValues(d, e) {
	return d.map((datum) => (
		{
			value: extractValues(datum, 0),
			label: extractValues(datum, 1) + `${(e) ? (' ' + e) : ''}`
		}
	))
}

class AddVoter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allStates: [],
			allCounties: [],
		}
		this.selectStateRef = createRef()
		this.selectCountyRef = createRef()
		this.handleChooseStateChange = this.handleChooseStateChange.bind(this)
		this.handleChooseCountyChange = this.handleChooseCountyChange.bind(this)
	}

	componentDidMount() {
		StateDataService
			.getAll()
			.then(res => {
				let options = organizeValues(res.data)
				this.setState(
					{ 
						allStates: options 
					}, () => {	
						this.selectStateRef.current.setOptions(this.state.allStates)
						this.selectCountyRef.current.toDisable(true)
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
					let options = organizeValues(res.data, "County")
					this.setState(
						{ 
							voterState: e.target.value,
							allCounties: options 
						}, () => {
							this.selectCountyRef.current.removeLabelVisibility(this.state.allCounties.length > 0)
							this.selectCountyRef.current.setOptions(this.state.allCounties)
							this.selectCountyRef.current.toDisable(this.state.allCounties.length === 0)
						})
				})
				.catch(err => {
					console.log(err)
				})
		} else {
			this.setState(
				{
					allCounties: []
				}, () => {
					this.selectCountyRef.current.removeLabelVisibility(false)
					this.selectCountyRef.current.setOptions(this.state.allCounties)
					this.selectCountyRef.current.toDisable(true)
				}
			)
		}
	}

	handleChooseCountyChange(e) {
		console.log(e.target.value)
	}

    render() {
		return (
			<form>
				<Dropdown 
					id="voter_state" 
					label="Choose State" 
					onChange={this.handleChooseStateChange} 
					ref={this.selectStateRef}
				/>
				<Dropdown 
					id="voter_county"
					label="Choose State First"
					onChange={this.handleChooseCountyChange}
					ref={this.selectCountyRef}
				/>
			</form>
		)
	}
}

export default AddVoter