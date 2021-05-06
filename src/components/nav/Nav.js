import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { logOutUser } from '../../store/actions/auth';

import MontyIcon from '../../images/icons/MontyIcon';
import DashboardIcon from '../../images/icons/DashboardIcon';
import StatsIcon from '../../images/icons/StatsIcon';
import AvatarIcon from '../../images/icons/AvatarIcon';
import LogoutIcon from '../../images/icons/LogoutIcon';

import './Nav.scss';

const Nav = ({ logOutUser, user, page }) => {
  const [activePage, setActivePage] = useState(page);

  logOutUser = () => {
    logOutUser();
  }

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
          onClick={() => setActivePage('/dashboard')}
          to="/dashboard"
        >
          <DashboardIcon
            className="nav_navLinkImg"
          />
          <h3>Dashboard</h3>
        </Link>
        <Link
          className={`nav__navLink ${activePage === '/monty' ? 'nav__navLinkActive' : ''}`}
          onClick={() => setActivePage('/monty')}
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
          onClick={logOutUser}
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

export function mapStateToProps(state, props) {
  return {
    user: state.user.activeUser,
    page: props.location.pathname
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    logOutUser
  }
)(Nav));

Nav.propTypes = {
  logOutUser: PropTypes.func,
  user: PropTypes.object,
}
