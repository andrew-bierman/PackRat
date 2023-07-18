import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Helmet } from 'react-helmet';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(email, password);
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>Log in | Auction</title>
      </Helmet>
      <div className='row'>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <h2 className='large-heading'>Log in</h2>
          <p className='small-text'>
            <i className='fas fa-user' /> Login to Your Account
          </p>
          <div className='form-group'>
            <h4 className='medium-heading'>Email</h4>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <h4 className='medium-heading'>Password</h4>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              minLength='3'
            />
          </div>
          <input type='submit' className='btn-gray large full' value='Login' />
        </form>
        <p className='small-text'>
          Don't have an account? <Link to='/register'>Register today</Link>
        </p>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
