import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import database from '../../config';
import { updateUserEmail, updateUserPassword } from '../../store/actions/user';

import Form from '../../components/form/FormContainer';
import TextField from '../../components/form/textfield/TextField';

import './PreferencesPageStyles.scss';

export class PreferencesPage extends Component {
  state = {
    searches: [],
    emailFormSubmissionFailed: false,
    passwordFormSubmissionFailed: false,
    emailFormSubmissionSuccess: false,
    passwordFormSubmissionSuccess: false,
  }

  componentDidMount = () => {
    this.getUserSearches();
  }

  getUserSearches = () => {
    database.ref(`/searches`).once('value')
    .then((snapshot) => {
      const { user } = this.props;

      //
      // Create array of searches from the returned values
      let allSearches = [];
      snapshot.forEach((childSnapShot) => {
        allSearches.push({
          id: childSnapShot.key,
          ...childSnapShot.val()
        });
      });

      //
      // Filter out searches not related to current user
      allSearches = allSearches.filter(s => s.userID === user.id);

      //
      // Only show latest 10 searches
      const searches = allSearches.reverse().slice(0, 10);

      this.setState(() => ({
        searches,
      }));
    })
    .catch(() => {
      console.log('list not returned');
    })
  }

  updateDetails = (values, form) => {
    let user = {
      ...this.props.user,
    }

    if (form === 'email') {
      user = {
        ...this.props.user,
        email: values.email,
      }
      updateUserEmail(user, (status) => {
        this.setState(() => ({
          emailFormSubmissionFailed: status === 'failure' ? true : false,
          emailFormSubmissionSuccess: status === 'success' ? true : false,
        }));
      })
    } else if (form === 'password') {
      updateUserPassword(values, (status) => {
        this.setState(() => ({
          passwordFormSubmissionFailed: status === 'failure' ? true : false,
          passwordFormSubmissionSuccess: status === 'success' ? true : false,
        }));
      })
    }
  }

  render() {
    const { searches } = this.state;
    return (
      <div className="preferences__pageContainer">
        <div className="preferences__pageBlock">
          <h3>Change Email</h3>
          <p>Please enter the new email you would like to use with your account.</p>
          <Form
            form="changeEmail"
            submitText="Update Email"
            onSubmit={(values) => this.updateDetails(values, 'email')}
            errorStatus={this.state.emailFormSubmissionFailed}
            errorMessage="Email not successfully updated. Please enter a new one."
            successfulSubmission={this.state.emailFormSubmissionSuccess}
            successMessage="Email successfully changed."
          >
            <Field
              name="email"
              type="email"
              required
              component={TextField}
            />
          </Form>
        </div>
        <div className="preferences__pageBlock">
          <h3>Change Password</h3>
          <p>Please enter the new password you would like to use with your account.</p>
          <Form
            form="changePassword"
            submitText="Update Password"
            onSubmit={(values) => this.updateDetails(values, 'password')}
            errorStatus={this.state.passwordFormSubmissionFailed}
            errorMessage="Password Updated"
            successfulSubmission={this.state.passwordFormSubmissionSuccess}
            successMessage="Password successfully changed."
          >
            <Field
              name="password"
              type="password"
              required
              component={TextField}
            />
          </Form>
        </div>
        <div className="preferences__pageBlock">
          <h3>View Past Monty Searches</h3>
          <p>
            Below are the last 10 searches requested for Monty. Clicking on a search below will
            take you to the results of said search.
          </p>
          {
            searches.map(s => (
              <Link
                to={`/monty/${s.id}`}
                className="preferences__searchLink"
                key={s.id}
              >
                {s.createdOn}
              </Link>
            ))
          }
        </div>
      </div>
    )
  }
}

export function mapStateToProps({ user }) {
  return {
    user: user.activeUser,
  }
}

export default connect(
  mapStateToProps,
  null
)(PreferencesPage);

PreferencesPage.propTypes = {
  user: PropTypes.object,
}
