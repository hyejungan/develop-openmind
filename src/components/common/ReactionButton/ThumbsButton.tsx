import { useState } from 'react';
import { postReactionOnQuestion } from 'api/api';
import { ReactComponent as ThumbsUp } from 'assets/icon/thumbs-up.svg';
import * as Style from './StyleThumbsButton';

export type ThumbsButtonTypes = {
  type : '좋아요' | '싫어요';
  number?: number;
  questionId?: number;
  onClick?: () => void;
  active?: number;
};

const ThumbsButton = ({ number, questionId, type }: ThumbsButtonTypes) => {
  const [likeNumber, setLikeNumber] = useState(number);
  const [active, setActive] = useState<'gray' | 'blue' | 'red'>('gray');

  const handleActiveClick = async () => {
    setActive('blue');
    try {
      const formData = JSON.stringify({
        type: 'like',
      });
      const result = await postReactionOnQuestion({ questionId, formData });
      setLikeNumber(result.like);
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
      <ThumbsUp fill={active === 'blue' ? 'var(--blue)' : 'var(--gray40)'} />
      <span>{type} {likeNumber}</span>
    </Style.Container>
  );
};

export default ThumbsButton;
