import React from "react";
// import DisplayWord from "./DisplayWord";
import StaticElements from "./StaticElements";
import { SetSetting, GetSetting } from "../Settings";
import Entryfield from "./Entryfield";
import styled from "@emotion/styled";
import { css, cx } from "@emotion/css";
import { nearest } from "../util";

class DisplayText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      index: 0,
      focus: false,
      editprogress: false,
    };
    this.overwriteprogress = "";
    this.words = [];
    this.setIndex = this.setIndex.bind(this);
    this.setText = this.setText.bind(this);
    this.setFocused = this.setFocused.bind(this);
    this.progressfocused = this.progressfocused.bind(this);
    this.handleprogresskeyevent = this.handleprogresskeyevent.bind(this);
    this.progressblurred = this.progressblurred.bind(this);
    this.setIndexbyPercent = this.setIndexbyPercent.bind(this);
  }

  setIndex(i) {
    this.setState({
      index: i,
    });
  }

  setText(t) {
    this.setState({
      text: t,
    });
    this.words = (t || "").split(" ");
    this.words = this.words.filter((item) => item !== ""); //avoid empty elements
  }

  setFocused(f) {
    this.setState({
      focus: f,
    });
  }

  progress() {
    return (
      this.overwriteprogress ||
      Math.floor((this.state.index / (this.words.length - 1)) * 100) ||
      0
    );
  }

  componentDidMount() {
    this.setState({
      index: GetSetting("index"),
      text: GetSetting("text"),
    });
    this.words = (GetSetting("text") || "").split(" ");
    this.words = this.words.filter((item) => item !== ""); //avoid empty elements
  }

  componentWillUnmount() {
    SetSetting("text", this.state.text);
    SetSetting("index", this.state.index);
  }

  progressfocused() {
    if (!this.state.editprogress) {
      this.setState({
        editprogress: true,
      });
      this.overwriteprogress = " ";
    }
  }

  progressblurred() {
    if (this.state.editprogress) {
      this.setState({
        editprogress: false,
      });
      this.overwriteprogress = "";
    }
  }

  handleprogresskeyevent(e) {
    if (
      (e.keyCode > 47 && e.keyCode < 58) ||
      (e.keyCode > 95 && e.keyCode < 106)
    ) {
      if (this.overwriteprogress.length < 3) {
        //3 because of the space in the beginning of the string
        this.overwriteprogress = this.overwriteprogress + e.key;
      }
    } else if (e.keyCode === 8) {
      this.overwriteprogress = this.overwriteprogress.substr(
        0,
        this.overwriteprogress.length - 1
      );
      if (this.overwriteprogress.length < 1) {
        this.overwriteprogress = " ";
      }
    } else if (e.keyCode === 27) {
      this.progressblurred();
      document.activeElement.blur(); //blur element manually so it can be focused again
    } else if (e.keyCode === 13) {
      this.setIndexbyPercent(parseInt(this.overwriteprogress.substr(1)));

      this.progressblurred();
      document.activeElement.blur(); //blur element manually so it can be focused again
    }
    this.forceUpdate();
  }

  setIndexbyPercent(input) {
    this.setIndex(Math.floor((input / 100) * this.words.length));
  }

  render() {
    const Currentword = styled.h1`
      color: ${GetSetting("theme").get("textprimary")};
      font-family: "Raleway", sans-serif;
      text-align: center;
      font-size: 8.5rem;
    `;

    const NextWord = styled.h1`
      color: ${GetSetting("theme").get("textsecondary")};
      font-family: "Raleway", sans-serif;
      text-align: center;
      font-size: 5rem;

      position: relative;
      margin-top: 1.8em;
    `;

    const Progress = styled.h1`
      color: ${GetSetting("theme").get("textsecondary")};
      font-family: "Raleway", sans-serif;
      text-align: right;
      font-size: 5rem;
      margin-top: -140px;
      padding-right: 20px;
      border-style: solid;
      border-width: 3px;
      border-color: ${this.state.editprogress
        ? GetSetting("theme").get("texttertiary")
        : "transparent"};
      border-radius: 10px;
      width: 180px;
      position: relative;
      left: 88%;
      transition: 0.2s;
    `;
    const { wpm } = this.props;
    //Process the text to an array

    const delay = 60 / wpm;

    const onFocus = () => this.setFocused(true);
    const onBlur = () => {
      this.setFocused(false);
      stopcycle();
    };

    const onKeyDown = (e) => {
      if (this.state.text !== "") {
        //handle input pressed
        if (this.state.editprogress) {
          this.handleprogresskeyevent(e);
        } else {
          if (this.state.text !== "") {
            if (e.repeat === false) {
              //Space Action
              if (e.keyCode === 32) {
                cyclewords();
              }
              //Backspace Action
              if (e.keyCode === 8) {
                this.setIndex(0);
              }
              //Ctrl Action
              if (e.keyCode === 17) {
                this.setIndex(Math.max(this.state.index - 1, 0));
              }
              SetSetting("index", this.state.index);
            }
          }
        }
      }
    };
    const onKeyUp = (e) => {
      if (e.keyCode === 32) {
        stopcycle();
      }
    };

    const cyclewords = () => {
      this.counter = setInterval(() => {
        this.setIndex(Math.min(this.state.index + 1, this.words.length - 1));
      }, delay * 1000);
    };

    const stopcycle = () => {
      clearInterval(this.counter);
    };

    const nextwordhint = () => {
      if (this.state.index + 1 < this.words.length) {
        return this.words[this.state.index + 1];
      } else {
        return "End of text reached";
      }
    };

    const SetTexthandler = (Text) => {
      this.setText(Text);
      SetSetting("text", Text);
    };

    return (
      <div>
        {this.state.text !== "" ? (
          <div
            className={css`
              background: ${GetSetting("theme").get("textbox")};
              width: 1500px;
              height: 350px;
              display: flex;
              flex-direction: column;
              border-radius: 5px;
              margin: auto;
              position: absolute;
              top: 50%;
              left: 50%;
              -ms-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              outline: none;
            `}
          >
            <div
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              tabIndex="1"
              onFocus={onFocus}
              onBlur={onBlur}
              className={css`
                outline: none;
              `}
            >
              <Currentword>
                {(this.state.focus && this.words[this.state.index]) ||
                  "Click to focus"}
              </Currentword>
              <NextWord>{nextwordhint()}</NextWord>
            </div>
            <div
              onFocus={this.progressfocused}
              onBlur={this.progressblurred}
              tabIndex="1"
              onKeyDown={this.handleprogresskeyevent}
              className={css`
                outline: none;
              `}
            >
              <Progress>{this.progress() + "%"}</Progress>
            </div>
          </div>
        ) : (
          <Entryfield SetText={SetTexthandler} />
        )}
        <StaticElements />
      </div>
    );
  }
}

export default DisplayText;
