import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SideBar.css';
import * as actions from '../../actions';

class SideBar extends Component {
	setCurrentView(view) {
		this.props.dispatch(actions.toggleView(view));
	}
	render() {
		return (
			<div className="sideBarwrapper">
				<div className="sideBarHeader">Messages</div>
				<div className="messageBoxes">
					<ul className="messageBoxesUl">
						<li
							className="messageBoxesLi"
							onClick={() => {
								this.setCurrentView('receivedMessages');
							}}
						>
							Received
						</li>

						<li
							className="messageBoxesLi"
							onClick={() => {
								this.setCurrentView('sentMessages');
							}}
						>
							Sent
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default connect()(SideBar);
