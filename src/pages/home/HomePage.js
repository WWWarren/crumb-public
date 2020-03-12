import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { getUsers } from '../../store/actions/user';
import { getIngredients } from '../../store/actions/ingredients';
import { logOutUser } from '../../store/actions/auth';

import MontyIcon from '../../images/icons/MontyIcon';
import DashboardIcon from '../../images/icons/DashboardIcon';
import StatsIcon from '../../images/icons/StatsIcon';
import PreferencesIcon from '../../images/icons/PreferencesIcon';
import avatarIcon from '../../images/icons/avatar-icon.svg';
import LogoutIcon from '../../images/icons/LogoutIcon';

import './HomePageStyles.scss';

export class HomePage extends Component {
  componentDidMount = () => {
    // Get ingredients from database
    this.props.getIngredients();
    // Get users from database
    this.props.getUsers();
  }

  logOutUser = () => {
    this.props.logOutUser();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="home__container">
        <div className="home__navBar">
          <div
            className="home__logoutLink"
            onClick={this.logOutUser}
          >
            <LogoutIcon
              className="logout"
            />
            <h3>Logout</h3>
          </div>
        </div>
        <div className="home__wrapper">
          <div className="home__row">
            <div className="home__userSection">
              <img src={avatarIcon} alt={user.firstName} className="home__userSectionAvatar" />
              <h1>Hello {user.firstName}, Welcome to crumb</h1>
              <h2>Let's get cooking..</h2>
            </div>
          </div>
          <div className="home__row">
            <Link to="/dashboard" className="home__listItem">
              <div className="home__listItemImg">
                <DashboardIcon
                  className="stats"
                />
              </div>
              <div className="home__listItemDetails">
                <h2>Dashboard</h2>
                <p>View all the available recipes within Crumb.</p>
                <p>Rate and comment on your favourite ones.</p>
              </div>
            </Link>
            <Link to="/monty" className="home__listItem">
              <div className="home__listItemImg">
                <MontyIcon
                  className="stats"
                />
              </div>
              <div className="home__listItemDetails">
                <h2>Monty</h2>
                <p>Struggling to think of what to cook/make?</p>
                <p>Get Monty to help you figure out the right meal for you with the ingredients you have.</p>
              </div>
            </Link>
            <Link to="/stats" className="home__listItem">
              <div className="home__listItemImg">
                <StatsIcon
                  className="stats"
                />
              </div>
              <div className="home__listItemDetails">
                <h2>Stats</h2>
                <p>View the stats on your account.</p>
                <p>These include the interactions you've had with the app and the popularity of ingredients in recipes you've interacted with.</p>
              </div>
            </Link>
            <Link to="/preferences" className="home__listItem">
              <div className="home__listItemImg">
                <PreferencesIcon
                  className="stats"
                />
              </div>
              <div className="home__listItemDetails">
                <h2>Preferences</h2>
                <p>View and change your Preferences.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

    )
  }
};

export function mapStateToProps({ user }) {
  return {
    user: user.activeUser,
  }
}

export default connect(
  mapStateToProps,
  {
    getIngredients,
    getUsers,
    logOutUser
  }
)(HomePage);

HomePage.propTypes = {
  getIngredients: PropTypes.func,
  getUsers: PropTypes.func,
  logOutUser: PropTypes.func,
  user: PropTypes.object,
}
