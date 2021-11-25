import React from "react";
import styled from "@emotion/styled";
import { GetSetting } from "../Settings";

const StaticElements = () => {
  const ControlsBox = styled.div`
    background: transparent;
    width: 300px;
    height: 150px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    margin: auto;
    position: absolute;
    top: 80%;
    left: 17%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border: 2px solid #213138;
    padding-left: 15px;
    padding-top: 5px;
  `;

  const Text = styled.h1`
    color: ${GetSetting("theme").get("texttertiary")};
    font-family: "Cabin", sans-serif;
    font-size: 1.15rem;
  `;

  const Key = styled.kbd`
    border-radius: 7px;
    padding: 0px 5px 0;
    border: 3px solid ${GetSetting("theme").get("texttertiary")};
  `;

  return (
    <ControlsBox>
      <Text>
        Press <Key>SPACE</Key> to cycle
      </Text>
      <Text>
        Press <Key>CTRL</Key> to go back one word
      </Text>
      <Text>
        Press <Key>BACKSPACE</Key> to return to start
      </Text>
    </ControlsBox>
  );
};

export default StaticElements;