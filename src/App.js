import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  getBoard() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.pinterest.com/v3/pidgets/users/skittely/pins/", true); // Returns last 50 pins
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.state === 304)){
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        console.log(response.data.pins[5].domain)
      }
    }
  }

  render() {
    this.getBoard();


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to PinSort</h1>
        </header>
        <p className="App-intro">
          What a beautiful rainbow.
        </p>
      </div>
    );
  }
}

export default App;
