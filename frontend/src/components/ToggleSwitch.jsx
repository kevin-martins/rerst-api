import React, { useState } from 'react';
import '../styles/checkbox.css'

const ToggleSwitch = ({ setToggle }) => {

  const handleToggle = () => {
    setToggle(prev => !prev);
  };

  return (
    <label className="switch">
      <input
        className="checkbox"
        type="checkbox"
        role="switch"
        id="toggle"
        onChange={handleToggle}
      />
      <span className="slider"></span>
    </label>
  )
};

export default ToggleSwitch;
