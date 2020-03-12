import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { history } from '../../store/store';
import { logOutUser } from '../../store/actions/auth';

import MontyIcon from '../../images/icons/MontyIcon';
import DashboardIcon from '../../images/icons/DashboardIcon';
import StatsIcon from '../../images/icons/StatsIcon';
import AvatarIcon from '../../images/icons/AvatarIcon';
import LogoutIcon from '../../images/icons/LogoutIcon';

import './NavStyles.scss';

export class Nav extends Component {
  state = {
    activePage: ''
  }

  logOutUser = () => {
    this.props.logOutUser();
  }

  render() {
    const { user } = this.props;
    const activePage = history.location.pathname;

    if (!user) return null;
    return (
      <div
        className="nav__nav"
      >
        <div
          className="nav__pageLinks"
        >
          <Link
            to="/"
            className="nav__navLink nav__navLinkHome"
          >
            C
            <h3>Home</h3>
          </Link>
          <Link
            className={`nav__navLink ${activePage === '/dashboard' ? 'nav__navLinkActive' : ''}`}
            to="/dashboard"
          >
            <DashboardIcon
              className="nav_navLinkImg"
            />
            <h3>Dashboard</h3>
          </Link>
          <Link
            className={`nav__navLink ${activePage === '/monty' ? 'nav__navLinkActive' : ''}`}
            to="/monty"
          >
            <MontyIcon
              className="nav_navLinkImg"
            />
            <h3>Monty</h3>
          </Link>
          <Link
            className={`nav__navLink ${activePage === '/stats' ? 'nav__navLinkActive' : ''}`}
            to="/stats"
          >
            <StatsIcon
              className="nav_navLinkImg"
            />
            <h3>Stats</h3>
          </Link>
          <Link
            className={`nav__navLinkAvatar ${activePage === '/preferences' ? 'nav__navLinkActive' : ''}`}
            to="/preferences"
          >
            <AvatarIcon
              className="nav_navLinkImg"
            />
            <h3>{user.firstName}</h3>
          </Link>
          <div
            className="nav__navLogOut"
            onClick={this.logOutUser}
          >
            <LogoutIcon
              className="nav_navLinkImg"
            />
            <h3>Log Out</h3>
          </div>
        </div>
      </div>
    )
  }
};

export function mapStateToProps({ user }) {
  return {
    user: user.activeUser
  }
}

export default connect(
  mapStateToProps,
  {
    logOutUser
  }
)(Nav);

Nav.propTypes = {
  logOutUser: PropTypes.func,
  user: PropTypes.object,
}
