import React, { Suspense } from "react";
import "../css/App.css";
import DisplayText from "./DisplayTexts/component";
import { SetSetting, GetSetting } from "./Settings";
import Settingsimg from "../img/Settings.png";
import { css, cx } from "@emotion/css";

const Settingspage = React.lazy(() => import("./Settingspage"));
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inSettings: false,
      lightTheme: false,
    };
    this.ToggleSettings = this.ToggleSettings.bind(this);
    this.ChangeTheme = this.ChangeTheme.bind(this);
  }
  ToggleSettings() {
    this.setState((state) => ({
      inSettings: !state.inSettings,
    }));
  }
  ChangeTheme(light) {
    this.setState({
      lightTheme: light,
    });
    GetSetting("theme").set("bg", light ? "#FFFFFF" : "#081119");
    GetSetting("theme").set("bg", light ? "#FFFFFF" : "#081119");
    document.documentElement.style.setProperty(
      "--bg-color",
      light ? "#FFFFFF" : "#081119"
    );
    GetSetting("theme").set("texttertiary", light ? "#000000" : "#12444d");
    GetSetting("theme").set("textprimary", light ? "#000000" : "#7ebab5");
  }
  render() {
    return (
      <div className="App">
        <header>
          <button
            type="button"
            className={css`
              background-color: transparent;
              color: transparent;
              position: relative;
              border-style: none;
              float: right;
              top: 1em;
              right: 1em;
              filter: invert(${this.state.lightTheme ? "100%" : "0%"});
              opacity: 0.2;
              transition: opacity 0.2s linear, transform 0.4s ease,
                filter 0.4s ease;
              &:hover {
                opacity: 0.8;
                transform: scale(110%);
              }
            `}
            onMouseDown={this.ToggleSettings}
          >
            <img src={Settingsimg} alt="Settings" height="50" width="50" />
          </button>
        </header>
        <section>
          {this.state.inSettings ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Settingspage changeTheme={this.ChangeTheme} />
            </Suspense>
          ) : (
            <DisplayText wpm={500} /> //TODO add WPM user Control
          )}
        </section>
      </div>
    );
  }
}

export default App;
