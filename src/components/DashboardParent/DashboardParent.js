import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import * as actions from '../../actions';
import { searchSitters } from '../../actions/sitters';
import BioParentForm from '../BioParent/BioParentForm';

import './DashboardParent.css';

export class DashboardParent extends Component {
	componentDidMount() {
		this.props.dispatch(actions.toggleView('parent'));
		this.props.dispatch(actions.fetchEnrolledParentBio(this.props.userId));
		this.props.dispatch(searchSitters(this.props.location));
	}

	render() {
		if (this.props.createdBios.length === 0) {
			return (
				<div className="parentalBioForm">
					<BioParentForm />
				</div>
			);
		}
		let localSitterList;
		localSitterList = this.props.localSitters.map((item, index) => (
			<div key={index}>
				<ul className="parentDashSitters">
					<li className="sitterFirstName">
						<b>Name:</b> {item.sitterUserID.firstName}
					</li>
					<li className="sitterLocation">
						<b>Location:</b> {item.location}
					</li>
					<Moment className="dateAvailable" format="MM/DD/YYYY">
						<li className="dateAvailable">
							<b>Date Available:</b> {item.dateAvailable}
						</li>
					</Moment>
					<li className="sitterRate">
						<b>Rate:</b> {item.rate}{' '}
					</li>
					<li className="sitterHeader"> {item.sitterHeader}</li>
					<li className="individualSitter">
						<b>Bio:</b> {item.bio}
					</li>
					<li className="yearsExperience">
						<b>Years Experience:</b> {item.yearsExperience}
					</li>
				</ul>
				<a className="contactSitterButton" href="#">
					Contact Sitter /in dev/
				</a>
			</div>
		));
		return (
			<ul className="parentDashSitters">
				<li className="parentDashSittersLi">{localSitterList}</li>
			</ul>
		);
	}
}

const mapStateToProps = state => ({
	userId: state.auth.currentUser.id,
	createdBios: state.parents.parentalInfo,
	location: state.auth.currentUser.zipcode,
	localSitters: state.sitters.zipcodeSearches,
});

export default connect(mapStateToProps)(DashboardParent);
