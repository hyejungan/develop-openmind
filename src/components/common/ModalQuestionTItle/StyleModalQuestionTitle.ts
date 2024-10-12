import { styled } from 'styled-components';
import { OptionTypes } from './ModalQuestionTItle';

export const TitleBox = styled.div<{option : OptionTypes}>`
  display: flex;
  justify-content: ${({ option }) =>
    `${option.center}` ? 'end' : 'space-between'};
  align-items: center;

  @media (max-width: 767px) {
    gap: ${({ option }) => `${option.center}` && '75px'};
  }
`;
export const Title = styled(TitleBox)<{option : OptionTypes}>`
  display: flex;
  gap: 8px;
  color: var(--gray60);
  font-family: Actor;
  font-size: 2.4rem;
  font-weight: 400;
  line-height: 30px;
  flex-grow: ${({ option }) => `${option.center}` && '1'};
  justify-content: ${({ option }) =>
    `${option.center}`  ? 'center' : 'flex-start'};

  @media (max-width: 767px) {
    font-size: ${({ option }) =>
      `${option.smallContainer}` ? `1.6` : `2`}rem;
    line-height: 25px;
  }
`;
