import { useState } from 'react';
import * as Styled from './StyleInputTextArea.js';

const InputTextArea = () => {
  const [isFocused, setIsFocused] = useState('false');

  const handleInputFocus = () => {
    setIsFocused('true');
  };

  const handleInputBlur = () => {
    setIsFocused('false');
  };

  return (
    <Styled.InputTextArea
      isFocused={isFocused}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      placeholder="이름을 입력하세요"
    />
  );
};

export default InputTextArea;