import React, { Component } from 'react';
import { connect } from 'react-redux';
import './InboxList.css';
import MessageDetail from './MessageDetail';
import SideBar from './SideBar';
import * as actions from '../../actions';

class InboxList extends Component {
	componentWillMount() {
		this.props.dispatch(actions.toggleView('sentMessages'));
	}
	setCurrentView(view) {
		this.props.dispatch(actions.toggleView(view));
	}

	renderSentMessages() {
		return this.props.sentMessagesBox.map(data => <MessageDetail key={data._id} message={data} />);
	}
	renderReceivedMessages() {
		return this.props.receivedMessagesBox.map(data => <MessageDetail key={data._id} message={data} />);
	}
	render() {
		let sentMessages, receivedMessages;
		if (this.props.currentView === 'sentMessages') {
			sentMessages = (
				<div className="sentMessagesWrapper">
					<SideBar />
					<ul>
						<li
							onClick={() => {
								console.log('click');
							}}
						>
							{this.renderSentMessages()}
						</li>
					</ul>
				</div>
			);
		}
		if (this.props.currentView === 'receivedMessages') {
			receivedMessages = (
				<div className="receivedMessagesWrapper">
					<SideBar />
					<ul>
						<li
							onClick={() => {
								console.log('click');
							}}
						>
							{this.renderReceivedMessages()}
						</li>
					</ul>
				</div>
			);
		}
		return (
			<div className="inboxListWrapper">
				{sentMessages}
				{receivedMessages}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	id: state.auth.currentUser.id,
	sentMessagesBox: state.messages.sentMessages,
	currentView: state.view.selectedView,
	receivedMessagesBox: state.messages.receivedMessages,
});

export default connect(mapStateToProps)(InboxList);
