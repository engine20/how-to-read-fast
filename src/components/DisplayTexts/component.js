import { useState, useRef } from 'react';
import DisplayWord from './DisplayWord';
//import {example} from '../util'

const DisplayText = ({wpm, text}) => {
    //Process the text to an array
    let words = text.split(" ");
    words = words.filter(item => item !== ""); //avoid empty elements

    const delay = 60 / wpm; 

    const [index, setIndex] = useState(0);

    const onKeyDown = e => { //handle input pressed
      
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
      }
    }

    const onKeyUp = e => {
      if (e.keyCode === 32) {
        stopcycle();
      }
    }

    const counter = useRef(null);
    const cyclewords = () => {
        counter.current = setInterval(() => setIndex(prev => Math.min(prev + 1, words.length - 1)), delay*1000);
    };

    const stopcycle = () => {
      clearInterval(counter.current);
    }

    const nextwordhint = () => {
      if (index + 1 < words.length) {
        return words[index+1]
      } else {
        return "End of text reached"
      }
    }

    return (
      <div className="textbox" onKeyDown={onKeyDown} onKeyUp={onKeyUp} tabIndex="1">
        <DisplayWord word={words[index]} nextword={nextwordhint()} progress={(Math.floor((index/(words.length-1))*100) || 0) + "%"}/> 
                                                                        {/*calculates progress by dividing lenght by current index + fail save if text has only one word*/}
      </div>
    );
}

export default DisplayText;
