import React, {Component, PropTypes} from 'react';
import Record from "../../models/Record";
import Notification from "../Universal/Notification";
import CategorySelector from "./CategorySelector";

export default class AddElement extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isActive: false,
			notifyAddNew: false,
			data: {}
		};

		this._handleCategorySelector 	= this._handleCategorySelector.bind(this);
		this._handleInputs 				= this._handleInputs.bind(this);
		this._handleSubmit 				= this._handleSubmit.bind(this);
		this._hideDetails 				= this._hideDetails.bind(this);
		this._showDetails 				= this._showDetails.bind(this);
		this._notify 					= this._notify.bind(this);
	}

	_handleInputs(evt) {
		this.setState({
			data: {
				...this.state.data,
				[evt.target.name]: evt.target.value
			}
		})
	}

	_handleSubmit() {
		const newObjectFromModel = new Record(this.state.data, this.props.latestID);
		this.props.callback ? this.props.callback(newObjectFromModel) : null;

		this.setState({
			isActive: false,
			notifyAddNew: false
		})
	};

	_showDetails(evt) {
		evt.preventDefault()
		!this.state.isActive ? this.setState({ isActive: true }) : null
	};

	_hideDetails(evt) {
		this.setState({
			isActive: false,
			notifyAddNew: false
		})
	};

	_notify( type ) {
		if ( type === 'add-new' ) {
			this.setState({
				notifyAddNew: true
			})
		}
	}

	_handleCategorySelector(label) {
		this.setState({
			data: {
				...this.state.data,
				category: label
			}
		})
	}

	render() {
		return (
			<div className={"search-result addNew" + (this.state.isActive ? " isActive" : "")} onClick={this._showDetails}>
				<Notification setActive={this.state.notifyAddNew} typeClass="add-new" message="Czy na pewno chcesz dodać element?" onConfirm={this._handleSubmit} onClose={this._hideDetails}/>
				{
					!this.state.isActive ?
						<div className="add-element">
							<div className="add-element-icon"/>
						</div> :
						<form action='submit' onSubmit={this._handleSubmit}>
							<div className="info">
								<div className="search-result-author">
									<input type="text" onChange={this._handleInputs} name="surname" placeholder="Nazwisko autora"/>
									<input type="text" onChange={this._handleInputs} name="firstname" placeholder="Imię autora"/>
								</div>
								<div className="search-result-title">
									<textarea onChange={this._handleInputs} name="title" placeholder="Tytuł pozycji"/>
								</div>
								<div className="details">
									<div className="search-result-year">
										<h2>Rok:</h2><input type="text" onChange={this._handleInputs} name="year" placeholder="Rok wyd."/>
									</div>
									<div className="search-result-place">
										<h2>Miejsce:</h2><input type="text" onChange={this._handleInputs} name="place" placeholder="Miejsce wyd."/>
									</div>
								</div>
							</div>
							<CategorySelector dispatchChosenCategoryID={this._handleCategorySelector}/>
							<div className="more-info">
								<div className="search-result-more search-result-series"><h2>Seria:</h2><input type="text" onChange={this._handleInputs} name="series"/></div>
								<div className="search-result-more search-result-publisher"><h2>Wydawca:</h2><input type="text" onChange={this._handleInputs} name="publisher"/></div>
								<div className="search-result-more search-result-print"> <h2>Drukarnia:</h2><input type="text" onChange={this._handleInputs} name="printingHouse"/></div>
								<div className="search-result-more search-result-format"><h2>Format:</h2> <input type="text" onChange={this._handleInputs} name="format"/></div>
								<div className="search-result-more search-result-pages"><h2>Ilość stron:</h2> <input type="text" onChange={this._handleInputs} name="pages"/></div>
								<div className="search-result-more search-result-appendices"><h2>Ilustracje:</h2> <input type="text" onChange={this._handleInputs} name="appendices"/></div>
								<div className="search-result-more search-result-publishing-details"><h2>Opis oprawy:</h2><input type="text" onChange={this._handleInputs} name="publishingDetails"/> </div>
								<div className="search-result-more search-result-autographs"><h2>Dedykacje:</h2><input type="text" onChange={this._handleInputs} name="autographs"/> </div>
								<div className="search-result-more search-result-description"><h2>Informacje:</h2><input type="text" onChange={this._handleInputs} name="description"/> </div>
								<div className="submit">
									<button className="update-btn" type="submit" onClick={() => {this._notify('add-new')}}>
										Zastosuj
									</button>
									<button className="close-btn" onClick={this._hideDetails}>
										Zamknij
									</button>
								</div>
							</div>
						</form>
				}


			</div>
		)
	}
}
AddElement.propTypes = {
	callback: PropTypes.func.isRequired
};