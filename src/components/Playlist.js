import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import Track from '../components/Track';
import ButtonPrimary from '../components/ButtonPrimary';
import moment from 'moment';
import SaveToLibrary from './SaveToLibrary';

const PlaylistContainer = styled.section`
  display: grid;
  grid-template-columns: 30% 1fr;
`;

const CardWrapper = styled.div`
  grid-column: 1/2;
  margin-top: 4rem;
  margin-left: 5rem;
`;

const TracksWrapper = styled.div`
  grid-column: 2/3;
`;

const Paragraph = styled.p`
  padding: 0.5rem 0;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
`;

const Save = styled.div`
  font-size: 0.9rem;
  color: ${props => (props.saved ? '#1dac4f' : 'white')};
  cursor: pointer;
  letter-spacing: 0.1rem;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Playlist = ({ data, bgColor }) => {
  if (!data) {
    return null;
  }
  const { tracks, images, description, name, owner, type } = data;

  const tracksPlaylist = tracks.items.map(track => {
    let artistsArray = [];
    if (data.type !== 'album') {
      track = track.track;
      artistsArray =
        track.artists.length > 1
          ? track.artists.map(artist => artist.name)
          : [track.artists[0].name];
    }

    return (
      <Track
        type={type}
        key={track.id}
        id={track.id}
        artists={type === 'album' ? null : artistsArray}
        trackName={track.name}
        albumName={type === 'album' ? null : track.album.name}
        trackDuration={track.duration_ms}
        explicit={track.explicit}
        data={track}
      />
    );
  });

  return (
    <PlaylistContainer>
      <CardWrapper>
        <Card noshadow="true" big="true" image={images[0].url} name={name} />
        <Paragraph>{type === 'album' ? data.artists[0].name : owner.display_name}</Paragraph>
        <Paragraph>{type === 'album' ? null : description}</Paragraph>
        <Paragraph>
          {type === 'album' ? `${moment(data.release_date, 'YYYY/MM/DD').year()} · ` : null}
          {tracks.total > 1 ? `${tracks.total} SONGS` : `1 SONG`}
        </Paragraph>
        <ButtonPrimary>Play</ButtonPrimary>
        <SaveToLibrary type={type} item={data}>
          {status => (
            <Save onClick={status.clickHandler} saved={status.saved}>
              {status.saved ? 'Remove from your library' : 'Save to your library'}
            </Save>
          )}
        </SaveToLibrary>
      </CardWrapper>
      <TracksWrapper>{tracksPlaylist}</TracksWrapper>
    </PlaylistContainer>
  );
};

export default Playlist;
