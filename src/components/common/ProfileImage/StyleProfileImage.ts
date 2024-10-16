import styled from 'styled-components';

const SIZES = {
  xLarge: 136, //header
  large: 104, //header-mobile
  mediumLarge: 60, //userCard
  mediumSmall: 48, //userCard-mobile
  small: 32,
  xSmall: 28,
};

export const Container = styled.div<{
  size: 'xLarge' | 'mediumLarge' | 'mediumSmall' | 'xSmall';
  mobile_size: 'large' | 'mediumSmall';
  filter: string;
}>`
  width: ${({ size }) => (size ? SIZES[size] : SIZES['mediumLarge'])}px;
  height: ${({ size }) => (size ? SIZES[size] : SIZES['mediumLarge'])}px;
  border-radius: 70%;
  overflow: hidden;
  flex-shrink: 0;
  text-align: center;
  cursor: ${({ filter }) => filter && 'pointer'};

  :hover {
    filter: ${({ filter }) => filter && `brightness(0.5)`};
  }

  @media (max-width: 767px) {
    width: ${({ mobile_size }) =>
      mobile_size ? SIZES[mobile_size] : SIZES['mediumSmall']}px;
    height: ${({ mobile_size }) =>
      mobile_size ? SIZES[mobile_size] : SIZES['mediumSmall']}px;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
