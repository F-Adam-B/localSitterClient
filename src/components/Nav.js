import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuthToken } from '../local-storage';

import * as actions from '../actions';

import './Nav.css';

export class Nav extends Component {
	logOut() {
		this.props.dispatch(actions.clearAuth());
		this.props.dispatch(actions.toggleModal(false));
		clearAuthToken();
	}

	handleClick() {
		const value = { userId: this.props.userId };

		this.props.dispatch(actions.fetchMessageByUser(value));
	}

	render() {
		let landingPageTabs, parentTabs, sitterTabs, logoutTab;

		if (this.props.currentView === 'landing-page') {
			landingPageTabs = (
				<div className="nav-button right">
					<Link to="/signup" className="nav-bttn">
						<button className="nav-bttn signup btn">Signup</button>
					</Link>
					<Link to="/login" className="nav-bttn">
						<button className="nav-bttn login btn">Login</button>
					</Link>
				</div>
			);
		}

		if (this.props.currentView === 'signup') {
			landingPageTabs = (
				<div className="nav-button right">
					<Link to="/signup" className="nav-bttn">
						<button className="nav-bttn signup btn">Signup</button>
					</Link>
					<Link to="/login" className="nav-bttn">
						<button className="nav-bttn login btn">Login</button>
					</Link>
				</div>
			);
		}

		if (this.props.currentView === 'login') {
			landingPageTabs = (
				<div className="nav-button right">
					<Link to="/signup" className="nav-bttn">
						<button className="nav-bttn signup btn">Signup</button>
					</Link>
					<Link to="/login" className="nav-bttn">
						<button className="nav-bttn login btn">Login</button>
					</Link>
				</div>
			);
		}

		if (this.props.currentView === 'parent') {
			parentTabs = (
				<div className="nav-button-container">
					<div className="nav-button-dash-notifications">
						<Link to="/parent/dashboard" className="nav-bttn">
							<button className="nav-bttn btn">Dashboard</button>
						</Link>
						<Link to="/inbox" className="nav-bttn">
							<button
								type="submit"
								onClick={() => this.handleClick()}
								className="nav-bttn inboxButton btn"
							>
								Inbox
							</button>
						</Link>
					</div>
				</div>
			);
		}

		if (this.props.currentView === 'sitter') {
			sitterTabs = (
				<div className="nav-button-container">
					<div className="nav-button-dash-notifications">
						<Link to="/sitter/dashboard" className="nav-bttn">
							<button className="nav-bttn sitter-dashboard btn">Dashboard</button>
						</Link>
						<Link to="/inbox" className="nav-bttn">
							<button
								type="submit"
								onClick={() => this.handleClick()}
								className="nav-bttn inboxButton btn"
							>
								Inbox
							</button>
						</Link>
					</div>
				</div>
			);
		}

		if (this.props.currentView === 'parent' || this.props.currentView === 'sitter') {
			logoutTab = (
				<div className="nav-bttn log-out-tabs">
					<Link to="/" className="nav-bttn logoutbtn">
						<button className="logout btn" onClick={() => this.logOut()}>
							Logout
						</button>
					</Link>
				</div>
			);
		}

		return (
			<div className="nav-bar">
				<Link to="/" className="logo-container">
					<img className="logo" src="https://imgur.com/D1o9XQM.png" alt="logo" />
				</Link>
				<span className="sitter-finder">Sitter Finder</span>
				{landingPageTabs}
				<div className="parentTabs">{parentTabs}</div>
				<div className="sitterTabs>">{sitterTabs}</div>
				<div className="logoutTab">{logoutTab}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentView: state.view.selectedView,
	userId: state.auth.currentUser.id,
});

export default connect(mapStateToProps)(Nav);
