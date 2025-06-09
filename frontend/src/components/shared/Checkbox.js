import React from 'react';
import PropTypes from 'prop-types';

function Checkbox({ children, onChange, checked, value, disabled }) {
  return (
    <label className={`flex items-start p-2 rounded cursor-pointer transition-colors w-full ${
      disabled ? 'opacity-60 cursor-not-allowed' : checked ? 'bg-blue-50 border border-blue-200' : 'hover:bg-blue-50'
    }`}>
      <div className="flex-shrink-0 mt-0.5">
        <input 
          type="checkbox" 
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" 
          onChange={onChange}
          checked={checked}
          value={value}
          disabled={disabled}
        />
      </div>
      <span className="ml-2 text-gray-700 text-sm flex-grow">{children}</span>
    </label>
  );
}

Checkbox.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
};

export default Checkbox;