import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { Helmet } from 'react-helmet';
import ReCAPTCHA from 'react-google-recaptcha';

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const { email, name, password, passwordConfirm } = formData;

  const [verified, setVerified] = useState(false);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = async e => {
    e.preventDefault();
    if (verified) {
      register(name, email, password, passwordConfirm);
    } else {
      alert('Do the CAPTCHA');
    }
  };

  const verifyCallback = async e => {
    await setVerified(true);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>Create an account | Auction</title>
      </Helmet>
      <div className='row'>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <h2 className='large-heading'>Sign up</h2>
          <p className='small-text'>
            <i className='fas fa-user' /> Sign Up for an Account
          </p>
          <div className='form-group'>
            <h4 className='medium-heading'>Name</h4>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
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
          <div className='form-group'>
            <h4 className='medium-heading'>Confirm Password</h4>
            <input
              type='password'
              placeholder='Confirm Password'
              name='passwordConfirm'
              value={passwordConfirm}
              onChange={e => onChange(e)}
              minLength='3'
            />
          </div>
          <div className='form-group'>
            <h4 className='medium-heading'>Captcha</h4>
            <div className='recaptcha-container'>
              <ReCAPTCHA
                sitekey='6Lf7qjQnAAAAAHckjgPRKBAhmLdIXd9ZhSyKaPmS'
                onChange={verifyCallback}
              />
            </div>
          </div>
          <input
            type='submit'
            className='btn-gray large full'
            value='Register'
          />
        </form>
        <p className='small-text'>
          Already have an account? <Link to='/login'>Log in</Link>
        </p>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
