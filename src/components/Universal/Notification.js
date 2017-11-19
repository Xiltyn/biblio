import * as React from 'react';

export default class Notification extends React.Component {
	constructor(props) {
		super(props);

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleHide = this._handleHide.bind(this)
	}
	_handleSubmit() {
		this.props.onConfirm();
		this._handleHide();
		console.log(this.props.id)
	}

	_handleHide() {
		this.props.onClose();
	}

	render() {
		return(
			<div className={"notification " + (this.props.setActive ? 'notification--active ' : '') + this.props.typeClass}>
				<p>
					{this.props.message}
				</p>
				<div className='controls'>
					<button className={this.props.altColours ? "submit-btn" : "update-btn"} type="submit" onClick={this._handleSubmit}>
						{this.props.submitLabel}
					</button>
					<button className={this.props.altColours ? "update-btn" : "submit-btn" } onClick={this._handleHide}>
						{this.props.cancelLabel}
					</button>
				</div>
			</div>
		);
	};
};

Notification.propTypes = {
	setActive: React.PropTypes.bool.isRequired,
	typeClass: React.PropTypes.string.isRequired,
	message: React.PropTypes.string.isRequired,
	onConfirm: React.PropTypes.func.isRequired,
	onClose: React.PropTypes.func.isRequired,
	submitLabel: React.PropTypes.string.isRequired,
	cancelLabel: React.PropTypes.string.isRequired
};