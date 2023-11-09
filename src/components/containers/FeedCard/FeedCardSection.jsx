import { AnswerFeedCard } from 'components';
import { ReactComponent as MessageImg } from 'assets/icon/messages.svg';
import * as Styled from './StyleFeedCardSection';

const FeedCardSection = ({ total, data }) => {
  return (
    <Styled.CardContainer>
      <Styled.CountContainer>
        <MessageImg width="24" height="25" fill="#542F1A" />
        <Styled.CountContent>{total}개의 질문이 있습니다.</Styled.CountContent>
      </Styled.CountContainer>
      {data.map((data) => {
        return <AnswerFeedCard key={data.id} data={data} />;
      })}
    </Styled.CardContainer>
  );
};

export default FeedCardSection;
