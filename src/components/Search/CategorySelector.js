import * as React from 'react';
import { connect } from 'react-redux';

class CategorySelector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showOptions: true,
			chosenCategoryID: '',
			chosenCategoryLabel: ''
		}

		this._showOptions 			= this._showOptions.bind(this);
		this._handleCategoryChange 	= this._handleCategoryChange.bind(this);
	}

	_handleCategoryChange(ID, label) {
		this.setState({
			chosenCategoryID: ID,
			chosenCategoryLabel: label,
			showOptions: false
		});

		this.props.dispatchChosenCategoryID(label);
	}

	_showOptions() {
		this.setState({
			showOptions: true
		})
	}

	render() {
		const valueInput = () => <input className="category-value" type="text" value={this.state.chosenCategoryLabel}
										placeholder="G" disabled onClick={this._showOptions}/>;
		const optionsSelector = (options) =>
			<ul className="category-selector">
				{
					options.map((option, index) =>
						<li className={"category-selector-option " + (option.id === this.state.chosenCategoryID ? 'category-selector-option--active' : '')} onClick={() => this._handleCategoryChange(option.id, option.label)} key={index}>
							<span>
								{option.label}
							</span>
						</li>
					)
				}
			</ul>;

		return (
			<div className={"category " + (this.state.showOptions ? "category--showOptions" : '')}>
				{ valueInput() }
				{ optionsSelector(this.props.categories) }
			</div>
		);
	};
	componentWillMount() {
		this.props.label ? this.setState({
			showOptions: false,
			chosenCategoryLabel: this.props.label
		}) : null;
	}
};

CategorySelector.propTypes = {
	dispatchChosenCategoryID: React.PropTypes.func.isRequired,
	label: React.PropTypes.string
};

const mapStateToProps = (state) => {
	return {
		categories: state.filters.categories
	}
};

export default connect(mapStateToProps)(CategorySelector);