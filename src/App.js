import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Gallery from 'react-grid-gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: null,
      images: [],
      colors: [],
      error: null,
      imagesbycolor: [],
      colorSorted: false,
    };
  }

  getBoard() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.pinterest.com/v3/pidgets/users/skittely/pins/", true); // Returns last 50 pins
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.state === 304)){
        var response = JSON.parse(xhr.responseText);
        this.setState({pins: response.data.pins},
          function() {
            this.getImagesAndCodes();
          }
        );
      }
    }
  }

  validateImages() {
    if (this.state.images.length === 0) {
      this.setState({error: "Zero images retrieved"});
    }
  }

  validateColors() {
    if (this.state.colors.length === 0) {
      this.setState({error: "Zero colors retrieved"});
    }
  }

  getImagesAndCodes() {
    var convert = require('color-convert');
    const IMAGES = [];
    const COLORS = [];
    for(let i=0; i<(this.state.pins.length); i++) {
      let url = this.state.pins[i].images["237x"]["url"];
      let width = this.state.pins[i].images["237x"]["width"];
      let height = this.state.pins[i].images["237x"]["height"];

      IMAGES.push({
        src: url,
        thumbnail: url,
        thumbnailWidth: width,
        thumbnailHeight: height
      })
      COLORS.push(convert.hex.hsl(this.state.pins[i].dominant_color));

    }
    this.setState({images: IMAGES},
      function() {
        this.validateImages();
      }
    );
    this.setState({colors: COLORS},
      function() {
        this.validateColors();
      })
  }

  sortByColor() {

  }

  render() {
    if (this.state.pins === null) {
      this.getBoard();
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to PinSort! </h1>
          <button className="Button" onClick={() => this.sortByColor()}>Sort by Color</button>
        </header>
        <Gallery images={this.state.colorSorted ? this.state.imagesbycolor : this.state.images}/>
        <p className="App-footer">
          What a beautiful rainbow.
        </p>
      </div>
    );
  }
}

export default App;
