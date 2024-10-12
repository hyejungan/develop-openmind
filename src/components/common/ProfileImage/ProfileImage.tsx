import * as Styled from './StyleProfileImage';

type ProfileImageTypes = {
  src: string;
  size?: 'xLarge' | 'mediumLarge' | 'mediumSmall' | 'xSmall';
  mobileSize?: 'large' | 'mediumSmall';
  onClick?: () => void;
  filter?: boolean;
};

function ProfileImage({
  src,
  size,
  mobileSize,
  onClick,
  filter,
}: ProfileImageTypes) {
  return (
    <Styled.Container
      size={size}
      mobileSize={mobileSize}
      onClick={onClick}
      filter={filter}
    >
      <Styled.Img src={src} alt="프로필이미지" />
    </Styled.Container>
  );
}

export default ProfileImage;
