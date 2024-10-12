import { ReactComponent as Message } from 'assets/icon/messages.svg';
import { ReactComponent as CloseButton } from 'assets/icon/close.svg';
import * as Styled from './StyleModalQuestionTitle';

export type OptionTypes = {
  center?: boolean;
  smallContainer?: boolean;
  visible?: boolean;
  filter?: boolean;
};

type ModalQuestionTitleTypes = {
  children: React.ReactNode;
  option: OptionTypes;
  closeModal: () => void;
};

const ModalQuestionTitle = ({
  children,
  option,
  closeModal,
}: ModalQuestionTitleTypes) => {
  return (
    <>
      <Styled.TitleBox option={option}>
        <Styled.Title option={option}>
          {option.visible && (
            <Message width={28} height={28} fill={'var(--gray60)'} />
          )}
          {children}
        </Styled.Title>
        <CloseButton
          width={28}
          height={28}
          fill={'var(--gray60)'}
          onClick={closeModal}
          style={{ cursor: 'pointer' }}
        />
      </Styled.TitleBox>
    </>
  );
};

export default ModalQuestionTitle;
