import React, { useState } from "react";
import { SetSetting, GetSetting } from "../Settings";
import { css, cx } from "@emotion/css";

const Inputfield = ({ handleSubmit, input, setinput }) => {
  return (
    <div
      className={css`
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
      `}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="input"
          name="text"
          id="text"
          // placeholder="Enter your text here"
          autoComplete="off"
          required
          tabIndex="0"
          value={input}
          onChange={(e) => setinput(e.target.value)}
          className={css`
            border: 0;
            border-bottom: 3px solid ${GetSetting("theme").get("texttertiary")};
            outline: 0;
            color: ${GetSetting("theme").get("textprimary")};
            padding: 7px 0;
            background: transparent;
            font-family: "Cabin", sans-serif;
            font-size: 2.5rem;
            width: 350px;
            transition: 0.2s;
            &:focus {
              border-bottom: 3px solid ${GetSetting("theme").get("textprimary")};
              width: 850px;
            }

            &:required,
            &:invalid + #Inputlable {
              top: 0.45rem;
              font-size: 2.5rem;
            }

            &:focus + #Inputlable {
              top: -0.8rem;
              font-size: 1rem;
            }
          `}
        />
        <label
          id="Inputlable"
          htmlFor="text"
          className={css`
            font-family: "Cabin", sans-serif;
            position: absolute;
            top: -0.8rem;
            cursor: text;
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
            border-style: solid;
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
    </div>
  );
};

export default Inputfield;
