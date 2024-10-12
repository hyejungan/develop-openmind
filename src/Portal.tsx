import { createPortal } from 'react-dom';

type ModalPortalTypes = {
  children : React.ReactNode;
}

const ModalPortal = ({ children } : ModalPortalTypes) => {
  const el = document.getElementById('modal'); // 독립 공간
  return createPortal(children, el);
};

export default ModalPortal;
