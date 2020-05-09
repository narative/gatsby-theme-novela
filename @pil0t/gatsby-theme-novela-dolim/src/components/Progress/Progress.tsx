import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";

import { clamp } from "@utils";

export interface IProgress {
  contentHeight: number;
}

const Progress: React.FC<IProgress> = ({ contentHeight }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const percentComplete = (window.scrollY / contentHeight) * 100;

      setProgress(clamp(+percentComplete.toFixed(2), -2, 104));
    }, 20);

    if (contentHeight) {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, [contentHeight]);

  return (
    <ProgressContainer tabIndex={-1}>
      <Trackline aria-hidden="true">
        <ProgressLine style={{ transform: `translateY(${progress}%)` }} />
      </Trackline>
    </ProgressContainer>
  );
};

export default Progress;

const ProgressContainer = styled.div`
  position: relative;
  outline: none;
  user-select: none;
`;

const Trackline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(88vh - 40px);
  max-height: 425px;
  width: 1px;
  background-color: ${p => p.theme.colors.track};
  opacity: 0.6;
  overflow: hidden;
`;

const ProgressLine = styled.div`
  position: absolute;
  height: 100%;
  top: -100%;
  width: 1px;
  background-color: ${p => p.theme.colors.progress};
  left: 0;
`;
