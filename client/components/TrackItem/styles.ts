import styled from '@emotion/styled';
import { Card, Grid, IconButton } from '@material-ui/core';

export const StyledCard = styled(Card)`
  &.MuiCard-root {
    margin: 20px;
    padding: 10px;
    display: flex;
    align-items: center;
  }
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

export const DeleteButton = styled(IconButton)`
  &.MuiIconButton-root {
    margin-left: auto;
  }
`;
