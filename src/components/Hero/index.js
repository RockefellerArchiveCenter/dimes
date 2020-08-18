import React, { Component } from "react";
import logo from "../../assets/homepage_logo.png"
import "./styles.scss";


class Hero extends Component {
  render() {
    return (
      <div className="hero">
        <div className="hero__logo">
          <img alt={" "} src={logo} />
        </div>
        <h1 className="hero__text">
          Search Our Collections.<br />Discover People and Organizations.<br />Access Digital Content.
        </h1>
      </div>
    )
  }
}

export default Hero;