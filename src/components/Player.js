import React, { Component } from 'react';
import './Player.css';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';
class Player extends Component {
  render() {
    return (
      <footer className="playerBar-container">
        <div className="playerBar">
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
                <FontAwesome name="plus" />
              </button>
            </div>
          </div>
          <div className="player__center">
            <button className="control-button">
              <FontAwesome name="random" />
            </button>
            <button className="control-button">
              <FontAwesome name="step-backward" />
            </button>
            <button className="control-button">
              <FontAwesome name="play-circle" />
            </button>
            <button className="control-button">
              <FontAwesome name="step-forward" />
            </button>
            <button className="control-button">
              <FontAwesome name="repeat" />
            </button>
          </div>
          <div className="player__right">
            <button className="control-button">
              <FontAwesome name="list-ul" />
            </button>
            <button className="control-button">
              <FontAwesome name="mobile" />
            </button>
            <button className="control-button">
              <FontAwesome name="volume-down" />
            </button>
          </div>
        </div>
      </footer>
    );
  }
}

export default Player;
