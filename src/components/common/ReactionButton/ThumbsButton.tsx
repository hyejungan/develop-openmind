import { useState } from 'react';
import { postReactionOnQuestion } from 'api/api';
import { ReactComponent as ThumbsUp } from 'assets/icon/thumbs-up.svg';
import * as Style from './StyleThumbsButton';

export interface ThumbsButtonTypes {
  reactionCount : number;
  questionId: number;
  type: '좋아요' | '싫어요';
  onClick?: () => void;
}

const ThumbsButton = ({ reactionCount, questionId, type, onClick}: ThumbsButtonTypes) => {
  const [likeNumber, setLikeNumber] = useState(reactionCount);
  const [active, setActive] = useState<'gray' | 'blue' | 'red'>('gray');
  const [counting, setCounting] = useState({ up: null, down: null });

  const handleCount = (type: 'up' | 'down') => {
    if (!counting[type]) {
      setCounting((prevCounting) => ({ ...prevCounting, [type]: 1 }));
    } else {
      setCounting((prevCounting) => ({ ...prevCounting, [type]: null }));
    }
  };

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
      <span>
        {type} {likeNumber}
      </span>
    </Style.Container>
  );
};

export default ThumbsButton;
