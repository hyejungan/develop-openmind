import { Link } from 'react-router-dom';
import { ProfileImage } from 'components';
import * as Styled from './StyleUserCard';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { SubjectDataType } from 'pages/HomePage';

function UserCard({ id, imageSource, name, questionCount } : SubjectDataType ) {
  const theme = useContext(ThemeContext);

  return (
    <Link to={`/post/${id}`}>
      <Styled.Container>
        <Styled.ProfileContainer>
          <ProfileImage src={imageSource} size="mediumLarge" mobileSize="mediumSmall" />
          <Styled.Name>{name}</Styled.Name>
        </Styled.ProfileContainer>
        <Styled.InfoContainer>
          <Styled.Div>
            <Styled.MessageIcon src={theme.icon} />
            <Styled.P>받은 질문</Styled.P>
          </Styled.Div>
          <Styled.P>{questionCount}개</Styled.P>
        </Styled.InfoContainer>
      </Styled.Container>
    </Link>
  );
}

export default UserCard;
