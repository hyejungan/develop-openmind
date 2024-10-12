import ModalPortal from 'Portal';
import { ModalQuestionTitle } from 'components';
import * as Style from './StyleModal';

interface ModalOptionType {
  smallContainer?: boolean;
  center?: boolean;
  visible?: boolean;
  filter?: boolean;
}

type ModalTypes = {
  trigger: JSX.Element;
  title: string;
  option: ModalOptionType;
  closeModal: () => void;
};

const Modal = ({ trigger, title, option, closeModal }: ModalTypes) => {
  return (
    <>
      <ModalPortal>
        <Style.ModalBackground onClick={closeModal} />
        <Style.Container smallContainer={option.smallContainer}>
          <ModalQuestionTitle option={option} closeModal={closeModal}>
            {title}
          </ModalQuestionTitle>
          {trigger}
        </Style.Container>
      </ModalPortal>
    </>
  );
};

export default Modal;
