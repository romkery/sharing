import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Box } from '@mui/system';

import { XSLink } from '@/shared/ui/link';

export const MobileMenu = () => {
  return (
    <Box
      sx={{
        height: '64px',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        background: 'white',
        boxShadow: '0px -2px 8px #FFFFFF10',
        position: 'fixed',
        width: '100%',
        bottom: 0,
        backgroundColor: '#2d2d30',
        fontSize: '14px',
      }}
    >
      <XSLink href="/">
        <NewspaperIcon />
        <Box>Объявления</Box>
      </XSLink>
      <XSLink href="/profile">
        <AccountBoxIcon />
        <Box>Профиль</Box>
      </XSLink>
    </Box>
  );
};
