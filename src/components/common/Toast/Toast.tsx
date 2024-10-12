import { useEffect } from 'react';
import * as Styled from './StyleToast';

type ToastTypes = {
  setStatus : React.Dispatch<React.SetStateAction<boolean>>;
  children : React.ReactNode;
}

export default function Toast({ setStatus, children } : ToastTypes) {
  useEffect(() => {
    setTimeout(() => {
      setStatus(false);
    }, 5000);
  }, []);

  return <Styled.Toast>{children}</Styled.Toast>;
}
