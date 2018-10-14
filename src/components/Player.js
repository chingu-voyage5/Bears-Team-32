import React, { Component } from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';
import './Player.css';

class Player extends Component {
  constructor() {
    super();
    this.state = {
      trackData: {},
      fetched: false,
    }

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const apiLink = "https://jffy-api.herokuapp.com/api/v1/spotify/?query=https://api.spotify.com/v1/tracks/1D8bmUIhLHEO4KMS2SHwUx";
    this.fetchData(apiLink);
  }

  fetchData(url) {
    // API Link to Shakira's El Dorado album
    this.setState({
      fetched: false,
    })
    axios.get(url).then(res => {
      this.setState({
        trackData: res.data,
        fetched: true,
      });
    });
  }

  render() {
    const fetched = this.state.fetched;
    const albumData = this.state.trackData.album;
    const trackURL = this.state.trackData.preview_url;

    return (
      <footer className="playerBar-container">
        <div className="playerBar">
          <Player__left fetched = {fetched} albumData = {albumData}/>
          <Player__center fetched = {fetched} trackURL = {trackURL}/>
          <Player__right />
        </div>
      </footer>
    );
  }
}

class Player__left extends Component {
  render () {
    if(this.props.fetched) {
      // album data
      const albumData = this.props.albumData;

      // inline style
      const albumCover = { backgroundImage:  'url(' + albumData.images[2].url + ')'};

      return (
        <div className="player__left">
          <div className="now-playing">
            <div className="cover-art shadow now-playing__cover-art">
            <div className="covert-art-image" style={ albumCover }></div>            
            </div>
            <div className="track-info elipsis-one-line">
              <div className="track-info__name elipsis-one-line">
                <a href= "URL to album page">
                  { albumData.name }
                </a>
              </div>
              <div className="track-info__artists link-subtle elipsis-one-line">
                <a href= "URL to artist page">
                  { albumData.artists[0].name }
                </a>
              </div>
            </div>
            <button className="control-button">
              <FontAwesome name="plus" />
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Player__left"></div>
      )
    }
  }
}

class Player__center extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      mousedown: false,
    }

    this.handleUpdate = this.handleUpdate.bind(this);
    this.setProgressBar = this.setProgressBar.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
  }  

  mousedown() {
    this.setState({ mousedown: !this.state.mousedown });
  }

  mouseup() {
    this.setState({ mousedown: !this.state.mousedown });
  }

  handleUpdate(e) {
    if(e.type === 'click' || this.state.mousedown) {
      // Select the audio element
      const player = document.querySelector(".audiosrc");
      const progressBar = document.querySelectorAll(".progress-bar__fg");

      const parentElBound = progressBar[0].parentNode.getBoundingClientRect();
      const curCursorPos = e.pageX;

      if(curCursorPos > parentElBound.left && curCursorPos < parentElBound.right) {
        const barWidth = parentElBound.width;
        const dist = curCursorPos - parentElBound.left;

        var newPos = dist / barWidth * 100;
      }

      if(newPos <= 100) {
        // when newPos is too large, it is not accepted by the volume method
        this.setProgressBar(newPos);
        
        // Playback handling
        const playbackProgressT = document.querySelectorAll(".playback-bar__progress-time");
        const audioDuration = player.duration;

        // left
        console.log(audioDuration * newPos / 100);
        const curTime = audioDuration * newPos / 100;
        
        var min = Math.floor(curTime / 60);
        var sec = ('0' + Math.floor(curTime % 60)).slice(-2);
        
        playbackProgressT[0].innerHTML = min + ":" + sec;
        player.currentTime = curTime;

        // right - total duration
        var min = Math.floor(audioDuration / 60);
        var sec = ('0' + Math.floor(audioDuration % 60)).slice(-2);

        playbackProgressT[1].innerHTML = min + ":" + sec;     

      }


    }
  }

  setProgressBar(perc) {
    const progressBar = document.querySelectorAll(".progress-bar__fg");
    const progressBarSlider = document.querySelectorAll(".progress-bar__slider");

    progressBar[0].style.width = perc + "%";
    progressBarSlider[0].style.left = perc + "%";
  }


  togglePlay = () => {
    // Select the audio element
    const player = document.querySelector(".audiosrc");
    
    // Is the audio playing?
    this.setState({
      playing: !this.state.playing,
    });

    // Play/Pause the audio stream
    this.state.playing ? player.pause() : player.play();
  }
  
  render() {
    const trackURL = this.props.trackURL;

    return (
      <div className="player__center">
        <audio className="audiosrc" src={trackURL}></audio>
        <div className="player-controls">
          <div className="player-controls__buttons">
            <button className="control-button">
              <FontAwesome name="random" />
            </button>
            <button className="control-button">
              <FontAwesome name="step-backward" />
            </button>
            <button className="control-button control-button--circled" onClick={this.togglePlay}>
              { !this.state.playing &&
                <FontAwesome name="play fa-sm"/>
              }
              { this.state.playing &&
                <FontAwesome name="pause fa-sm"/>
              }
            </button>
            <button className="control-button">
              <FontAwesome name="step-forward" />
            </button>
            <button className="control-button">
              <FontAwesome name="repeat" />
            </button>
          </div>
          <div className="playback-bar">
            <div className="playback-bar__progress-time">2:43</div>
            <div className="progress-bar" onClick={this.handleUpdate} onMouseDown={this.mousedown} onMouseUp={this.mouseup} onMouseMove={this.handleUpdate}>
              <div className="middle-align progress-bar__bg" >
                <div className="progress-bar__fg" style={{width: '66.9757%'}}></div>
                <div className="middle-align progress-bar__slider" style={{left: '66.9757%'}}></div>
              </div>
            </div>
            <div className="playback-bar__progress-time">4:04</div>
          </div>
        </div>
      </div>
    );
  }
}

class Player__right extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mousedown: false,
    }

    this.handleUpdate = this.handleUpdate.bind(this);
    this.setProgressBar = this.setProgressBar.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
  }  

  mousedown() {
    this.setState({ mousedown: !this.state.mousedown });
  }

  mouseup() {
    this.setState({ mousedown: !this.state.mousedown });
  }

  handleUpdate(e) {
    if(e.type === 'click' || this.state.mousedown) {
      // Select the audio element
      const player = document.querySelector(".audiosrc");
      const progressBar = document.querySelectorAll(".progress-bar__fg");

      const parentElBound = progressBar[1].parentNode.getBoundingClientRect();
      const curCursorPos = e.pageX;

      if(curCursorPos > parentElBound.left && curCursorPos < parentElBound.right) {
        const barWidth = parentElBound.width;
        const dist = curCursorPos - parentElBound.left;

        var newPos = dist / barWidth * 100;
      }

      if(newPos <= 100) {
        // when newPos is too large, it is not accepted by the volume method
        this.setProgressBar(newPos);

        // Volume handling
        player.volume = newPos / 100;
      }
    }
  }

  setProgressBar(perc) {
    const progressBar = document.querySelectorAll(".progress-bar__fg");
    const progressBarSlider = document.querySelectorAll(".progress-bar__slider");

    progressBar[1].style.width = perc + "%";
    progressBarSlider[1].style.left = perc + "%";
  }
  

  render() {
    return (
      <div className="player__right">
        <div className="player__right__inner">
          <div className="extra-controls">
          <div className="GlueDropTarget">
            <a className="extra-controls__queue-link" href="/queue">
              <button className="control-button">
                <FontAwesome name="list-ul fa-lg" />
              </button>
            </a>
          </div>
          <span className="connect-device-picker">
            <button className="control-button">
              <FontAwesome name="mobile fa-lg" />
            </button>
          </span>
          <div className="volume-bar">
            <button className="control-button">
              <FontAwesome name="volume-down fa-lg" />
            </button>
            <div className="progress-bar" onClick={this.handleUpdate} onMouseDown={this.mousedown} onMouseUp={this.mouseup} onMouseMove={this.handleUpdate}>
              <div className="middle-align progress-bar__bg">
                <div className="progress-bar__fg"  style={{width: '75.3643%'}}></div>
                <div className="middle-align progress-bar__slider"  style={{left: '75.3643%'}}></div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;