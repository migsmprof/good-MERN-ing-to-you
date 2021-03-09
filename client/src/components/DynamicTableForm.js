import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

import {Table, Button, CustomInput, Form, FormGroup, Input, Label} from 'reactstrap'

import Dropdown from './Dropdown'

class DynamicTableForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			ongoingUpdate: false,
		}

		this.handleDelete = (e) => {
			this.props.onDelete && this.props.onDelete(e)	
		}
		this.generateForm = this.generateForm.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}

	handleUpdate = (e, data) => {
		this.setState(() => {
			return {
				ongoingUpdate: !this.state.ongoingUpdate
			}
		}, () => {
			this.props.onUpdate && this.props.onUpdate(e)
		})
	}

	generateForm = (keyComponent, keyword, attrb, fn, fx, options) => {
		let generatedComponent
		switch(keyword) {
			case 'input':
					generatedComponent = 
					<Input
						key = {keyComponent}
						type = {attrb.type}
						id = {attrb.id}
						name = {attrb.name}
						placeholder = {attrb.legend}
						defaultValue = {attrb.value}
						min = {attrb.type !== 'number' ? '' : attrb.min}
						max = {attrb.type !== 'number' ? '' : attrb.max}
						step = {attrb.type !== 'number' ? '':  attrb.step}
					/>
			break
			case 'select':
				generatedComponent =
					<Dropdown
						key = {keyComponent}
						id = {attrb.id}
						label = {attrb.legend}
						value = {attrb.value}
						ref = {attrb.refe}
						fillOptions = {fn}
						fillEffect = {fx}
					/>
			break
			case 'checkbox':
			case 'radio':
				generatedComponent =
				<FormGroup key = {keyComponent} tag = 'fieldset' row>
					<legend className='col-form-label'>{attrb.legend}</legend>
					{
						options.map(option => (
							<FormGroup check>
								<Input 
									type = {keyword} 
									name = {option.name} 
									id = {`${option.name}-${option.id}`} 
									for = {`${option.name}-${option.id}`} />
								<Label 
									check 
									for = {`${option.name}-${option.id}`}
								>{option.choicename}</Label>
							</FormGroup>
						))
					}
				</FormGroup>
			break
			default:
		}
		return generatedComponent
	}

	handleEdit() {
		this.setState(() => {
			return {
				ongoingUpdate: !this.state.ongoingUpdate
			}
		})
	}

	render() {
		return (
			<Form row='true' className='mt-3'>
				<Table>
					<thead>
						{/* Table Head */}
						<tr>
							<th>
								<CustomInput type='checkbox' id='deleteallbtn' />
							</th>
							{
								this.props.columns.map(column => {
									return (
										<td key = {`${column.name}_header`}>{column.name}</td>
									)
								})
							}
							<td key = 'update_header'></td>
							<td key = 'delete_header'></td>
						</tr>
					</thead>
					<tbody>
						{/* Table Body */}
						{ 
							(this.props.rows.length > 0) ?
							this.props.rows.map((row, i) => (
								<tr key = {`row_${i}`}>
									<th scope = "row">
										<CustomInput 
											className='row_checkbox'
											type = 'checkbox' 
											id = {i}
										/>
									</th>
									<td key = {`row_${i}_pk`}>
										{row.pk}
									</td>
									{
										row.fields.map((field, j) => (
											<td key = {`row_${i}_field_${j}`}>
												{
													(this.state.ongoingUpdate) ?
														(
															<FormGroup 
																id={`row_${i}_field_${j}`} 
																
															>
																{
																	field.forms.map(form =>
																		this.generateForm(
																			form.keyComponent,
																			form.keyword, 
																			form.componentAttr,
																			form.componentFn, 
																			form.componentFx,
																			form.componentOpt
																		)
																	)
																}
															</FormGroup>
														) :
														field.value
												}
											</td>
										))
									}
									<td key = {`row_${i}_update`}>
										<Button 
											color = 'info' 
											block
											id = {`update_${row.pk}`}
											name = {`update_${row.pk}`}
											onClick = {
												this.state.ongoingUpdate ? 
												this.handleUpdate : 
													this.handleEdit
											}
										>
											{
												this.state.ongoingUpdate ? 'Update' : 'Edit'
											}
										</Button>
									</td>
									<td key = {`row_${i}_delete`}>
										<Button 
											colo = 'danger' 
											block 
											id = {`delete_${row.pk}`}
											name = {`delete_${row.pk}`}
											onClick = {this.handleDelete}
										>Delete</Button>
									</td>
								</tr>
							)) :
							(
								<tr>
									<th>No Records Found.</th>
								</tr>
							)
						}
					</tbody>
				</Table>	
			</Form>
		)
	}
}

export default DynamicTableForm