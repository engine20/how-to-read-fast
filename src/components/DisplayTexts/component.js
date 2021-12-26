import React from "react";
import StaticElements from "./StaticElements";
import { SetSetting, GetSetting } from "../Settings";
import Entryfield from "./Entryfield";
import styled from "@emotion/styled";
import { css, cx } from "@emotion/css";
import Focusprompt from "./Focusprompt";

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
    let maxlength = 16; //TODO add user control
    this.words = this.words.flatMap((element) => {
      //splitting too long elements
      if (!(element.length > maxlength)) {
        return element;
      } else {
        let temp = [];
        for (let i = 0; i < Math.ceil(element.length / maxlength); i++) {
          //iterate through the word how many times we want to split it
          if (temp.length !== 0) {
            temp[i - 1] = temp[i - 1] + "-"; //add a dash to all entries except for the last one
          }
          temp = temp.concat(element.substr(i * maxlength, maxlength).split()); //add the string to the array
        }
        return temp;
      }
    }, this);
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
    this.setText(GetSetting("text"));
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
    `;

    const Progress = styled.h1`
      color: ${GetSetting("theme").get("textsecondary")};
      font-family: "Raleway", sans-serif;
      text-align: right;
      font-size: 5rem;
      border-style: solid;
      border-width: 3px;
      border-color: ${this.state.editprogress
        ? GetSetting("theme").get("texttertiary")
        : "transparent"};
      border-radius: 10px;
      width: 180px;
      transition: 0.2s;
    `;
    const { wpm } = this.props;

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
      <span>
        {this.state.text !== "" ? (
          <div
            className={css`
              background: ${GetSetting("theme").get("textbox")};
              width: min(93.75rem, 93%);
              height: 21.875rem;
              border-radius: 5px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              outline: none;
              display: grid;
              grid-template-columns: 1fr 3fr 1fr;
              align-items: center;
              justify-items: center;
              grid-template-rows: 21.875rem 10rem;
            `}
          >
            <div
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              tabIndex="1"
              onFocus={onFocus}
              onBlur={onBlur}
              className={css`
                grid-column-start: 1;
                grid-column-end: 4;
                outline: none;
                width: 100%;
              `}
            >
              <Currentword>{this.words[this.state.index]}</Currentword>
              {/* <Focusprompt focused={this.state.focus} /> */}
            </div>
            <div>
              <StaticElements />
            </div>
            <NextWord>{nextwordhint()}</NextWord>
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
      </span>
    );
  }
}

export default DisplayText;
