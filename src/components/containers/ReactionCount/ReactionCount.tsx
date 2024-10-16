import { useState } from 'react';
import * as Style from './StyleReactionCount';
import ThumbsButton from 'components/common/ReactionButton/ThumbsButton';
import ThumbsDownButton from 'components/common/ReactionButton/ThumbsDownButton';

const ReactionButton = () => {
  const [counting, setCounting] = useState({ up: null, down: null });

  const handleCount = (type: 'up' | 'down') => {
    if (!counting[type]) {
      setCounting((prevCounting) => ({ ...prevCounting, [type]: 1 }));
    } else {
      setCounting((prevCounting) => ({ ...prevCounting, [type]: null }));
    }
  };

  return (
    <Style.Container>
      <ThumbsButton
        onClick={() => {
          handleCount('up');
        }}
        active={counting.up}
        type='좋아요'
      />
      <ThumbsButton
        onClick={() => {
          handleCount('down');
        }}
        active={counting.down}
        type='싫어요'
      />
    </Style.Container>
  );
};

export default ReactionButton;
