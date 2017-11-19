import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {toggleFilters} from "../actions/FiltersActions";
import {logout} from "../actions/UserActions";

class TopNav extends Component {
	constructor(props) {
		super(props);

		this._handleCLick = this._handleCLick.bind(this);
		this._handleLogout = this._handleLogout.bind(this);
	}

	_handleCLick() {
		this.props.toggleFilters()
	}

	_handleLogout() {
		this.props.logout();
	}

	render() {
		return (
			<ul className="main-app-nav">
				<li className={this.props.showFilters ? "filters-btn--active" : ''} onClick={this._handleCLick}><div href="#">Filtry</div></li>
				<li className="app-title"><h3>Biblioteka profesora Krzysztofa Płeszki</h3></li>
				<li onClick={this._handleLogout}><div href="#">Wyloguj</div></li>
			</ul>
		)
	}
}
TopNav.propTypes = {
};

const mapStateToProps = (state) => {
	return {
		showFilters: state.filters.showFilters
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleFilters: () => {
			dispatch(toggleFilters());
		},
		logout: () => {
			dispatch(logout())
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);