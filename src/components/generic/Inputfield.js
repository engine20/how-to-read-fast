import React, { useState } from "react";
import { SetSetting, GetSetting } from "../Settings";
import { css, cx } from "@emotion/css";

const Inputfield = ({ handleSubmit, input, setinput }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={css`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10rem;
      `}
    >
      <input
        type="input"
        name="text"
        id="text"
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
          transition: 0.2s;
          width: 25rem;

          &:focus {
            border-bottom: 3px solid ${GetSetting("theme").get("textprimary")};
            width: 35rem;
          }

          &:required,
          &:invalid + #Inputlable {
            font-size: 2.5rem;

            transform: translateY(0);
          }

          &:focus + #Inputlable {
            font-size: 1rem;
            transform: translateY(-2.2rem);
          }
        `}
      />
      <label
        id="Inputlable"
        htmlFor="text"
        className={css`
          font-family: "Cabin", sans-serif;
          position: absolute;
          cursor: text;
          font-size: 1rem;
          transform: translateY(-2.2rem);
          margin-top: -0.5rem;
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
  );
};

export default Inputfield;
