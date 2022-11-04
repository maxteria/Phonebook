import React from "react";
import "./notification.css";

/**
 *
 * @param {string} message
 * @param {string} type (error, success, notification)
 * @returns render and then null
 */

const Notification = ({ text, type }) => {
 
  if (!text) {
    return null;
  }

  return (
    <>
      <div className="notification-box">
        <div className={type}>{text}</div>
      </div>
    </>
  );
};

export default Notification;
