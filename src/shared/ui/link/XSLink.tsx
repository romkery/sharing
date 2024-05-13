import { SxProps } from '@mui/system';
import { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

import { Link } from '@/shared/ui';

interface IProps extends PropsWithChildren, LinkProps {
  href: string;
  sx?: SxProps;
}

export const XSLink = ({ href, sx, children }: IProps) => {
  return (
    <Link
      href={href}
      sx={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        color: 'lightblue',
        '& > div': {
          color: 'gray',
        },
        '&.MuiLink-active': {
          color: '#59ffd8',
          '& > div': {
            color: 'white',
          },
          path: {
            color: '#59ffd8',
          },
        },
        ...sx,
      }}
    >
      {children}
    </Link>
  );
};
