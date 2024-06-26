import logo from './logo.svg';
import FastAPIComponent from './components/FastAPIComponent';
import CardComponent from './components/CardComponent';
import TextBox from './components/TextBox';
import './App.css';

import {Container, Text} from "@chakra-ui/react";
import React from "react";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <Text
                    bgGradient='linear(to-l, #003153, #77DDE7, #F984E5)'
                    bgClip='text'
                    fontSize='3xl'
                    fontWeight='extrabold'
                >
                    FastAPI + React by flek
                </Text>
            </header>
            <Text margin={4}>

            </Text>
            <FastAPIComponent/>
            <CardComponent/>
        </div>
    );
}

export default App;
