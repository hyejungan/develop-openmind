const REACTION_TYPE = {
  like: '좋아요',
  dislike: '싫어요',
};

// 반응 타입별 색상 매핑
const REACTION_COLOR : Record<'like' | 'dislike', 'blue' | 'red'> = {
  like: 'blue',
  dislike: 'red',
};

// CSS 변수로 버튼 색상 정의
const BUTTON_COLOR = {
  gray: `var(--gray40)`,
  blue: `var(--blue)`,
  red: `var(--red)`,
};

export { REACTION_TYPE, REACTION_COLOR, BUTTON_COLOR };
