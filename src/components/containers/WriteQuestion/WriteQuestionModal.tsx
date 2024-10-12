import { useState } from 'react';
import { InputTextArea, ProfileImage } from 'components';
import { postSubjectsQuestion } from 'api/api';
import * as Styled from './StyleWriteQuestion';

interface QuestionDataType {
  id : number;
  name : string;
  imageSource : string;
  questionCount : number;
  createdAt : string;
}

type WriteQuestionModalType = {
  closeModal : () => void;
  subjectData : [subjectName : string, subjectImg : string, subjectId : string];
  setQuestionData : React.Dispatch<React.SetStateAction<{
    data: any[];
}>>,
  questionData : {data : QuestionDataType[]},
  setTotal: React.Dispatch<any>,
}

const WriteQuestionModal = ({
  closeModal,
  subjectData,
  setQuestionData,
  questionData,
  setTotal,
} : WriteQuestionModalType) => {
  const [subjectName, subjectImg, subjectId] = subjectData;
  const [value, setValue] = useState('');
  const [active, setActive] = useState(false);

  const handleButtonClick = async (e : React.MouseEvent) => {
    e.preventDefault();
    try {
      const formData = JSON.stringify({ content: `${value}` });
      const response = await postSubjectsQuestion({id : +subjectId, formData});
      if (questionData.data.length) {
        setQuestionData((prevData) => {
          const { data: prevArray } = prevData;
          return { data: [response, ...prevArray] };
        });
      } else {
        setQuestionData({ data: [response] });
        setTotal(1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setActive(inputValue.trim() !== '');
  };

  return (
    <>
      <Styled.User>
        <span>To.</span>
        <ProfileImage src={subjectImg} size="xSmall" />
        <span>{subjectName}</span>
      </Styled.User>
      <Styled.Form>
        <InputTextArea onChange={handleInputChange} value={value} />
        <Styled.Button
          onClick={handleButtonClick}
          disabled={!active}
          active={active}
        >
          {active ? `질문 보내기` : ``}
        </Styled.Button>
      </Styled.Form>
    </>
  );
};

export default WriteQuestionModal;
