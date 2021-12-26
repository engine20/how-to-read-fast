import React from "react";
import { SetSetting, GetSetting } from "./Settings";
import styled from "@emotion/styled";
import "../css/Settingspage.css";

class Settingspage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: GetSetting("checked") || false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState((state) => ({
      checked: !state.checked,
    }));
    SetSetting("checked", !this.state.checked);
    this.props.changeTheme(!this.state.checked);
  }

  render() {
    let { checked } = this.state;
    const Settingsmenu = styled.fieldset`
      color: ${GetSetting("theme").get("textprimary")};
      font-family: "Cabin", sans-serif;
      border-radius: 3px;
      border-color: ${GetSetting("theme").get("texttertiary")};
      border-style: solid;
      border-width: 1px;
      width: 1000px;
      font-size: 1.5rem;
      position: absolute;
      margin-left: 20%;
      margin-top: 3%;
    `;

    return (
      <Settingsmenu>
        <legend>SETTINGS</legend>
        <label className="b-contain">
          <span>Light Theme</span>
          <input
            type="checkbox"
            checked={checked}
            onChange={this.handleChange}
            id="check1"
          />
          <div className="b-input"></div>
        </label>
      </Settingsmenu>
    );
  }
}

export default Settingspage;
