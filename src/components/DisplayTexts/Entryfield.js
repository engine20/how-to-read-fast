import React from "react";
import { css, cx } from "@emotion/css";
import { SetSetting, GetSetting } from "../Settings";
import Inputfield from "../generic/Inputfield";

class Entryfield extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      hidelable: true,
    };
    this.SetInput = this.SetInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  SetInput(i) {
    this.setState(() => ({
      input: i,
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
      <Inputfield
        handleSubmit={this.handleSubmit}
        input={this.state.input}
        setinput={this.SetInput}
      />
    );
  }
}

export default Entryfield;
