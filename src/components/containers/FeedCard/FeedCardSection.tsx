import { useContext } from 'react';
import { AnswerFeedCard, NoQuestionBox } from 'components';
import { ReactComponent as MessageImg } from 'assets/icon/messages.svg';
import { ReactComponent as SantaImg } from 'assets/santa.svg';
import * as Styled from './StyleFeedCardSection';
import { ThemeContext } from 'styled-components';

export interface CardSectionAnswerType {
  id : number;
  questionId : number;
  content : string;
  isRejected : boolean;
  createdAt : string;
}

export interface getCardSectionType {
  id : number;
  subjectId : number;
  content : string;
  like : number;
  dislike : number;
  createdAt : string;
  answer : CardSectionAnswerType;
}

type FeedCardSectionTypes = {
  total : any;
  data : getCardSectionType[];
  subjectData : string[];
  setTotal : React.Dispatch<any>;
  setQuestionData : React.Dispatch<React.SetStateAction<{
    data: any[];
}>>;
}

const FeedCardSection = ({
  total,
  data,
  subjectData,
  setTotal,
  setQuestionData,
} : FeedCardSectionTypes) => {
  const theme = useContext(ThemeContext);

  return (
    <Styled.CardContainer>
      <Styled.CountContainer>
        {theme.snow ? (
          <SantaImg />
        ) : (
          <MessageImg width="24" height="25" fill="#542F1A" />
        )}
        <Styled.CountContent>
          {total ? `${total}개의 질문이 있습니다` : `아직 질문이 없습니다`}
        </Styled.CountContent>
      </Styled.CountContainer>
      {total ? null : <NoQuestionBox />}
      {data.map((data : getCardSectionType ) => {
        return (
          <AnswerFeedCard
            key={data.id}
            data={data}
            subjectData={subjectData}
            setTotal={setTotal}
            setQuestionData={setQuestionData}
          />
        );
      })}
    </Styled.CardContainer>
  );
};

export default FeedCardSection;
