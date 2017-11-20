import React from 'react';
import {connect} from "react-redux";
import {getUser, login} from "../actions/UserActions";
import {Redirect} from "react-router";
import SearchElementLoader from "./Search/SearchElementLoader";

class LoginView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			activeNotificationClassName: ''

		};

		this._handleSubmit = this._handleSubmit.bind(this);
	}

	componentWillMount() {
		this.props.getUser();
		if(this.props.user.email) {
			this.props.history.push('/search')
		};
	}

	componentWillReceiveProps(nextProps) {
		nextProps.user.email ? this.props.history.push('/search') : null;
	}

	_handleSubmit(event) {
		event.preventDefault();
		this.props.login(this.state.email, this.state.password);
		setTimeout(() => {
			if (this.props.user.loadingStatus === 'auth/invalid-email') {
				this.setState({
					activeNotificationClassName: 'invalid-email'
				});
				setTimeout(() => {
					this.setState({
						activeNotificationClassName: ''
					})
				}, 4000)
			} else if (this.props.user.loadingStatus === 'auth/wrong-password') {
				this.setState({
					activeNotificationClassName: 'invalid-password'
				});
				setTimeout(() => {
					this.setState({
						activeNotificationClassName: ''
					})
				}, 4000)
			} else if (this.props.user.email) {
				this.setState({
					activeNotificationClassName: ''
				})
			}
		}, 500)
	}

	render() {
		console.log(this.props.user);


		const notificationMessage	= () => this.props.user.loadingStatus === 'auth/invalid-email' ? 'Błędny email, upewnij się, że podałeś prawidłowe dane'  : this.props.user.loadingStatus === 'auth/wrong-password' ? 'Nieprawidłowe hasło, upewnij się, czy klawisz CapsLock nie jest włączony' : '';


		return (
			<div className="login-view">

				<form action='submit' onSubmit={this._handleSubmit}>
					{
						this.state.activeNotificationClassName !== '' ? <div className={'login-view-notification ' + this.state.activeNotificationClassName}>
							{notificationMessage()}
						</div> : null
					}

					<div className="form-element">
						<label htmlFor="user-login">Login</label><input className={'' + this.props.user.loadingStatus === 'auth/invalid-email' ? 'error' : ''} type="text" name="user-login"
									  onChange={evt => this.setState({email: evt.target.value})}/>
					</div>
					<div className="form-element">
						<label htmlFor="user-password">Hasło</label><input className={'' + this.props.user.loadingStatus === 'auth/wrong-password' ? 'error' : ''} type="password" name="user-password"
									  onChange={evt => this.setState({password: evt.target.value})}/>
					</div>
					<button action='submit' onClick={this._handleSubmit}>
						{
							this.props.user.loadingStatus === 'loading' ? <SearchElementLoader/> : 'Login'
						}
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
