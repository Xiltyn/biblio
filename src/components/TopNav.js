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
		console.log("Location :: ", this.props.location.pathname);
		return (

			<ul className="main-app-nav">
				{
					this.props.location.pathname !== "/" ? <li className={this.props.showFilters ? "filters-btn--active" : ''} onClick={this._handleCLick}><div href="#">Filtry</div></li> : null
				}
				<li className="app-title" style={ { width: this.props.location.pathname === "/" ? '100%' : 'calc(100% - ( 2 * 280px ))' } }><h3>Biblioteka profesora Krzysztofa Płeszki</h3></li>
				{
					this.props.location.pathname !== "/" ? <li onClick={this._handleLogout}><div href="#">Wyloguj</div></li> : null
				}
			</ul>
		)
	}
}
TopNav.propTypes = {
};

const mapStateToProps = (state) => {
	return {
		showFilters: state.filters.showFilters,
		location: state.routing.location
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