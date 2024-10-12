import { useState } from 'react';
import Toast from '../Toast/Toast';
import * as Styled from './StyleButtonShare.js';
import * as handle from 'utils/shareSNS.js';
import linkIcon from 'assets/link-icon.svg';
import facebookIcon from 'assets/facebook-icon.svg';
import kakaoIcon from 'assets/kakao-icon.svg';

type ButtonShareTypes = {
  name : string;
  image : string;
}

function ButtonShare({ name, image } : ButtonShareTypes) {
  const [isToastOn, setIsToastOn] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const sharedUrl = window.location.href;

  const handleCopyUrl = async (url : string) => {
    try {
      await navigator.clipboard.writeText(url);
      setIsToastOn(true);
      setToastMessage('URL이 복사되었습니다');
    } catch {
      setIsToastOn(true);
      setToastMessage('URL 복사에 실패했습니다 🥲');
    }
  };

  const handleFacebook = (url : string) => {
    try {
      handle.shareFacebook(url);
    } catch {
      setIsToastOn(true);
      setToastMessage('공유에 실패했습니다 🥲');
    }
  };

  const handleKakao = (name : string, image : string, url : string) => {
    try {
      handle.shareKakao(name, image, url);
    } catch {
      setIsToastOn(true);
      setToastMessage('공유에 실패했습니다 🥲');
    }
  };

  return (
    <>
      <Styled.Container>
        <Styled.Ul>
          <Styled.Img
            src={linkIcon}
            onClick={() => {
              handleCopyUrl(sharedUrl);
            }}
          />
          <Styled.Img
            src={kakaoIcon}
            onClick={() => {
              handleKakao(name, image, sharedUrl);
            }}
          />
          <Styled.Img
            src={facebookIcon}
            onClick={() => {
              handleFacebook(sharedUrl);
            }}
          />
        </Styled.Ul>
      </Styled.Container>
      {isToastOn && <Toast setStatus={setIsToastOn}>{toastMessage}</Toast>}
    </>
  );
}

export default ButtonShare;
