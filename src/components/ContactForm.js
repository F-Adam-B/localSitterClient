import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './ContactForm.css';
import * as actions from '../actions';
import { addMessageSuccess, createMessage } from '../actions/messages';

class ContactForm extends Component {
	handleClick() {
		this.props.dispatch(actions.toggleContactForm(false));
	}

	onSubmit(values) {
		values.preventDefault();
		const value = {
			subject: this.contactSitterSubjectInput.value,
			text: this.contactSitterTextInput.value,
			id: this.props.id,
			email: this.props.recipientEmail,
		};

		this.props.dispatch(createMessage(value));
		this.props.dispatch(actions.toggleContactForm(false));
		this.contactSitterSubjectInput.value = '';
		this.contactSitterTextInput.value = '';
	}

	render() {
		return (
			<div className="sitterContactFormWrapper">
				<div className="contactFormHeader">
					<h1>Send a message to sitter....</h1>
					<button
						className="exitContactForm"
						type="submit"
						onClick={() => {
							console.log('click');
							this.handleClick();
						}}
					>
						X
					</button>
				</div>
				<form className="contactForm" onSubmit={e => this.onSubmit(e)}>
					<div className="inputSubject">
						<label className="contactSubject">Enter a subject</label>
						<input
							className="contactSubjectInput"
							type="text"
							name="contactSubjectInput"
							id="contactSubjectInput"
							placeholder="Subject"
							// onChange={e => }
							ref={input => (this.contactSitterSubjectInput = input)}
						/>
					</div>
					<div className="privateMessageField">
						<textarea
							className="textArea"
							type="text"
							placeholder="Enter a message"
							// onChange={e => }
							ref={input => (this.contactSitterTextInput = input)}
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
	parentName: state.auth.currentUser.firstName,
	id: state.auth.currentUser.id,
	recipientEmail: state.messages.recipientEmail,
});

export default connect(mapStateToProps)(ContactForm);
