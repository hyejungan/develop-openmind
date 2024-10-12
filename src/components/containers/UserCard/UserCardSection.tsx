import { UserCard } from 'components';
import * as Styled from './StyleUserCard';
import { SubjectDataType } from 'pages/HomePage';

type UserCardSectionData = {
  data : SubjectDataType[];
}

const UserCardSection = ({ data } : UserCardSectionData) => {
  return (
    <Styled.Section>
      {data.map((data) => {
        const { id, name, imageSource, questionCount } = data;
        return (
          <UserCard
            key={id}
            id={id}
            imageSource={imageSource}
            name={name}
            questionCount={questionCount}
          />
        );
      })}
    </Styled.Section>
  );
};

export default UserCardSection;
