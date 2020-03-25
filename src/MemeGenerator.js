import React, { Component } from 'react';
import axios from 'axios';

export default class MemeGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      img: '',
      topText: '',
      bottomText: ''
      //   fontSize: ''
    };
    this.getMeme = this.getMeme.bind(this);
    this.topOnChange = this.topOnChange.bind(this);
    this.bottomOnChange = this.bottomOnChange.bind(this);
    // this.fontSizeOnChange = this.fontSizeOnChange(this);
  }
  componentDidMount() {
    this.getMeme();
  }
  async getMeme() {
    if (this.state.data === '') {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      console.log(response.data.data.memes);
      this.setState({
        data: response.data.data,
        img: response.data.data.memes[Math.floor(Math.random() * 100)].url
      });
    }
    this.setState({
      img: this.state.data.memes[Math.floor(Math.random() * 100)].url
    });
  }
  topOnChange = e => {
    this.setState({
      topText: e.target.value
    });
    console.log(this.state.topText);
  };
  bottomOnChange = e => {
    this.setState({
      bottomText: e.target.value
    });
    console.log(this.state.bottomText);
  };
  fontSizeOnChange = e => {
    this.setState({
      fontSize: e.target.value
    });
  };

  render() {
    return (
      <div className="memeGenerator row">
        <form className="col-sm">
          <input
            className="input-group-text"
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.topOnChange}
          />
          <input
            className="input-group-text"
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.bottomOnChange}
          />
          <input
            className="input-group-text"
            type="numer"
            name="fontSizse"
            placeholder="Font Size"
            value={this.state.fontSize}
            onChange={this.bottomOnChange}
          />
          <button
            className="btn btn-light"
            onClick={e => {
              e.preventDefault();
              this.getMeme();
            }}>
            New Image
          </button>
          <button className="btn btn-light">Save</button>
        </form>

        <div className="meme col-sm">
          <h2 className="topText">{this.state.topText}</h2>
          <h2 className="bottomText">{this.state.bottomText}</h2>
          <img
            id="memeImg"
            src={this.state.img}
            alt="funny"
            style={{ width: '300px' }}
          />
        </div>
      </div>
    );
  }
}
