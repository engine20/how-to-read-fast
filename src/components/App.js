import React, { Suspense } from "react";
import { injectGlobal } from "@emotion/css";
import "../css/App.css";
import DisplayText from "./DisplayTexts/component";
import { SetSetting, GetSetting } from "./Settings";
import Settingsimg from "../img/Settings.png";
const Settingspage = React.lazy(() => import("./Settingspage"));
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inSettings: false,
    };
    this.ToggleSettings = this.ToggleSettings.bind(this);
  }
  ToggleSettings() {
    this.setState((state) => ({
      inSettings: !state.inSettings,
    }));
  }
  render() {
    //console.log(this.state.inSettings)
    injectGlobal`
        body {
            background: ${GetSetting("theme").get("bg")};
        }
        `;
    return (
      <div className="App">
        {this.state.inSettings ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Settingspage />
          </Suspense>
        ) : (
          <DisplayText wpm={500} />
        )}
        <button
          type="button"
          className="Settingsbutton"
          onMouseDown={this.ToggleSettings}
        >
          {" "}
          <img src={Settingsimg} alt="Settings" height="50" width="50" />
        </button>
      </div>
    );
  }
}

export default App;
