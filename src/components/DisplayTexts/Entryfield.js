import React from "react";
import { css, cx } from "@emotion/css";
import { SetSetting, GetSetting } from "../Settings";

class Entryfield extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      hidelable: true,
    };
    this.SetInput = this.SetInput.bind(this);
    this.Tooltip = this.Tooltip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      hidelable: hidden,
    }));
  }

  handleSubmit(event) {
    if (this.state.input !== "") {
      event.preventDefault();
      this.props.SetText(this.state.input);
    }
  }

  componentDidMount() {
    //restore text after mounting
    this.setState({
      input: GetSetting("Entryfield").get("input"), //If text was in the entryfield but not set
      hidelable: GetSetting("Entryfield").get("hidelable"),
    });
  }

  componentWillUnmount() {
    if (this.state.input !== "") {
      GetSetting("Entryfield").set("input", this.state.input);
      GetSetting("Entryfield").set("hidelable", this.state.hidelable);
    }
  }

  render() {
    return (
      <form
        className={css`
          position: relative;
          padding: 15px 0 0;
          margin-top: 10px;
          margin-left: 10%;
          width: 50%;
        `}
        onSubmit={this.handleSubmit}
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
              visibility: ${!this.state.hidelable ? "hidden" : "visible"};
              transition: visibility 0.22s
                ${!this.state.hidelable ? "step-start" : "step-end"};
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
        <label
          id="Inputlable"
          htmlFor="text"
          className={css`
            visibility: ${this.state.hidelable ? "hidden" : "visible"};
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
        </label>
        <input
          type="button"
          value="GO"
          onMouseDown={this.handleSubmit}
          className={css`
            font-family: "Cabin", sans-serif;
            color: ${GetSetting("theme").get("texttertiary")};
            font-size: 1.7rem;
            border-color: ${GetSetting("theme").get("texttertiary")};
            border-radius: 5px;
            border-style: double;
            background-color: transparent;
            margin-left: 20px;
            height: 55px;
            width: 70px;
            transition: 0.22s ease;
            &:hover {
              color: ${GetSetting("theme").get("textprimary")};
              border-color: ${GetSetting("theme").get("textprimary")};
            }
          `}
        />
      </form>
    );
  }
}

export default Entryfield;
