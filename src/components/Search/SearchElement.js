import React, {Component, PropTypes} from 'react';
import Notification from "../Universal/Notification";
import CategorySelector from "./CategorySelector";

export default class SearchElement extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isActive: false,
			data: {},
			notifyRemove: false,
			notifyUpdate: false
		};

		this._handleInputs = this._handleInputs.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleRemove = this._handleRemove.bind(this);
		this._hideDetails = this._hideDetails.bind(this);
		this._showDetails = this._showDetails.bind(this);
		this._notify = this._notify.bind(this);
		this._handleNotificationClose = this._handleNotificationClose.bind(this);
		this._handleCategorySelector = this._handleCategorySelector.bind(this);
	}

	_notify(type) {
		if (type === 'remove') {
			this.setState({
				notifyRemove: true
			})
		}
		else if (type === 'update') {
			this.setState({
				notifyUpdate: true
			})
		}
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
		this.props.callbackEdit ? this.props.callbackEdit(this.props.element.ID, this.state.data) : null;
		this._hideDetails();
	};

	_handleRemove() {
		this.props.callbackRemove ? this.props.callbackRemove(this.props.element.ID) : null;
		this._hideDetails();
	}

	_showDetails(evt) {
		evt.preventDefault()
		!this.state.isActive ? this.setState({isActive: true}) : null

	};

	_hideDetails(evt) {
		this.setState({isActive: false})
	};

	_handleNotificationClose() {
		this.setState({
			notifyRemove: false,
			notifyUpdate: false
		})
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
			<div className={"search-result " + (this.state.isActive ? 'isActive' : '')} onClick={this._showDetails}>

				<Notification setActive={this.state.notifyRemove} typeClass="remove"
							  message="Czy na pewno chcesz usunąć ten element?"
							  submitLabel='Tak, usuń' cancelLabel='Nie usuwaj'
							  onClose={this._handleNotificationClose}
							  altColours={true}
							  onConfirm={this._handleRemove} id={this.state.data.ID}/>
				<Notification setActive={this.state.notifyUpdate} typeClass="update"
							  submitLabel='Tak' cancelLabel='Nie'
							  message="Czy na pewno chcesz zatwierdzić zmiany?" onClose={this._handleNotificationClose}
							  onConfirm={this._handleSubmit} id={this.state.data.ID}/>
				<div className="search-result-image">
					<img src="/assets/img/placeholder.png" alt="placeholder"/>
				</div>
				<div className="info">
					<div className="search-result-author">
						<input type="text" onChange={this._handleInputs} name="surname"
							   value={this.state.data.surname}/>
						<input type="text" onChange={this._handleInputs} name="firstname"
							   value={this.state.data.firstname}/>
					</div>
					<div className="search-result-title">
						<textarea onChange={this._handleInputs} name="title" value={this.state.data.title}/>
					</div>
					<div className="details">
						<div className="search-result-year">
							<h2>Rok:</h2><input type="text" onChange={this._handleInputs} name="year"
												value={this.state.data.year}/>
						</div>
						<div className="search-result-place">
							<h2>Miejsce:</h2><input type="text" onChange={this._handleInputs} name="place"
													value={this.state.data.place}/>
						</div>
					</div>
				</div>
				<CategorySelector dispatchChosenCategoryID={this._handleCategorySelector} label={this.state.data.category}/>

				{
					this.state.isActive ? <div className="more-info">
						<div className="search-result-more search-result-series"><h2>Seria:</h2><input type="text"
																									   onChange={this._handleInputs}
																									   name="series"
																									   value={this.state.data.series}/>
						</div>
						<div className="search-result-more search-result-publisher"><h2>Wydawca:</h2><textarea
							onChange={this._handleInputs} name="publisher" value={this.state.data.publisher}/>
						</div>
						<div className="search-result-more search-result-print"><h2>Drukarnia:</h2><input type="text"
																										  onChange={this._handleInputs}
																										  name="printingHouse"
																										  value={this.state.data.printingHouse}/>
						</div>
						<div className="search-result-more search-result-format"><h2>Format:</h2> <input type="text"
																										 onChange={this._handleInputs}
																										 name="format"
																										 value={this.state.data.format}/>
						</div>
						<div className="search-result-more search-result-pages"><h2>Ilość stron:</h2> <input type="text"
																											 onChange={this._handleInputs}
																											 name="pages"
																											 value={this.state.data.pages}/>
						</div>
						<div className="search-result-more search-result-appendices"><h2>Ilustracje, załączniki:</h2> <textarea
							type="text" onChange={this._handleInputs} name="appendices"
							value={this.state.data.appendices}/></div>
						<div className="search-result-more search-result-publishing-details"><h2>Opis oprawy:</h2>
							<textarea type="text" onChange={this._handleInputs} name="publishingDetails"
									  value={this.state.data.publishingDetails}/></div>
						<div className="search-result-more search-result-autographs"><h2>Dedykacje, proweniencje:</h2><textarea
							type="text" onChange={this._handleInputs} name="autographs"
							value={this.state.data.autographs}/></div>
						<div className="search-result-more search-result-description"><h2>Informacje:</h2><textarea
							type="text" onChange={this._handleInputs} name="description"
							defaultValue={this.state.data.description}/></div>
						<div className="submit">
							<button className="update-btn" onClick={() => {this._notify('update')}}>
								Zastosuj
							</button>
							<button className="close-btn" onClick={this._hideDetails}>
								Zamknij
							</button>
							<button className="remove-btn" onClick={() => {this._notify('remove')}}>
								Usuń
							</button>
						</div>
					</div> : null
				}
			</div>
		)
	}

	componentWillMount() {
		this.setState({
			data: this.props.element
		})
	}

	componentWillReceiveProps(newProps) {
		if (this.state.data.ID !== newProps.element.ID) {
			this.setState({
				data: this.props.element
			})
		}
	}
}
SearchElement.propTypes = {
	element: PropTypes.object.isRequired
};