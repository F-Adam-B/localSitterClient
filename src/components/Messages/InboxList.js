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

	renderContent() {
		switch (this.props.currentView) {
			case 'sentMessages':
				return (
					<div className="sentMessagesWrapper">
						<div className="sideBarComponentWrapper">
							<SideBar />
						</div>
						<ul>
							<li
								className="renderedSentMessages"
								onClick={() => {
									console.log('click');
								}}
							>
								<span>Sent</span>
								{this.renderSentMessages()}
							</li>
						</ul>
					</div>
				);
			case 'receivedMessages':
				return (
					<div className="receivedMessagesWrapper">
						<div className="sideBarComponentWrapper">
							<SideBar />
						</div>
						<ul>
							<li
								className="renderedReceivedMessages"
								onClick={() => {
									console.log('click');
								}}
							>
								<span>Received</span>
								{this.renderReceivedMessages()}
							</li>
						</ul>
					</div>
				);
		}
	}
	render() {
		return <div className="inboxListWrapper">{this.renderContent()}</div>;
	}
}

const mapStateToProps = state => ({
	id: state.auth.currentUser.id,
	sentMessagesBox: state.messages.sentMessages,
	currentView: state.view.selectedView,
	receivedMessagesBox: state.messages.receivedMessages,
});

export default connect(mapStateToProps)(InboxList);
