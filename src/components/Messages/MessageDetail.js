import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Moment from 'react-moment';
import './MessageDetail.css';

class MessageDetail extends Component {
	render() {
		let inboxMessage = this.props.inboxMessages.map(object => (
			// console.log('object: ', object.messages.message)
			<div className="messageSectionWrapper" key={object.messages.date}>
				<div className="messageSubjectWrapper">{object.messages.subject}</div>
				<div className="messageBody">{object.messages.message}</div>
				<Moment format="MM/DD/YYYY">
					<div className="messageTimeStamp">{object.messages.date}</div>
				</Moment>
			</div>
		));
		return <div className="messageWrapper">{inboxMessage}</div>;
	}
}

const mapStateToProps = state => ({
	id: state.auth.currentUser.id,
	inboxMessages: state.messages.sentMessages,
});

export default connect(mapStateToProps)(MessageDetail);
