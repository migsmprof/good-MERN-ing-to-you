//Styling
import 'bootstrap/dist/css/bootstrap.min.css'

//React
import { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap'

//Views
import AddVoter from './views/AddVoter'
import ViewVoters from './views/ViewVoters'

class App extends Component {
	render() {
		return (
			<div>
				<Nav>
					<NavItem>
						<NavLink href='/voters/add'>Register Voter</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href='/voters/view'>View Voters</NavLink>
					</NavItem>
				</Nav>
			
				<div className='container mt-2'>
					<Switch>
						<Route exact path={['/', '/voters/add']} component={AddVoter} />
						<Route exact path={'/voters/view'} component={ViewVoters} />
					</Switch>
				</div>
			</div>
		)
	}
}

export default App