import { useState } from 'react';
import { postReactionOnQuestion } from 'api/api';
import { ReactComponent as ThumbsDown } from 'assets/icon/thumbs-down.svg';
import * as Style from './StyleThumbsButton';

export type ThumbsButtonTypes = {
  number?: number;
  questionId?: number;
  onClick?: () => void;
  active?: number;
};

const ThumbsDownButton = ({ number, questionId }: ThumbsButtonTypes) => {
  const [dislikeNumber, setDislikeNumber] = useState(number);
  const [active, setActive] = useState<'gray' | 'blue' | 'red'>('gray');

  const handleActiveClick = async () => {
    setActive('red');
    try {
      const formData = JSON.stringify({
        type: 'dislike',
      });
      const result = await postReactionOnQuestion({ questionId, formData });
      setDislikeNumber(result.dislike);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setActive('gray');
      }, 300);
    }
  };

  return (
    <Style.Container active={active} onClick={handleActiveClick}>
      <ThumbsDown fill={active === 'red' ? 'var(--red)' : 'var(--gray40)'} />
      <span>싫어요 {dislikeNumber}</span>
    </Style.Container>
  );
};

export default ThumbsDownButton;
