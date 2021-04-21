import React from 'react';
import { useRouter } from 'next/router';
import { IconButton } from '@material-ui/core';
import { Delete, Pause, PlayArrow } from '@material-ui/icons';
import { ITrack } from 'types/track';
import {
  StyledCard,
  StyledGrid,
  ArtistName,
  DeleteButton,
} from './styles';
import { useActions } from 'hooks/useActions';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  active = false,
}) => {
  const router = useRouter();
  const {playTrack, pauseTrack, setActiveTrack} = useActions();

  const play = (event) => {
    event.stopPropagation();
    setActiveTrack(track);
    playTrack();
  }

  return (
    <StyledCard onClick={() => router.push(`/tracks/${track._id}`)}>
      <IconButton
        onClick={play}
      >
        {active ? (
          <Pause />
        ) : (
          <PlayArrow />
        )}
      </IconButton>
      <img width={70} height={70} src={'http://localhost:5000/' + track.picture} />
      <StyledGrid container direction="column">
          <div>{track.name}</div>
          <ArtistName>
            {track.artist}
          </ArtistName>
      </StyledGrid>
      {active && <div>02:42 / 03:22</div>}
      <DeleteButton
        onClick={(event) => event.stopPropagation()}
      >
        <Delete />
      </DeleteButton>
    </StyledCard>
  );
};

export default TrackItem;
