import * as React from 'react';
import {connect} from 'react-redux';
import Checkbox from "./Checkbox";
import SearchElement from "./Search/SearchElement";
import Select from "./Universal/Select";
import animateScrollTo from 'animated-scroll-to';
import {dispatchActiveFilter, toggleCategory} from "../actions/FiltersActions";
import {addNewRecord, fetchLibraryData, removeRecord, updateRecord} from "../actions/LibraryActions";
import AddElement from "./Search/AddElement";
import SearchElementLoader from "./Search/SearchElementLoader";
import _ from 'lodash';

class SearchView extends React.Component {
	constructor() {
		super();

		this.state = {
			recordsRendered: 15,
			chunkShown: 1,
			searchString: '',
			scrollTopActive: false
		};

		this._showMore 					= this._showMore.bind(this);
		this._handleSearch 				= this._handleSearch.bind(this);
		this._handleCheckboxes 			= this._handleCheckboxes.bind(this);
		this._scrollTop 				= this._scrollTop.bind(this);
		this._handleUpdate 				= this._handleUpdate.bind(this);
		this._handleRemove 				= this._handleRemove.bind(this);
		this._handleAddNew 				= this._handleAddNew.bind(this);
		this._handleFilters 			= this._handleFilters.bind(this);
		this._handleScrollListener 		= this._handleScrollListener.bind(this);
		this._returnSearchedRecords 	= this._returnSearchedRecords.bind(this);
	}

	_showMore() {
		this.setState({
			chunkShown: this.state.chunkShown + 1
		});
	}
	_handleSearch(evt) {
		this.setState({
			searchString: evt.target.value
		});
	}
	_handleCheckboxes(evt, isFor) {
		this.props.dispatchActiveFilter(isFor, evt.target.checked)
	}
	_scrollTop() {
		const desiredOffset = 0;
		const scrollOptions = {
			speed: 700,
			minDuration: 250,
			maxDuration: 1500,
			element: window,
			cancelOnUserAction: true
		};

		animateScrollTo(desiredOffset, scrollOptions);
	}
	_handleUpdate(ID, object) {
		this.props.updateRecord(ID, object)
		this.forceUpdate();
	}
	_handleRemove(ID) {
		this.props.removeRecord(ID)
		this.forceUpdate();
	}
	_handleAddNew(object) {
		this.props.addNewRecord(object);
		this.forceUpdate();
	}
	_handleFilters(records) {
		const categories = this.props.data.filters.categories;
		let result = [];

		if ( categories.every(el => !el.active) ) {
			_.map(records, (record, key ) => {
				record.ID = key;
				result = [...result, record]
			});
		} else {
			records.map(record => {
				if (record.category) {
					for (let i = 0; i < categories.length; i++) {
						if (categories[i].active) {
							if (record.category.toLowerCase() === categories[i].label.toLowerCase()) {
								result = [...result, record];
							}
						}
					}
				}
				else if (record.firstname) {
					result = [...result, record];
				}
			});
		}

		result = result.sort(function(a, b){

			if(a.surname < b.surname) return -1;
			if(a.surname > b.surname) return 1;
			return 0;
		});

		return result;
	}
	_returnSearchedRecords(records) {
		let searchFilters = this.props.data.filters.keys;
		let result = [];

		searchFilters.map(key => {
			if ( key.isActive ) {
				records.map(record => {
					if ( record[key.name] ) {
						if (record[key.name].toLowerCase().includes(this.state.searchString.toLowerCase())) {
							result = [...result, record]
						}
					}
				})
			}
		});

		return result;
	}
	_handleScrollListener(evt) {
		let scrollTop = evt.path[1].scrollY;

		if (scrollTop > 1200) {
			this.setState({
				scrollTopActive: true
			})
		} else {
			this.setState({
				scrollTopActive: false
			})
		}
	}

	render() {
		const library = this._returnSearchedRecords(this._handleFilters(this.props.data.library)).map((element, index) => {

			if (this.state.searchString !== '') {
				return (
					<SearchElement callbackRemove={this._handleRemove} callbackEdit={this._handleUpdate} element={element} searchString={this.state.searchString} key={index}/>
				);
			} else if (this.state.searchString === '' && (index < (this.state.recordsRendered * this.state.chunkShown))) {
				return (
					<SearchElement callbackRemove={this._handleRemove} callbackEdit={this._handleUpdate} element={element} searchString={this.state.searchString} key={index}/>
				);
			}
		});

		const filters = this.props.data.filters.keys.map((element, index) => {
				if (!element.hidden) {
					return (
						<div className="criterion" key={index}>
							<h4>
								{element.label}
							</h4>
							{<Checkbox
								isFor={element.name}
								isChecked={this._handleCheckboxes}/>
							}
						</div>
						)
				}
			})

		return (

			<div className={"view-container" + (this.props.data.filters.showFilters ? ' view-container--active' : '')}>
					<div className={"sidebar" + (this.props.data.filters.showFilters ? ' sidebar--active' : '')}>
						<div className="criteria-menu">
							<Select options={this.props.data.filters.categories} toggleCategory={this.props.toggleCategory}/>
							<h3>Opcje Wyszukiwania</h3>
							{filters}
						</div>
						<div className="entry-counter">Ilość wpisów: <span className='value'>{Object.values(this.props.data.library).length + 1}</span></div>
					</div>
				<div className="search">
						<div className="search-input">
							<input type="text" name="search" placeholder='Napisz czego szukasz'
								   onKeyUp={this._handleSearch}/>
						</div>
				</div>
				<br/>
				<div className="search-result-container">
					<AddElement callback={this._handleAddNew} latestID={Object.values(this.props.data.library).length}/>
					{
						this.props.data.library.length === 0 ? <SearchElementLoader/> : library
					}
				</div>
				{
					this.state.searchString === '' ? <div className="show-more" onClick={this._showMore}>
						<button>Pokaż więcej</button>
					</div> : null
				}
				{
					this.state.scrollTopActive ? <div className="scroll-top">
						<button onClick={this._scrollTop}>
							Do Góry
						</button>
					</div>  : null
				}
			</div>
		);
	}

	componentWillMount() {
		window.addEventListener('scroll', this._handleScrollListener);
		this.props.fetchLibraryData();
		!this.props.data.user.email ? this.props.history.push('/') : null;
	}

	componentWillReceiveProps(nextProps) {
		!nextProps.data.user.email ? this.props.history.push('/') : null;
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this._handleScrollListener);
	}

}

const mapStateToProps = (state) => {
	return {
		data: state
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchLibraryData: () => {
			dispatch(fetchLibraryData())
		},
		dispatchActiveFilter: (name, value) => {
			dispatch(dispatchActiveFilter(name, value))
		},
		toggleCategory: (catID) => {
			dispatch(toggleCategory(catID));
		},
		updateRecord: (ID, updatedObject) => {
			dispatch(updateRecord(ID, updatedObject))
		},
		addNewRecord: (newObject) => {
			dispatch(addNewRecord(newObject))
		},
		removeRecord: (ID) => {
			dispatch(removeRecord(ID))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);