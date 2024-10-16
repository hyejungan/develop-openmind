import ThumbsButton from 'components/common/ReactionButton/ThumbsButton';
import * as Style from './StyleReactionButton';

export interface ReactionButtonTypes {
  like?: number;
  dislike?: number;
  questionId: number;
}

const ReactionButton = ({ like, dislike, questionId }: ReactionButtonTypes) => {
  return (
    <Style.Container>
      <ThumbsButton reactionCount={like} questionId={questionId} type="like" />
      <ThumbsButton
        reactionCount={dislike}
        questionId={questionId}
        type="dislike"
      />
    </Style.Container>
  );
};

export default ReactionButton;
