import styled from '@emotion/styled';
import { Grid } from '@material-ui/core';

export const StyledPlayer = styled.div`
  height: 60px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: lightgray;

`;

export const StyledGrid = styled(Grid)`
  &.MuiGrid-root {
    width: 200px;
    margin: 0 20px;
  }
`;

export const ArtistName = styled.div`
  font-size: 12px;
  color: gray;
`;