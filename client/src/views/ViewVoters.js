//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

//React
import {Component} from 'react'
import ReactDOM from 'react-dom'

//Reactstrap
import {Container, Row, Col, Table, Button, CustomInput} from 'reactstrap'

//Data Services
import VoterDataService from '../services/voters.service'

class ViewVoters extends Component {
	constructor(props) {
		super(props)
		this.state = {
			voters: [],
		}
	}

	componentDidMount() {
		VoterDataService
			.getAll()
			.then(res => {
				this.setState(() => {
					return {
						voters: res.data
					}
				})
			})
			.then(() => {
				let rows = this.state.voters.map((voter, i) => (
					<tr key={i}>
						<th scope="row">
							<CustomInput type='checkbox' id={i}/>
						</th>
						<td>{voter.id}</td>
						<td>{voter.first_name} {voter.middle_name} {voter.last_name}</td>
						<td>{voter.county.county_name} County, {voter.state.state_name}</td>
						<td>
							<Button color='info' block>Update</Button>
						</td>
						<td>
							<Button color='danger' block>Delete</Button>
						</td>
					</tr>
				))
				ReactDOM.render(rows, document.getElementById('table'))
			})
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
				<Table>
					<thead>
						<tr>
							<th>
								<CustomInput type='checkbox' id='deleteallbtn' />
							</th>
							<td>ID</td>
							<td>FULL NAME</td>
							<td>VOTING PRECINCT</td>
							<td></td>
							<td></td>
						</tr>
					</thead>
					<tbody id='table'></tbody>
				</Table>
			</Container>
		)
	}
}

export default ViewVoters