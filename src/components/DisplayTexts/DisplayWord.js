import React from 'react';
import styled from '@emotion/styled'

const DisplayWord = ({word, nextword, progress}) => {
    const Textbox = styled.div`
        background: #16212a;
        width: 1500px;
        height: 350px;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        margin: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        ` 
    
    const Currentword = styled.h1`
        color: #7ebab5;
        font-family: 'Raleway', sans-serif;
        text-align: center;
        font-size: 8.5rem;`
    
    const NextWord = styled.h1`
        color: #0c171f;
        font-family: 'Raleway', sans-serif;
        text-align: center;
        font-size: 5rem;`

    const Progress = styled.h1`
        color: #0c171f;
        font-family: 'Raleway', sans-serif;
        text-align: right;
        font-size: 5rem;
        margin-top:-140px;
        margin-right:20px;`



    return (
        <Textbox>
            <Currentword>{word}</Currentword>
            <NextWord>{nextword}</NextWord>
            <Progress>{progress}</Progress>
        </Textbox>
    );
}
 
export default DisplayWord;