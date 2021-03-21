import PropTypes from 'prop-types';
import s from './Notification.module.css';
import React from "react";

const Notification = ({ message }) => (
    <div className={s.errorMassage}>
        {message}
    </div>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Notification;