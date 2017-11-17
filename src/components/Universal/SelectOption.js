import React, {Component, PropTypes} from 'react';

export default class SelectOption extends Component {
	constructor(props) {
		super(props);

		this._handleClick = this._handleClick.bind(this);

		this.state = {
			isClicked: true
		}
	}

	_handleClick() {
		this.props.callback(this.props.data.id);
		this.forceUpdate()
	};

	render() {
		return (
			<li className="options-tile" onClick={this._handleClick}>
				<div className={'character ' + (this.props.data.active ? 'active' : '')}>
					{this.props.data.label}
				</div>
			</li>
		)
	}
}
SelectOption.propTypes = {
	data: PropTypes.object.isRequired,
	callback: PropTypes.func
};
