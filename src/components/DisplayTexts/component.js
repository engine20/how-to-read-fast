import React, { useState, useRef } from "react";
import DisplayWord from "./DisplayWord";
import StaticElements from "./StaticElements";
import { SetSetting, GetSetting } from "../Settings";
import Entryfield from "./Entryfield";
//import {example} from '../util'
//TODO convert to class
//save index on unmout
//define state functions without useState
const DisplayText = ({ wpm }) => {
  //Process the text to an array
  const [text, setText] = useState("");
  let words = (text || "").split(" ");
  words = words.filter((item) => item !== ""); //avoid empty elements

  const delay = 60 / wpm;

  const [index, setIndex] = useState(0);

  const [focus, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => {
    setFocused(false);
    stopcycle();
  };

  const onKeyDown = (e) => {
    //handle input pressed

    if (e.repeat === false) {
      //Space Action
      if (e.keyCode === 32) {
        cyclewords();
      }
      //Backspace Action
      if (e.keyCode === 8) {
        setIndex(0);
      }
      //Ctrl Action
      if (e.keyCode === 17) {
        setIndex(Math.max(index - 1, 0));
      }
      SetSetting("index", index);
    }
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 32) {
      stopcycle();
    }
  };

  const counter = useRef(null);
  const cyclewords = () => {
    counter.current = setInterval(
      () => setIndex((prev) => Math.min(prev + 1, words.length - 1)),
      delay * 1000
    );
  };

  const stopcycle = () => {
    clearInterval(counter.current);
  };

  const nextwordhint = () => {
    if (index + 1 < words.length) {
      return words[index + 1];
    } else {
      return "End of text reached";
    }
  };

  const progress = () => {
    return (Math.floor((index / (words.length - 1)) * 100) || 0) + "%";
  };

  const SetTexthandler = (Text) => {
    setText(Text);
    SetSetting("text", Text);
    setIndex(GetSetting("index") + 0);
  };

  return (
    <div
      className="textbox"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      tabIndex="1"
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {text !== "" ? (
        <DisplayWord
          word={(focus && words[index]) || "Click to focus"}
          nextword={nextwordhint()}
          progress={progress()}
        />
      ) : (
        <Entryfield SetText={SetTexthandler} />
      )}
      <StaticElements />
    </div>
  );
};

export default DisplayText;
