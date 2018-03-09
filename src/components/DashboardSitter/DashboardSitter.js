import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import * as actions from '../../actions';
import ContactForm from '../ContactForm';
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

	recipientEmail = email => {
		this.props.dispatch(actions.storeRecipientEmail(email));
		this.props.dispatch(actions.toggleContactForm(true));
	};

	render() {
		if (this.props.createdBios.length === 0) {
			return (
				<div className="parentalBioForm">
					<BioSitterForm />
				</div>
			);
		}

		if (this.props.openContactForm === true) {
			return (
				<div className="contactForm">
					<ContactForm />
				</div>
			);
		}

		let localParentList;
		localParentList = this.props.localParents.map((item, index) => (
			<div className="sitterDashParentResultFields" key={index}>
				<ul className="sitterDashParentsResultsUl">
					<li className="parentFirstName sitterDashParentResult">
						<b>Name:</b> {item.parentUserID.firstName}
					</li>
					<li className="parentLocation sitterDashParentResult">
						<b>Location:</b> {item.location}
					</li>
					<li className="ageOfChild sitterDashParentResult">
						<b>Child Age:</b> {item.ageOfChild}
					</li>
					<Moment className="dateNeeded sitterDashParentResult" format="MM/DD/YYYY">
						<li>
							<b>Date Needed:</b> {item.dateNeeded}
						</li>
					</Moment>
					<li className="startTime sitterDashParentResult">
						<b>Start Time:</b> {item.startTime}
					</li>
					<li className="endTime sitterDashParentResult">
						<b>End Time:</b> {item.endTime}
					</li>
					<li className="additionalInfo sitterDashParentResult">
						<b>Additional Info:</b>
						<br /> {item.additionalInfo}
					</li>
				</ul>
				<div className="contactParentButtonWrapper">
					<button
						className="contactParentButton"
						type="submit"
						onClick={() => {
							this.recipientEmail(item.parentUserID.email);
						}}
					>
						Contact Parent
					</button>
				</div>
			</div>
		));
		return (
			<div className="sitterDashContainer">
				<div className="sitterDashWelcome">
					<h2>Welcome {this.props.userName}</h2>
					<h3>below are families we found in your area</h3>
				</div>
				<ul className="sitterDashParents">
					<li className="sitterDashParentLi">{localParentList}</li>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userId: state.auth.currentUser.id,
	// email: state.parents.zipcodeSearches.parentUserID.email,
	createdBios: state.sitters.sitterBio,
	location: state.auth.currentUser.zipcode,
	localParents: state.parents.zipcodeSearches,
	openContactForm: state.messages.openContactForm,
});

export default connect(mapStateToProps)(DashboardSitter);
