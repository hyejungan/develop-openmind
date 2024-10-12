import { ProfileImage } from 'components';
import { timeForToday } from 'utils/moment';
import * as Styled from './StyleAnswerForm';
import { CardSectionAnswerType } from '../FeedCard/FeedCardSection';

type AnswerFormTypes = {
  subjectImg: string;
  subjectName: string;
  data: CardSectionAnswerType;
};

const AnswerForm = ({ subjectImg, subjectName, data }: AnswerFormTypes) => {
  const { content, isRejected, createdAt } = data;
  return (
    <Styled.AnswerContainer>
      <ProfileImage src={subjectImg} size="mediumSmall" />
      <Styled.AnswerBox>
        <Styled.AnswerProfile>
          <Styled.AnswerName>{subjectName}</Styled.AnswerName>
          <Styled.AnswerDate>{timeForToday(createdAt)}</Styled.AnswerDate>
        </Styled.AnswerProfile>
        {isRejected ? (
          <Styled.RefuseContent>답변 거절</Styled.RefuseContent>
        ) : (
          <Styled.AnswerContent>{content}</Styled.AnswerContent>
        )}
      </Styled.AnswerBox>
    </Styled.AnswerContainer>
  );
};

export default AnswerForm;
