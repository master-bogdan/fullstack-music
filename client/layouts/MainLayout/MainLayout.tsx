import React from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import {
  StyledContainer,
} from './styles';
import Player from 'components/Player';

interface MainLayoutProps {
  title?: string;
  description?: string
  keywords?: string
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <>
      <Head>
        <title>{title || "Music app"}</title>
        <meta name="description" content={`Music app ${description}`} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || 'Music, track, listen'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Navbar />
      <StyledContainer>
        {children}
      </StyledContainer>
      <Player />
    </>
  );
};

export default MainLayout;
