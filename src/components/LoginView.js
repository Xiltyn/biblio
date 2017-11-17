import React from 'react';
import {connect} from "react-redux";
import {getUser, login} from "../actions/UserActions";
import {Redirect} from "react-router";

class LoginView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this._handleSubmit = this._handleSubmit.bind(this);
	}

	componentWillMount() {
		this.props.getUser();
		this.props.user.email ? this.props.history.push('/search') : null;
	}

	componentWillReceiveProps(nextProps) {
		nextProps.user.email ? this.props.history.push('/search') : null;
	}

	_handleSubmit(event) {
		event.preventDefault();
		this.props.login(this.state.email, this.state.password);
		console.log(this.state)
	}

	render() {
		return (
			<div className="login-view">
				<form action='submit' onSubmit={this._handleSubmit}>
					<div className="form-element">
						<label htmlFor="user-login">Login</label><input type="text" name="user-login"
									  onChange={evt => this.setState({email: evt.target.value})}/>
					</div>
					<div className="form-element">
						<label htmlFor="user-password">Hasło</label><input type="password" name="user-password"
									  onChange={evt => this.setState({password: evt.target.value})}/>
					</div>
					<button action='submit' onClick={this._handleSubmit}>
						Login
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUser: () => {
			dispatch(getUser())
		},
		login: (email, password) => {
			dispatch(login(email, password))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
