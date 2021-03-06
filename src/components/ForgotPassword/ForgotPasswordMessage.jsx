import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const ForgotPasswordMessage = ({ message }) => (
  <section className="main-content content-margin">
    <div className="container align-center">
      <p className="color-primary title-2 align-center">{message}</p>
    </div>
  </section>
);

export const mapStateToProps = ({ forgotPassword }) => ({
  message: forgotPassword.successMessage,
});

ForgotPasswordMessage.propTypes = {
  message: PropTypes.string,
};

ForgotPasswordMessage.defaultProps = {
  message: 'Forgot Password',
};

export default connect(mapStateToProps)(ForgotPasswordMessage);
