import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import THEME from 'style/theme';
import * as Styled from './StyleButtonBox';
import { ButtonBoxType } from './ButtonBox';

const ButtonBoxWithArrow = ({ children, onClick } : ButtonBoxType) => {
  const theme = useContext(ThemeContext);

  return (
    <Styled.ButtonBox onClick={onClick}>
      <Styled.ButtonText>{children}</Styled.ButtonText>
      <Styled.ArrowRight
        color={theme === THEME['basic'] ? 'brown' : 'white'}
      />
    </Styled.ButtonBox>
  );
};

export default ButtonBoxWithArrow;
