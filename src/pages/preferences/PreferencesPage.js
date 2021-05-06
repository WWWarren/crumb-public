import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import database from '../../config';
import { updateUserEmail, updateUserPassword } from '../../store/actions/user';

import Form from '../../components/form/FormContainer';
import TextField from '../../components/form/textfield/TextField';

import './PreferencesPage.scss';

const PreferencesPage = ({ user }) => {
  const [searchList, setSearch] = useState(null);
  const [failed, setFailed] = useState({
    email: false,
    password: false,
  });
  const [success, setSuccess] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    getUserSearches();
  });

  function getUserSearches() {
    database.ref(`/searches`).once('value')
    .then((snapshot) => {

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
      setSearch(searches);
    })
    .catch(() => {
      console.log('list not returned');
    })
  }

  function updateDetails(values, form) {
    if (form === 'email') {
      const userWithUpdatedEmail = {
        ...user,
        email: values.email,
      }
      updateUserEmail(userWithUpdatedEmail, (status) => {
        setFailed({
          ...failed,
          email: status === 'failure' ? true : false,
        })
        setSuccess({
          ...success,
          email: status === 'success' ? true : false,
        })
      })
    } else if (form === 'password') {
      updateUserPassword(values, (status) => {
        setFailed({
          ...failed,
          password: status === 'failure' ? true : false,
        })
        setSuccess({
          ...success,
          password: status === 'success' ? true : false,
        })
      })
    }
  }

  return (
    <div className="preferences__pageContainer">
      <div className="preferences__pageBlock">
        <h3>Change Email</h3>
        <p>Please enter the new email you would like to use with your account.</p>
        <Form
          form="changeEmail"
          submitText="Update Email"
          onSubmit={(values) => updateDetails(values, 'email')}
          errorStatus={failed.email}
          errorMessage="Email not successfully updated. Please enter a new one."
          successfulSubmission={success.email}
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
          onSubmit={(values) => updateDetails(values, 'password')}
          errorStatus={failed.password}
          errorMessage="Password Updated"
          successfulSubmission={success.password}
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
          searchList.map(s => (
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
