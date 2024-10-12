import ModalPortal from 'Portal';
import { StyledGlobal } from 'style/StyleGlobal';
import * as Styled from './StyleModal';

type ModalLoadingTypes = {
  back?: 'noBG';
};

const ModalLoading = ({ back }: ModalLoadingTypes) => {
  return (
    <>
      <StyledGlobal />
      <ModalPortal>
        <Styled.ModalBackground back={back}>
          <Styled.Spinner />
        </Styled.ModalBackground>
      </ModalPortal>
    </>
  );
};

export default ModalLoading;
