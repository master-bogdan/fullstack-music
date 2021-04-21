import MainLayout from 'layouts/MainLayout';
import { Box, Button, Card, Grid, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import { ITrack } from 'types/track';
import TrackList from 'components/TrackList';
import { useTypeSelector } from 'hooks/useTypeSelector';
import { wrapper, NextThunkDispatch } from 'store';
import { fetchTracks, searchTracks } from 'store/track/trackActions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Index = () => {
  const router = useRouter();
  const { tracks, error } = useTypeSelector((state) => state.tracks);
  const [query, setQuery] = useState<string>('');
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = useState(null);

  const search = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(event.target.value));
      }, 500)
    )
  }
  
  if (error) {
    return <MainLayout>
      <h1>{error}</h1>
    </MainLayout>
  }

  return (
    <MainLayout title="Track list | Music app">
      <Grid
        container
        justifyContent="center"
      >
        <Card style={{ width: '900px' }}>
          <Box p={3}>
            <Grid
              container
              justifyContent="space-between"
            >
              <h1>Track list</h1>
              <Button
                onClick={() => router.push('/tracks/create')}
              >
                Upload
              </Button>
            </Grid>
          </Box>
          <TextField 
            fullWidth
            value={query}
            onChange={search}
          />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps( async ({    store
}) => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(await fetchTracks());
})
