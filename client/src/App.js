//Styling
// import 'bootstrap/dist/css/bootstrap.min.css'

//React
import { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Navbar, Nav, NavLink, NavbarBrand } from 'reactstrap'

//Views
import AddVoter from './views/AddVoter'
import ViewVoters from './views/ViewVoters'
import AddState from './views/AddState'

class App extends Component {
	render() {
		return (
			<div>
				<Navbar color="dark" dark expand="lg">
					<NavbarBrand href='/'>US Elections 2025</NavbarBrand>
					<Nav className="mr-auto" navbar>
						<NavLink href='/voters/add'>Register</NavLink>
						<NavLink href='/voters/view'>View Voters</NavLink>
						<NavLink href='/states/add'>Add States</NavLink>
					</Nav>
				</Navbar>
			
				<div className='mt-3'>
					<Switch>
						<Route exact path={['/', '/voters/add']} component={AddVoter} />
						<Route exact path={'/voters/view'} component={ViewVoters} />
						<Route exact path={'/states/add'} component={AddState} />
					</Switch>
				</div>
			</div>
		)
	}
}

export default App