import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Notification.scss';

const Notification = ({ isExist }) => {
  return (
    <CSSTransition in={isExist} timeout={250} classNames="fade" unmountOnExit>
      <div className="notification">
        <p>This contact is already exist!</p>
      </div>
    </CSSTransition>
  );
};

export default Notification;
