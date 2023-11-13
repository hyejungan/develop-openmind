import styled from 'styled-components';
import arrowRightImg from 'assets/icon/arrow-right.svg';

export const ButtonBox = styled.button`
  display: inline-flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid ${({theme}) => theme.border.border2};
  background-color: ${({theme}) => theme.button.button1};
  cursor: pointer;

  @media (max-width: 767px) {
    padding: 8px 12px;
  }
`;

export const ArrowRight = styled.div`
  background-image: url(${arrowRightImg});
  background-position: center;
  background-size: cover;
  width: 18px;
  height: 18px;
`;

export const ButtonText = styled.span`
  color: ${({theme}) => theme.color.color2};
  font-family: 'Actor';
  font-size: 1.6rem;
`;
