import styled from 'styled-components';
import * as Styled from './StyleButtonBox';
import React from 'react';

const StyledButtonBox = styled(Styled.ButtonBox)`
  display: flex;
  background-color: ${({ theme }) => theme.button.button2};
  width: 100%;
`;

const StyledButtonText = styled(Styled.ButtonText)`
  color: var(--gray10);
  font-family: 'Pretendard';
`;

export type ButtonBoxType = {
  onClick : React.MouseEventHandler;
  children : React.ReactNode;
}

const ButtonBox = ({ onClick, children } : ButtonBoxType) => {
  return (
    <StyledButtonBox onClick={onClick}>
      <StyledButtonText>{children}</StyledButtonText>
    </StyledButtonBox>
  );
};

export default ButtonBox;
