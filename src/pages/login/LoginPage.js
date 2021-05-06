import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { postUser } from '../../store/actions/user';
import { logInUser } from '../../store/actions/auth';

import Form from '../../components/form/FormContainer';
import TextField from '../../components/form/textfield/TextField';
import CrumbLogo from '../../images/CrumbLogo';

import './LoginPage.scss';

const LoginPage = ({ postUser, logInUser }) => {
  const [submissionFailed, setSubmissionFailure] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [userSignedUp, setUserSignedUp] = useState(false);

  function toggleLoginForm() {
    setNewUser(!newUser);
    setUserSignedUp(false);
  }

  function onSubmit(values) {
    postUser(values, setUserSignedUp(true));
  }

  function onLogin(values) {
    logInUser(values, () => setSubmissionFailure(true));
  }

  console.log(submissionFailed)
  return (
    <div className="login__container">
      <div className="login__wrapper">
        <div className="login__row">
          <CrumbLogo
            defaultLogo
          />
        </div>
        {
          !newUser ?
          <div className="login__row">
            <div className="login__formContainer">
              <Form
                form="login"
                onSubmit={onLogin}
                className="login__form"
                submitText="Login"
                errorStatus={submissionFailed}
                errorMessage="There was an error. Please check your details and try logging in again."
              >
                <h3>Sign In</h3>
                <Field
                  name="email"
                  type="email"
                  labelText="EMAIL"
                  required
                  component={TextField}
                />
                <Field
                  name="password"
                  type="password"
                  labelText="PASSWORD"
                  required
                  component={TextField}
                />
              </Form>
            </div>
          </div>
          :
          <div className="login__row">
            <div className="login__formContainer">
              <Form
                form="signup"
                onSubmit={onSubmit}
                submitText="Sign Up"
                successfulSubmission={userSignedUp}
                successMessage="User account successfully created. Please navigate back to the login page to log into crumb"
              >
                <h3>Create an Account</h3>
                <div className="login__formRow">
                  <Field
                    name="firstName"
                    labelText="FIRST NAME"
                    required
                    component={TextField}
                  />
                  <Field
                    name="lastName"
                    labelText="LAST NAME"
                    required
                    component={TextField}
                  />
                </div>
                <div className="login__formRow">
                  <Field
                    name="country"
                    labelText="COUNTRY"
                    required
                    component={TextField}
                  />
                  <Field
                    name="age"
                    type="number"
                    min={1}
                    max={99}
                    labelText="AGE"
                    required
                    component={TextField}
                  />
                </div>
                <Field
                  name="email"
                  type="email"
                  labelText="EMAIL"
                  required
                  component={TextField}
                />
                <Field
                  name="password"
                  type="password"
                  labelText="PASSWORD"
                  required
                  component={TextField}
                />
              </Form>
            </div>
          </div>
        }
        <div className="login__row">
          {
            !newUser ?
            <h3
              className="login__signupLink"
              onClick={() => toggleLoginForm()}
            >
              New user? Sign up to access crumb
            </h3>
            :
            <h3
              className="login__signupLink"
              onClick={() => toggleLoginForm()}
            >
              Existing user? Sign in here
            </h3>
          }
        </div>
      </div>
    </div>
  )
}

export default connect(
  null,
  {
    postUser,
    logInUser,
  }
)(LoginPage);

LoginPage.propTypes = {
  postUser: PropTypes.func,
  logInUser: PropTypes.func,
}
