import React, { Component } from "react";
import PropTypes from 'prop-types';


class Button extends Component {
  render() {
    return (
      <button type={this.props.buttonType} className={this.props.className} onClick={this.props.handleClick} aria-label={this.props.ariaLabel}>
        {this.props.icon && this.props.icon} {this.props.label}
      </button>
    )
  }
}

Button.propTypes = {
  buttonType: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string
};

export default Button;
