import 'bootstrap/dist/css/bootstrap.min.css'

import {Component} from 'react'

import {Button} from 'reactstrap'

class ControllableButton extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: true,
		}
		this.setVisibility = this.setVisibility.bind(this)
	}
	
	setVisibility(bool) {
		this.setState(() => {
			return {
				visible: bool
			}
		})
	}

	render() {
		return (
			<Button 
				color={this.props.color} 
				block 
				onClick={this.props.onClick} 
				id={this.props.id}
				hidden={this.state.visible ? false : true}
			>
				{this.props.children}
			</Button>
		)
	}
}

export default ControllableButton