import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Box } from '@mui/material';
import { SxProps } from '@mui/system';
import React, { useState } from 'react';

import { themeConfig } from '@/app/theme';

interface IProps {
  enableMouseNavigation?: boolean;
  enableArrowNavigation?: boolean;
  images: string[];
  sx?: SxProps;
}

export const ImageCarousel = ({
  enableMouseNavigation,
  enableArrowNavigation,
  images,
  sx,
}: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Slide images
    if (!enableMouseNavigation) return;
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - left;
    if (mouseX < 0) return;
    const zoneWidth = width / images.length;
    const newIndex = Math.floor(mouseX / zoneWidth);
    setCurrentIndex(newIndex);
  };

  const handleMouseLeave = () => {
    // Returning images to the first one
    if (!enableMouseNavigation) return;
    setCurrentIndex(0);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? prevIndex : prevIndex + 1,
    );
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        ...sx,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.2s ease-in-out',
          transform: `translateX(${-currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <Box key={index} sx={{ minWidth: '100%', boxSizing: 'border-box' }}>
            <Box
              component="img"
              src={src}
              alt={`Слайд ${index}`}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Box>
      {enableArrowNavigation && (
        <>
          <Box
            onClick={goToPrevious}
            sx={{
              position: 'absolute',
              width: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              top: '0px',
              color: 'white',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            <ArrowBackIosNew />
          </Box>
          <Box
            onClick={goToNext}
            sx={{
              position: 'absolute',
              width: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              top: '0px',
              right: '0px',
              color: 'white',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            <ArrowForwardIos />
          </Box>
        </>
      )}
      {images.length > 1 && enableMouseNavigation && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '0px',
            width: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '5px',
            padding: '5px 10px',
            boxSizing: 'border-box',
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: `calc(100%/${images.length})`,
                height: '4px',
                transition: '0.2s ease-in-out',
                backgroundColor:
                  currentIndex === index
                    ? themeConfig.palette.blue.default
                    : themeConfig.palette.gray.light,
                cursor: 'pointer',
              }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
