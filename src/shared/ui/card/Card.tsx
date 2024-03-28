import { Box, SxProps } from '@mui/system';
import { HTMLAttributes, PropsWithChildren } from 'react';

import { themeConfig } from '@/app/theme';

interface PropsType extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  outlined?: boolean;
  sx?: SxProps;
}

export const Card = ({ sx, children, outlined, ...props }: PropsType) => {
  return (
    <Box
      sx={{
        padding: '16px',
        borderRadius: '4px',
        boxShadow: `0px 2px 8px ${themeConfig.palette.gray.default}60`,
        ...(outlined ? { border: '1px solid #E0E0E0' } : {}),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
