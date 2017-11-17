import React, {Component, PropTypes} from 'react';

export default class Checkbox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: true
		}

		this._handleCheckbox = this._handleCheckbox.bind(this);
	}

	_handleCheckbox(evt) {
		this.props.isChecked ? this.props.isChecked(evt, this.props.isFor) : console.log(':: Checkbox handle not set ::')

		this.setState({
			checked: !this.state.checked
		})
	}

	render() {
		return (
			<div className='checkbox'>
				<label className='checkbox__container'>
					<input className='checkbox__toggle' name={this.props.isFor} type='checkbox' onChange={this._handleCheckbox} checked={this.state.checked}/>
					<span className='checkbox__checker'/>
					<span className='checkbox__cross'/>
					<span className='checkbox__ok'/>
					<svg className='checkbox__bg' space='preserve' style={{enableBackground: 'new 0 0 110 43.76'}} version='1.1' viewBox='0 0 110 43.76'>
						<path className='shape' d='M88.256,43.76c12.188,0,21.88-9.796,21.88-21.88S100.247,0,88.256,0c-15.745,0-20.67,12.281-33.257,12.281,S38.16,0,21.731,0C9.622,0-0.149,9.796-0.149,21.88s9.672,21.88,21.88,21.88c17.519,0,20.67-13.384,33.263-13.384,S72.784,43.76,88.256,43.76z'/>
					</svg>
				</label>
			</div>
		)
	}
}
Checkbox.propTypes = {
	isFor: PropTypes.string,
	isChecked: PropTypes.func
};