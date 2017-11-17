import React, {Component, PropTypes} from 'react';
import SelectOption from "./SelectOption";

export default class Select extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="select">
				<h4>
					Kategorie
				</h4>
				<ul className="options">
					{
						this.props.options.map((option, index) =>
							<SelectOption data={option} callback={this.props.toggleCategory} key={index}/>
						)
					}
				</ul>
			</div>
		);
	}
}
Select.propTypes = {
	options: PropTypes.array.isRequired,
	toggleCategory: PropTypes.func.isRequired
};