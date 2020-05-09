import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #ccc;
  color: #898989;
  font-size: 32px;
  font-weight: 600;

  ${mediaqueries.phablet`
    font-size: 28px;
  `}
`;

const ImagePlaceholder: React.FC<{}> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions(containerRef.current.getBoundingClientRect());

    const handleResize = () =>
      setDimensions(containerRef.current.getBoundingClientRect());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container ref={containerRef} {...props}>
      <div>
        {dimensions.width} x {dimensions.height}
      </div>
    </Container>
  );
};

export default ImagePlaceholder;
