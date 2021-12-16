import React, { useState } from "react";

const Focusprompt = ({ focused }) => {
  return <h1>{focused ? "focus" : "no focus"}</h1>;
};

export default Focusprompt;
