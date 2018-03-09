import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import * as actions from '../../actions';

import { searchSitters } from '../../actions/sitters';
import BioParentForm from '../BioParent/BioParentForm';
import ContactForm from '../ContactForm';

import './DashboardParent.css';

export class DashboardParent extends Component {
	componentDidMount() {
		this.props.dispatch(actions.toggleView('parent'));
		this.props.dispatch(actions.fetchEnrolledParentBio(this.props.userId));
		this.props.dispatch(searchSitters(this.props.location));
	}

	recipientEmail = email => {
		this.props.dispatch(actions.storeRecipientEmail(email));
		this.props.dispatch(actions.toggleContactForm(true));
	};

	render() {
		if (this.props.createdBios.length === 0) {
			return (
				<div className="parentalBioForm">
					<BioParentForm />
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
					<li>
						{' '}
						<b>Date Available: </b>
						<Moment className="dateAvailable" format="MM/DD/YYYY">
							<li className="dateAvailable">
								<b>Date Available:</b> {item.dateAvailable}
							</li>
						</Moment>
					</li>
					<li className="sitterRate">
						<b>Rate:</b> {item.rate}{' '}
					</li>
					<li className="sitterHeader"> {item.sitterHeader}</li>
					<li className="individualSitter">
						<b>Bio:</b>
						<br /> {item.bio}
					</li>
					<li className="yearsExperience">
						<b>Years Experience:</b> {item.yearsExperience}
					</li>
				</ul>
				<button
					className="contactSitterButton"
					type="submit"
					onClick={() => {
						this.recipientEmail(item.sitterUserID.email);
					}}
				>
					Contact Sitter
				</button>
			</div>
		));
		return (
			<div className="parentDashContainer">
				<div className="parentDashWelcome">
					<h2>Welcome {this.props.userName}</h2>
					<h3>below are sitters we found in your area</h3>
				</div>
				<ul className="parentDashSitters">
					<li className="parentDashSittersLi">{localSitterList}</li>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userId: state.auth.currentUser.id,
	createdBios: state.parents.parentalInfo,
	location: state.auth.currentUser.zipcode,
	localSitters: state.sitters.zipcodeSearches,
	openContactForm: state.messages.openContactForm,
});

export default connect(mapStateToProps)(DashboardParent);
