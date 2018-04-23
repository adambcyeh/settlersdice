import React, { Component } from "react";
import "./App.css";

const MAX_BARB = 6;
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function speak(txt) {
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(txt));
}
const eventroll = () => {
  const roll = getRandomInt(6);
  if (roll === 1) {
    return "yellow";
  } else if (roll === 2) {
    return "green";
  } else if (roll === 3) {
    return "blue";
  }
  return "barbarian";
};

class App extends Component {
  state = {
    dice1: 1,
    dice2: 1,
    event: "barbarian",
    barbarianCount: 0
  };
  newBarbCount = event => {
    if (event !== "barbarian") {
      return this.state.barbarianCount;
    }
    if (this.state.barbarianCount === MAX_BARB) {
      speak("barbarians attack!");
      return 0;
    }
    return this.state.barbarianCount + 1;
  };
  onClick = () => {
    const newd1 = getRandomInt(6);
    const newd2 = getRandomInt(6);
    const event = eventroll();

    const newCount = this.newBarbCount(event);

    const newState = {
      dice1: newd1,
      dice2: newd2,
      event: event,
      barbarianCount: newCount
    };

    this.setState(newState);
    this.speakState(newState);
  };
  speakState = state => {
    const { dice1, dice2, event } = state;
    speak(String(dice1 + dice2));
    if (event === "barbarian") {
      speak(event);
    } else {
      speak(event + " " + dice2);
    }
  };
  resetBarbarians = () => {
    this.setState({ barbarianCount: 0 });
    speak("resetting barbarians");
  };
  render() {
    const { dice1, dice2, event } = this.state;
    const eventResult =
      event === "barbarian" ? "barbarian" : `${event} ${dice2}`;
    return (
      <div className="App">
        <div className="clicktarget" onClick={this.onClick}>
          <div className="clicktargettop">
            <div className="wrapper">
              <div className="dice1">
                <span>{this.state.dice1}</span>
              </div>
              <div className="dice2">
                <span>{this.state.dice2}</span>
              </div>
              <div className={`diceevent ${this.state.event}`}>
                <span>{this.state.event}</span>
              </div>
            </div>
            <span className="totalresult"> {dice1 + dice2} </span>
            <span className={`eventdiceresult ${event}`}> {eventResult} </span>
          </div>
          <span className="barbarianstate">
            Barbarians: {this.state.barbarianCount} / {MAX_BARB + 1}{" "}
          </span>
        </div>
        <div className="resetbarb" onClick={this.resetBarbarians}>
          {" "}
          Reset Barbarians{" "}
        </div>
      </div>
    );
  }
}

export default App;
