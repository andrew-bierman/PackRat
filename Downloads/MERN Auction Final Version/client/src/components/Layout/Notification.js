import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNotification } from '../../actions/notification';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';

class Notification extends Component {
  componentWillReceiveProps(newProps) {
    const { message, level } = newProps.notification;
    switch (level) {
      case 'info':
        NotificationManager.info(message);
        break;
      case 'success':
        NotificationManager.success(message);
        break;
      case 'warning':
        NotificationManager.warning(message);
        break;
      case 'error':
        NotificationManager.error(message);
        break;
      default:
        break;
    }
  }

  render() {
    return <NotificationContainer />;
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        addNotification
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
