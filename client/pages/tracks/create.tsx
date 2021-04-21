import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Grid, TextField } from '@material-ui/core';
import StepWrapper from 'components/StepWrapper';
import MainLayout from 'layouts/MainLayout';
import FileUpload from 'components/FileUpload';
import { useInput } from 'hooks/useInput';
import axios from 'axios';


const Create = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');

  const prevHandler = () => {
    setActiveStep((prev) => (prev - 1));
  };
  
  const nextHandler = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => (prev + 1));
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('text', text.value);
      formData.append('artist', artist.value);
      formData.append('picture', picture);
      formData.append('audio', audio);
      axios.post('http://localhost:5000/tracks', formData)
        .then(response => router.push('/tracks'))
        .catch(error => console.log(error))
    }
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid
            container
            direction="column"
            style={{padding: 20}}
          >
            <TextField
              {...name}
              style={{marginTop: 10}}
              label="Track name"
            />
            <TextField
              {...artist}
              style={{marginTop: 10}}
              label="Track author"
            />
            <TextField
              {...text}
              style={{marginTop: 10}}
              label="Track text"
              multiline
              rows={3}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload
            setFile={setPicture}
            accept="image/*"
          >
            <Button>Upload Image</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload
            setFile={setAudio}
            accept="audio/*"
          >
            <Button>Upload Audio</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button
          disabled={activeStep === 0} 
          onClick={prevHandler}
        >
          Prev step
        </Button>
        <Button onClick={nextHandler}>Next step</Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
