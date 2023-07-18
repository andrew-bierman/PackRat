import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Countdown = ({ endDate }) => {
  const [countDownData, setCountDownData] = useState({
    timeleft: 'Loading countdown . .'
  });

  const { timeleft } = countDownData;

  useEffect(() => {
    const interval = setInterval(() => {
      countdownTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const countdownTimer = () => {
    const countDownDate = Date.parse(endDate);
    // Get today's date and time
    var now = Date.now();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setCountDownData({
      timeleft: days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's '
    });
  };
  return <Fragment>{timeleft}</Fragment>;
};

Countdown.propTypes = {};

export default Countdown;
