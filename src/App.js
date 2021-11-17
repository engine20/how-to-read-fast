import react, { useState, useRef } from 'react';
import './App.css';
import DisplayWord from './components/DisplayWord/component';

const App = () => {
    //TODO let the user input the text
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sodales ut eu sem integer vitae justo eget magna. Posuere ac ut consequat semper viverra nam libero. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. In tellus integer feugiat scelerisque. Sapien et ligula ullamcorper malesuada proin libero. Cras pulvinar mattis nunc sed blandit libero volutpat sed cras. Purus faucibus ornare suspendisse sed nisi lacus. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Bibendum at varius vel pharetra vel. Mattis enim ut tellus elementum sagittis vitae et leo duis. Consectetur purus ut faucibus pulvinar elementum integer. Tortor condimentum lacinia quis vel eros. Eget mi proin sed libero enim sed faucibus. Lacinia at quis risus sed vulputate odio ut enim blandit. Enim ut tellus elementum sagittis vitae et leo duis. Diam vulputate ut pharetra sit amet aliquam id diam. Nunc scelerisque viverra mauris in. Sed felis eget velit aliquet sagittis id consectetur. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Quis commodo odio aenean sed adipiscing. Orci porta non pulvinar neque laoreet suspendisse. Egestas pretium aenean pharetra magna ac placerat vestibulum. Pellentesque habitant morbi tristique senectus et netus et. Vestibulum morbi blandit cursus risus at ultrices. Facilisis leo vel fringilla est ullamcorper eget. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Tempor commodo ullamcorper a lacus vestibulum sed. Risus feugiat in ante metus dictum at. Cras fermentum odio eu feugiat pretium nibh ipsum consequat. Neque sodales ut etiam sit amet nisl purus. Consectetur libero id faucibus nisl tincidunt eget. Fames ac turpis egestas maecenas pharetra convallis posuere. Tristique senectus et netus et malesuada fames ac turpis. Eget arcu dictum varius duis at consectetur lorem donec massa. Massa ultricies mi quis hendrerit dolor magna. Non consectetur a erat nam at lectus urna duis convallis. Velit egestas dui id ornare arcu odio ut. In eu mi bibendum neque egestas congue quisque egestas diam. Purus sit amet volutpat consequat mauris nunc congue nisi. Nulla facilisi cras fermentum odio eu feugiat pretium nibh. Sit amet justo donec enim diam vulputate. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Amet porttitor eget dolor morbi non. Lacinia quis vel eros donec ac odio tempor orci. Nam at lectus urna duis convallis convallis. Lorem ipsum dolor sit amet consectetur adipiscing elit. Mollis aliquam ut porttitor leo a. Arcu dictum varius duis at consectetur lorem. Ultrices dui sapien eget mi. Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. Enim sed faucibus turpis in eu mi bibendum neque. Pellentesque sit amet porttitor eget dolor morbi. Ac tortor vitae purus faucibus ornare suspendisse sed. Massa enim nec dui nunc mattis enim ut tellus. Facilisi morbi tempus iaculis urna id volutpat. Tortor vitae purus faucibus ornare suspendisse sed. Lorem sed risus ultricies tristique. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Rutrum tellus pellentesque eu tincidunt tortor. Purus sit amet volutpat consequat mauris nunc. Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit.'
    //Process the text to an array
    let words = text.split(" ");

    const wpm = 300; //TODO Implement User Control
    const delay = 60 / wpm; 
    const [value, setValue] = useState(0);

    const timer = useRef(null);
    //TODO inputhandler that calls the increment functin as well as other keys for going back and resetting
    const increment = e => {
      if (e.keyCode === 32 && e.repeat === false) {
        timer.current = setInterval(() => setValue(prev => prev + 1), delay*1000);
      }
    };

    function timeoutClear() {
      clearInterval(timer.current);
    }

    return (
      <div className="App" onKeyDown={increment} onKeyUp={timeoutClear} tabIndex="1">
        <DisplayWord word={words[value]} nextword={words[value+1]}/>
        <button className="resetbutton" onMouseDown={() => setValue(0)}>Reset</button>
      </div>
    );
}

export default App;
