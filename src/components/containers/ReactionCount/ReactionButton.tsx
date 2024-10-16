import { useState } from 'react';
import * as Style from './StyleReactionButton';
import ThumbsButton, { ThumbsButtonTypes } from 'components/common/ReactionButton/ThumbsButton';

export interface ReactionButtonTypes{
  like?: number;
  dislike ?: number;
  questionId: number;
};

const ReactionButton = ({ like, dislike, questionId}: ReactionButtonTypes) => {

  return (
    <Style.Container>
      <ThumbsButton
        reactionCount={like}
        questionId={questionId}
        type='좋아요'
      />
      <ThumbsButton
        reactionCount={dislike}
        questionId={questionId}
        type='싫어요'
      />
    </Style.Container>
  );
};

export default ReactionButton;
