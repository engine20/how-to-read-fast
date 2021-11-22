import React, { useState } from "react";
import { css, cx } from "@emotion/css";
import { SetSetting, GetSetting } from "../Settings";

class Entryfield extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      hidetooltip: true,
    };
    this.SetInput = this.SetInput.bind(this);
    this.Tooltip = this.Tooltip.bind(this);
  }

  SetInput(i) {
    this.setState(() => ({
      input: i,
    }));
  }

  Tooltip(hidden) {
    if (this.state.input !== "") {
      hidden = false;
    }
    this.setState(() => ({
      hidetooltip: hidden,
    }));
  }

  render() {
    return (
      <div
        className={css`
          position: relative;
          padding: 15px 0 0;
          margin-top: 10px;
          margin-left: 10%;
          width: 50%;
        `}
      >
        <input
          type="input"
          name="text"
          id="text"
          placeholder="Enter your text here"
          autoComplete="off"
          required
          tabIndex="0"
          onFocus={() => this.Tooltip(false)}
          onBlur={() => this.Tooltip(true)}
          value={this.state.input}
          onChange={(e) => this.SetInput(e.target.value)}
          className={css`
            width: 100%;
            border: 0;
            border-bottom: 3px solid ${GetSetting("theme").get("texttertiary")};
            outline: 0;
            font-size: 3rem;
            color: ${GetSetting("theme").get("textprimary")};
            padding: 7px 0;
            background: transparent;
            font-family: "Cabin", sans-serif;
            font-size: 2.5rem;
            width: 410px;
            transition: 0.2s;
            &:focus {
              border-bottom: 3px solid ${GetSetting("theme").get("textprimary")};
              width: 850px;
            }
            ::placeholder {
              color: ${GetSetting("theme").get("texttertiary")};
              visibility: ${!this.state.hidetooltip ? "hidden" : "visible"};
              transition: visibility 0.22s
                ${!this.state.hidetooltip ? "step-start" : "step-end"};
            }

            &:required,
            &:invalid + #Inputlable {
              top: 28%;
              font-size: 2.5rem;
            }

            &:focus + #Inputlable {
              top: 0;
              font-size: 1rem;
            }
          `}
        />
        <lable
          id="Inputlable"
          htmlFor="text"
          className={css`
            visibility: ${this.state.hidetooltip ? "hidden" : "visible"};
            user-select: none;
            font-family: "Cabin", sans-serif;
            position: absolute;
            top: 0;
            display: block;
            font-size: 1rem;
            color: ${GetSetting("theme").get("texttertiary")};
            user-select: none;
            transition: 0.22s;
          `}
        >
          Enter your text here
        </lable>
      </div>
    );
  }
}

export default Entryfield;
