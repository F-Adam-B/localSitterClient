import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './ContactParentForm.css';
import { addMessageSuccess } from '../../actions/messages';

class ContactParentForm extends Component {
	onSubmit(values) {
		values.preventDefault();
		const value = {
			subject: this.contactParentSubjectInput.value,
			text: this.contactParentTextInput.value,
			id: this.props.id,
		};
		console.log('value: ', value);
		this.props.dispatch(addMessageSuccess(value));
		this.contactParentSubjectInput.value = '';
		this.contactParentTextInput.value = '';
	}
	render() {
		return (
			<div className="contactParentFormWrapper">
				<div className="contactFormHeader">
					<h1>Send a message to parent....</h1>
					<button className="exitContactForm" src="X">
						X
					</button>
				</div>
				<form className="parentContactForm" onSubmit={e => this.onSubmit(e)}>
					<div className="inputSubject">
						<label className="contactSubject">Enter a subject</label>
						<input
							className="contactSubjectInput"
							type="text"
							name="contactSubjectInput"
							id="contactSubjectInput"
							placeholder="Subject"
							ref={input => (this.contactParentSubjectInput = input)}
						/>
					</div>
					<div className="privateMessageField">
						<textarea
							className="textArea"
							type="text"
							placeholder="Enter a message"
							ref={input => (this.contactParentTextInput = input)}
						/>
					</div>
					<div htmlFor="checkbox" className="checkbox">
						<label>Email me a copy of this message</label>
						<input type="checkbox" name="emailCheckBox" id="emailCheckBox" value="on" />
					</div>
					<div type="button" className="submitButton">
						<button>Send</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	username: state.auth.currentUser.firstName,
	id: state.auth.currentUser.id,
});

export default connect(mapStateToProps)(ContactParentForm);
