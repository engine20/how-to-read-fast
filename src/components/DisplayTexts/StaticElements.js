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
    border: 2px solid #213138;
    margin-top: 4rem;
    margin-left: -5rem;
    padding: 0.2rem 1rem 0.7rem 1rem;
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
