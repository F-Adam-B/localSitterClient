import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Inbox.css';
import * as actions from '../actions';

class Inbox extends Component {
	render() {
		return (
			<div className="inboxWrapper">
				<div className="chatSideBarContainer">
					<div className="chatPreviewsSideBarTop"> </div>
					<div className="chatPreviews" />
					<div className="chatPreviewsBottom">End of messages</div>
				</div>
				<div className="chatMainContainer">
					<div className="chatSections">
						<div className="chatSectionsEmpty">No message selected</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	id: state.auth.currentUser.id,
});

export default connect(mapStateToProps)(Inbox);
