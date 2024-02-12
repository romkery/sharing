import { Box, CircularProgress, Container } from '@mui/material';
import { SxProps } from '@mui/system';

export const FullScreenLoader = ({ sx }: { sx?: SxProps }) => {
  return (
    <Container sx={{ height: '95vh', ...sx }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
};
