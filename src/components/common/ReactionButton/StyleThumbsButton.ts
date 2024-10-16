import { styled } from 'styled-components';
import { BUTTON_COLOR} from 'constants/thumbsButton';

export const Container = styled.button<{ active: 'gray' | 'blue' | 'red' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  span {
    color: ${({ active }) => BUTTON_COLOR[active]};
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 18px;
  }
`;
