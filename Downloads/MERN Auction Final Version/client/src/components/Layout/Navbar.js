import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SearchBar from '../Forms/SearchBar';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const toggleMobileDisplay = () => {
    const navbar = document.querySelector('.navbar');
    if (navbar.className === 'navbar') {
      navbar.className += ' responsive';
    } else {
      navbar.className = 'navbar';
    }
  };

  const authLinks = (
    <ul>
      <li>
        <a className='Nav_link icon' onClick={toggleMobileDisplay}>
          &#9776;
        </a>
        <NavLink
          to='/'
          activeClassName='selected'
          className='Nav_link'
          exact={true}
        >
          <i className='fas fa-home' /> <span>Home</span>
        </NavLink>
        <NavLink
          to='/dashboard'
          activeClassName='selected'
          className='Nav_link'
          exact={true}
        >
          <i className='fas fa-id-card' /> <span>Dashboard</span>
        </NavLink>
      </li>
      <li class='searchBar'>
        <SearchBar />
      </li>
      <li>
        <NavLink
          to='/create'
          activeClassName='selected'
          className='Nav_link'
          exact={true}
        >
          <i className='fas fa-plus-circle' />{' '}
          <span className='hide-sm'>Create listing</span>
        </NavLink>
        <NavLink to='/' className='Nav_link' onClick={logout} exact={true}>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </NavLink>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink
          to='/'
          activeClassName='selected'
          className='Nav_link'
          exact={true}
        >
          <i className='fas fa-home' /> <span className='hide-sm'>Home</span>
        </NavLink>
      </li>
      <li class='searchBar'>
        <SearchBar />
      </li>
      <li>
        <NavLink
          to='/login'
          activeClassName='selected'
          className='Nav_link  rightLink'
          exact={true}
        >
          <i className='fas fa-sign-in-alt' />{' '}
          <span className='hide-sm'>Login</span>
        </NavLink>
        <NavLink
          to='/register'
          activeClassName='selected'
          className='Nav_link  rightLink'
          exact={true}
        >
          <i class='fas fa-user-plus'></i>{' '}
          <span className='hide-sm'>Register</span>
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav>
      {!loading && (
        <div className='navbar'>{isAuthenticated ? authLinks : guestLinks}</div>
      )}
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
