import React, { Component } from "react";
import Button from "../Button"
import logo from "../../assets/homepage_logo.png"
//import Menu from "./Menu"
import TextInput from "../Inputs";
import "./styles.scss";

class PageHome extends Component {
    render() {
        // TODO: add onClick handler to Search button
        // TODO: implement page background-color $light-grayish-yellow
        return (
            <div className="container">
              <div className="hero">
                  <div className="hero__logo">
                      <img alt={" "} src={logo} />
                  </div>
                  <h1 className="hero__text">
                      Search Our Collections.<br />Discover People and Organizations.<br />Access Digital Content.
                  </h1>
              </div>
              <form role="search" action="/search" method="get">
                <div className="search search--home">
                  <div className="input-group__search">
                    <TextInput
                        className="label-hidden input__search" //we can also use aria-label with no label element instead of a hidden label, but would need to alter the component
                        label="Enter a search term"
                        id="query"
                        placeholder="Search..."
                        size="60"
                        type="search"
                    />
                    {/* Add Menu component */}
                    {/* I think this is just a select that has an ID of `type`? */}
                    <Button
                        className="btn--search"
                        type="submit"
                        aria-label="Submit search"
                        iconBefore="search"
                    />
                </div>
              </div>
            </form>
          </div>
        )
    }
}

export default PageHome;
