import { Modal as BaseModal } from '@mui/base/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Box, styled, SxProps } from '@mui/system';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

interface PropsType extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title?: string;
  sx?: SxProps;
}

export const Modal = ({ open, onClose, title, sx, children }: PropsType) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      slots={{ backdrop: StyledBackdrop }}
      disableAutoFocus
    >
      <ModalContent
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          ...sx,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px',
              wordBreak: 'break-word',
              alignItems: 'center',
            }}
          >
            {title}
            &nbsp;
            <IconButton
              onClick={onClose}
              sx={{
                alignSelf: 'end',
                width: '24px',
                height: '24px',
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {children}
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>(function CustomBackdrop(props, ref) {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const StyledModal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 8px rgba(52, 125, 254, 0.08);
  padding: 1rem;
  position: relative;
  border-radius: 4px;
`;
