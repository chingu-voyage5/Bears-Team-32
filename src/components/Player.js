import React, { Component } from 'react';
import './Player.css';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';

class Player extends Component {
  render() {
    return (
      <footer className="playerBar-container">
        <div className="playerBar">
          <Player__left />
          <Player__center />
          <Player__right />
        </div>
      </footer>
    );
  }
}


class Player__left extends Component {
  render () {
    return (
      <div className="player__left">
        <div className="now-playing">
          <div className="cover-art shadow now-playing__cover-art">
            <div className="covert-art-image"></div>
          </div>
          <div className="track-info elipsis-one-line">
            <div className="track-info__name elipsis-one-line">
              <a href="">Sore Wo Tsuyosa To Yobitai - 2017ver.</a>
            </div>
            <div className="track-info__artists link-subtle elipsis-one-line">
              <a href="">
                Perfume
              </a>
            </div>
          </div>
          <button className="control-button">
            <FontAwesome name="plus fa-lg" />
          </button>
        </div>
      </div>
    );
  }
}

class Player__center extends Component {
  render() {
    return (
      <div className="player__center">
        <div className="player-controls">
          <div className="player-controls__buttons">
            <button className="control-button">
              <FontAwesome name="random fa-lg" />
            </button>
            <button className="control-button">
              <FontAwesome name="step-backward fa-lg" />
            </button>
            <button className="control-button control-button--circled">
              {/* <FontAwesome name="play fa-sm"/> */}
              <FontAwesome name="pause fa-sm"/>
            </button>
            <button className="control-button">
              <FontAwesome name="step-forward fa-lg" />
            </button>
            <button className="control-button">
              <FontAwesome name="repeat fa-lg" />
            </button>
          </div>
          <div className="playback-bar">
            <div className="playback-bar__progress-time">2:43</div>
            <div className="progress-bar">
              <div className="middle-align progress-bar__bg">
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
  render() {
    return (
      <div className="player__right">
        <button className="control-button">
          <FontAwesome name="list-ul fa-lg" />
        </button>
        <button className="control-button">
          <FontAwesome name="mobile fa-lg" />
        </button>
        <button className="control-button">
          <FontAwesome name="volume-down fa-lg" />
        </button>
      </div>
    );
  }
}

export default Player;