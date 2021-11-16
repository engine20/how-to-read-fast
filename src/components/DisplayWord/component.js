import React from 'react';
import styled from '@emotion/styled'

const DisplayWord = (props) => {
    const Textbox = styled.div`
        background: #16212a;
        width: 1300px;
        height: 350px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        margin: auto;
        margin: 0;
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


    return (
        <Textbox>
            <Currentword>Bausenclown</Currentword>
        </Textbox>
    );
}
 
export default DisplayWord;