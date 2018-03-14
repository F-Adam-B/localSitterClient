import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './SearchResults.css';

export class SearchResults extends Component {
	render() {
		if (this.props.loading) {
			return <div>Loading....</div>;
		}

		let sitterList, resultHeader;

		sitterList = this.props.result.map((item, index) => {
			return (
				<div key={index} className="mediaBody">
					<div className="landingSitterResults">
						<div className="sitterFirstName">
							<b>Name:</b> {item.sitterUserID.firstName}
						</div>
						<div className="sitterLocation">
							<b>Location:</b> {item.location}
						</div>
						{/* <Moment className="availability" format='MM/DD/YYYY'><li className="dateAvailable">Date Available: {item.dateAvailable}</li></Moment > */}
						<div className="sitterRate">
							<b>Rate:</b> {item.rate}{' '}
						</div>
						<div className="yearsExperience">
							<b>Years Experience:</b> {item.yearsExperience}
						</div>
						<div className="stars">
							<span class="fa fa-star checked" />
							<span class="fa fa-star checked" />
							<span class="fa fa-star checked" />
							<span class="fa fa-star checked" />
							<span class="fa fa-star" />
						</div>
						<div className="sitterHeader">
							<b>{item.sitterHeader}</b>
						</div>
						<div className="individualSitter">{item.bio}</div>
					</div>
					<p className="contactSitterLink">
						<Link className="sign-up-link" to={'/signup'}>
							<span className="sign-up-to-contact">Sign Up to Contact Sitter</span>
						</Link>
					</p>
				</div>
			);
		});

		if (this.props.result.length === 0 && this.props.initialSearch) {
			resultHeader = <p className="noResultsFound">No sitters found in your area</p>;
		} else if (this.props.result.length > 0) {
			resultHeader = <h3 className="sitterNearYouHeader">~ Sitters Available Near You ~</h3>;
		}

		return (
			<ul className="sitterResultHeader">
				{resultHeader}
				<li className="sitterResultList">{sitterList}</li>
			</ul>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.sitters.loading,
	result: state.sitters.zipcodeSearches,
	initialSearch: state.sitters.initialSearch,
});
export default connect(mapStateToProps)(SearchResults);
