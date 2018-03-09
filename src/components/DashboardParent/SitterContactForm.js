import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './SitterContactForm.css';
import { addMessageSuccess } from '../../actions/messages';

class SitterContactForm extends Component {
	onSubmit(values) {
		values.preventDefault();
		const value = {
			subject: this.contactSitterSubjectInput.value,
			text: this.contactSitterTextInput.value,
			id: this.props.id,
		};

		this.props.dispatch(addMessageSuccess(value));
		this.contactSitterSubjectInput.value = '';
		this.contactSitterTextInput.value = '';
	}

	render() {
		return (
			<div className="sitterContactFormWrapper">
				<div className="contactFormHeader">
					<h1>Send a message to sitter....</h1>
					<button className="exitContactForm" src="X">
						X
					</button>
				</div>
				<form className="sitterContactForm" onSubmit={e => this.onSubmit(e)}>
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
});

export default connect(mapStateToProps)(SitterContactForm);
