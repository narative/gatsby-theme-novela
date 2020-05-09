import React, { useCallback, useState } from 'react';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import { useThemeUI } from 'theme-ui';

import 'react-medium-image-zoom/dist/styles.css';

const ImageZoom: React.FC<{}> = props => {
  const [isZoomed, setIsZoomed] = useState(false);
  const { theme } = useThemeUI();

  const image = {
    ...props,
    className: 'Image__Zoom',
    style: {
      display: 'block',
      margin: '0 auto',
      width: '100%',
      borderRadius: isZoomed ? '5px' : '0px',
    },
  };

  const handleZoomChange = useCallback(shouldZoom => {
    setIsZoomed(shouldZoom);
  }, []);

  return (
    <ControlledZoom
      isZoomed={isZoomed}
      onZoomChange={handleZoomChange}
      zoomMargin={40}
      overlayBgColorEnd={theme.colors.background}
    >
      <img
        className={image.className}
        src={image.src}
        alt={image.alt}
        style={image.style}
      />
    </ControlledZoom>
  );
};

export default ImageZoom;
