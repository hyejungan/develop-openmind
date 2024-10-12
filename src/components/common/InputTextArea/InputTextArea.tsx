import { useState } from 'react';
import * as Styled from './StyleInputTextArea';

type InputTextAreaTypes = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const InputTextArea = ({ value, onChange }: InputTextAreaTypes) => {
  const [focused, setFocused] = useState(false);

  const handleInputFocus = () => {
    setFocused(true);
  };

  const handleInputBlur = () => {
    setFocused(false);
  };

  return (
    <Styled.InputTextArea
      focused={focused}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      placeholder="질문을 입력해주세요"
      onChange={onChange}
      value={value}
    />
  );
};

export default InputTextArea;
