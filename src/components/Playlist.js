import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import Track from '../components/Track';
import ButtonPrimary from '../components/ButtonPrimary';
import moment from 'moment';
import Storage from '../Storage';
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

const Playlist = ({ data }) => {
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
        <div
          onClick={() => {
            const items = Storage.getItems(type);
            items.push(data);
            Storage.setItems(type, items);
          }}
        >
          Save to your library
        </div>
      </CardWrapper>
      <TracksWrapper>{tracksPlaylist}</TracksWrapper>
    </PlaylistContainer>
  );
};

export default Playlist;
