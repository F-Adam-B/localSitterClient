import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import * as actions from '../../actions';
import BioSitterForm from '../BioSitter/BioSitterForm';
import { searchParents } from '../../actions/parents';
import { fetchEnrolledSitterBio } from '../../actions/sitters';

import './DashboardSitter.css';

export class DashboardSitter extends Component {
	componentDidMount() {
		this.props.dispatch(actions.toggleView('sitter'));
		this.props.dispatch(fetchEnrolledSitterBio(this.props.userId));
		this.props.dispatch(searchParents(this.props.location));
	}

	render() {
		if (this.props.createdBios.length === 0) {
			return (
				<div className="parentalBioForm">
					<BioSitterForm />
				</div>
			);
		}
		let localParentList;
		localParentList = this.props.localParents.map((item, index) => (
			<div key={index}>
				<ul>
					<li className="parentFirstName">
						<b>Name:</b> {item.parentUserID.firstName}
					</li>
					<li className="parentLocation">
						<b>Location:</b> {item.location}
					</li>
					<li className="ageOfChild">
						<b>Child Age:</b> {item.ageOfChild}
					</li>
					<Moment className="dateNeeded" format="MM/DD/YYYY">
						<li>
							{' '}
							<b>Date Needed:</b> {item.dateNeeded}
						</li>
					</Moment>
					<li className="startTime">
						<b>Start Time:</b> {item.startTime}
					</li>
					<li className="endTime">
						<b>End Time:</b> {item.endTime}
					</li>
					<li className="additionalInfo">
						<b>Additional Info:</b> {item.additionalInfo}
					</li>
				</ul>
				<a className="contactParentButton" href="#">
					Contact Parent
				</a>
			</div>
		));
		return (
			<ul className="sitterDashParents">
				<li className="sitterDashParentLi">{localParentList}</li>
			</ul>
		);
	}
}

const mapStateToProps = state => ({
	userId: state.auth.currentUser.id,
	createdBios: state.sitters.sitterBio,
	location: state.auth.currentUser.zipcode,
	localParents: state.parents.zipcodeSearches,
});

export default connect(mapStateToProps)(DashboardSitter);
