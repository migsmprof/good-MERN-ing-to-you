import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

class Dropdown extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: null,
		}

		this.handleSelect = this.handleSelect.bind(this)
	}

	handleSelect(e) {
		this.setState(state => {
			state.value = e.target.value
		});
	}

	render() {
		return (
			<div>
				<label htmlFor={ this.props.name }>{ this.props.label }</label>
				<select className="form-select" id={ this.props.name } name={ this.props.name }>
					{
						Object.values(this.props.optionItems).forEach((item) => (
							<option key = { Object.values(item)[0] } value = { Object.values(item)[0] }>{ Object.values(item)[1] }</option>
						))
					}
				</select>
			</div>
		)
	}
}

export default Dropdown