import React, { useState } from "react";
import { SetSetting, GetSetting } from "../Settings";
import { css, cx } from "@emotion/css";

const Inputfield = ({ handleSubmit, input, setinput }) => {
  const [hidelable, sethidelable] = useState(false);
  const lable = (arg) => {
    if (input !== "") {
      arg = false;
    }
    sethidelable(arg);
  };
  return (
    <form
      className={css`
        position: relative;
        padding: 15px 0 0;
        margin-top: 10px;
        margin-left: 10%;
        width: 50%;
      `}
      onSubmit={handleSubmit}
    >
      <input
        type="input"
        name="text"
        id="text"
        placeholder="Enter your text here"
        autoComplete="off"
        required
        tabIndex="0"
        onFocus={() => lable(false)}
        onBlur={() => lable(true)}
        value={input}
        onChange={(e) => setinput(e.target.value)}
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
            visibility: ${!hidelable ? "hidden" : "visible"};
            transition: visibility 0.22s
              ${!hidelable ? "step-start" : "step-end"};
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
          visibility: ${hidelable ? "hidden" : "visible"};
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
        onMouseDown={handleSubmit}
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
};

export default Inputfield;
