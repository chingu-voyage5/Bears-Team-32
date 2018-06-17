import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const searchTypes = ['album', 'artist', 'playlist', 'track'];
const baseURL = 'https://jffy-api.herokuapp.com/api/v1/spotify/search';
class SearchBar extends Component {
  timeoutID = null;

  handleKeyUp = ({ target }) => {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      let promises = searchTypes.map(type =>
        axios.get(`${baseURL}/?query=${target.value}&type=${type}`),
      );

      Promise.all(promises)
        .then(responses => {
          let searchData = {};
          responses.forEach(response => {
            searchData = Object.assign(searchData, response.data);
          });
          this.props.searchHandler(searchData);
        })
        .catch(error => {
          console.log(`Errors : ${error}`);
        });
    }, 500);
  };

  render() {
    return (
      <Wrapper>
        <StyledLabel>Serach for an Artist, Song, Album or Playlist</StyledLabel>
        <StyledInput type="text" placeholder="Start typing..." onKeyUp={this.handleKeyUp} />
      </Wrapper>
    );
  }
}

export default SearchBar;

const Wrapper = styled.div`
  background-color: #282828;
  width: 100%;
  padding: 2.5rem 0;
`;

const StyledLabel = styled.label`
  color: white;
  display: block;
  text-align: left;
  padding-left: 2rem;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  position: relative;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  border: 0;
  width: 100%;
  height: 4rem;
  background-color: #282828;
  outline: none;
  padding-left: 2rem;
  margin-top: 0.25rem;
  caret-color: lightgreen;
`;
