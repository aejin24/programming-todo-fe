import { forwardRef, PropsWithChildren } from "react";
import styled from "styled-components";

import { Portal } from "components/other";

const Popup = forwardRef<HTMLDivElement, PropsWithChildren>(({ children }, ref) => {
  return (
    <Portal>
      <Wrapper ref={ref}>{children}</Wrapper>
    </Portal>
  );
});

export default Popup;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 1400px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;
