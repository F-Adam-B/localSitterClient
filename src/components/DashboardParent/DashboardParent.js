import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import * as actions from '../../actions';

import { searchSitters } from '../../actions/sitters';
import BioParentForm from '../BioParent/BioParentForm';
import ContactForm from '../Messages/ContactForm';
// import SearchResults from '../LandingPage/SearchResults';
import NoSearchResults from '../../components/NoSearchResults';

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

		if (this.props.localSitters === 0) {
			return <NoSearchResults />;
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
			<div key={index} className="mediaBody">
				<div className="landingSitterResults">
					<div className="sitterFirstName">
						<b>Name:</b> {item.sitterUserID.firstName}
					</div>
					<div className="sitterLocation">
						<b>Location:</b> {item.location}
					</div>
					<div>
						{' '}
						<b>Date Available: </b>
						<Moment className="dateAvailable" format="MM/DD/YYYY">
							<div className="dateAvailable">
								<b>Date Available:</b> {item.dateAvailable}
							</div>
						</Moment>
					</div>
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
				<button
					className="contactSitterButton btn"
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
					<h2 className="welcomeDashHeader">Welcome! {this.props.userName}</h2>
					<p>These are sitters we found in your area</p>
				</div>
				{/* <div>
					<SearchResults />
				</div> */}
				<ul className="parentDashSitters">
					<li className="sitterResultList">{localSitterList}</li>
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
