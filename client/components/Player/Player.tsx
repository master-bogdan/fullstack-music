import React, { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { Pause, PlayArrow, VolumeUp } from '@material-ui/icons';
import {
  StyledPlayer,
  StyledGrid,
  ArtistName,
} from './styles';
import { ITrack } from 'types/track';
import TrackProgress from 'components/TrackProgress';
import { useTypeSelector } from 'hooks/useTypeSelector';
import { useActions } from 'hooks/useActions';

let audio;

const Player = () => {
  const {
    pause,
    volume,
    active,
    duration,
    currentTime,
  } = useTypeSelector((state) => state.player);

  const {
    pauseTrack,
    playTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    setActiveTrack,
  } = useActions();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active])

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      }
    }
  }

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const changeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(event.target.value) / 100;
    setVolume(Number(event.target.value));
  };

  const changeCurrentTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(event.target.value);
    setCurrentTime(Number(event.target.value));
  };

  if (!active) {
    return null;
  }

  return (
    <StyledPlayer>
      <IconButton
        onClick={play}
      >
        {pause ? (
          <PlayArrow />
        ) : (
          <Pause />
        )}
      </IconButton>
      <StyledGrid container direction="column">
          <div>{active?.name}</div>
          <ArtistName>
            {active?.artist}
          </ArtistName>
      </StyledGrid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{marginLeft: 'auto'}} />
      <TrackProgress
        left={volume}
        right={100}
        onChange={changeVolume}
      />
    </StyledPlayer>
  );
};

export default Player;
