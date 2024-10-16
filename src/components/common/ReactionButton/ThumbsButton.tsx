import { useState } from 'react';
import { postReactionOnQuestion } from 'api/api';
import { ReactComponent as ThumbsUp } from 'assets/icon/thumbs-up.svg';
import * as Style from './StyleThumbsButton';
import {
  BUTTON_COLOR,
  REACTION_COLOR,
  REACTION_TYPE,
} from 'constants/thumbsButton';

export interface ThumbsButtonTypes {
  reactionCount: number;
  questionId: number;
  type: 'like' | 'dislike';
}

const ThumbsButton = ({
  reactionCount,
  questionId,
  type,
}: ThumbsButtonTypes) => {
  const [count, setCount] = useState(reactionCount);
  const [active, setActive] = useState<'blue' | 'red' | 'gray'>(
    reactionCount ? REACTION_COLOR[type] : 'gray'
  );

  const handleActiveClick = async () => {
    try {
      const formData = JSON.stringify({ type });
      const result = await postReactionOnQuestion({ questionId, formData });
      setCount(result[type]);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setActive(REACTION_COLOR[type]);
      }, 300);
    }
  };

  return (
    <Style.Container active={active} onClick={handleActiveClick}>
      <ThumbsUp fill={BUTTON_COLOR[active]} />
      <span>
        {REACTION_TYPE[type]} {count}
      </span>
    </Style.Container>
  );
};

export default ThumbsButton;
