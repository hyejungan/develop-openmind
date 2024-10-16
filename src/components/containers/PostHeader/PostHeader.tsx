import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getSubjects } from 'api/api';
import { ThemeContext } from 'styled-components';
import { ProfileImage, ButtonShare, AccountForm } from 'components';
import Modal from '../Modal/Modal';
import useModal from 'hooks/useModal';
import logoImg from 'assets/logo.svg';
import christmasLogoImg from 'assets/christmas-logo.png';
import * as Styled from './StylePostHeader';

type PostHeaderTypes = {
  id: string;
  setterSubjectName: React.Dispatch<React.SetStateAction<string>>;
  setterSubjectImg: React.Dispatch<React.SetStateAction<string>>;
  filter: boolean;
};

function PostHeader({
  id,
  setterSubjectName,
  setterSubjectImg,
  filter,
}: PostHeaderTypes) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAnswerPage = location.pathname.split('/')[3];
  const { isOpen, openModal, closeModal } = useModal();
  const option = { center: true };
  const [subjectName, setSubjectName] = useState('');
  const [subjectImg, setSubjectImg] = useState('');
  const theme = useContext(ThemeContext);

  const getSubjectInfo = async (subjectId: string) => {
    try {
      const result = await getSubjects({ id: subjectId });
      const { name, imageSource } = result;
      setSubjectName(name);
      setSubjectImg(imageSource);
      setterSubjectName(name);
      setterSubjectImg(imageSource);
    } catch (err) {
      console.log(err);
      navigate(`/InvalidQuestionSubject`);
    }
  };

  useEffect(() => {
    getSubjectInfo(id);
  }, [id]);

  return (
    <>
      <Styled.Header>
        <Styled.Container>
          <Link to={'/'}>
            <Styled.Logo src={theme.snow ? christmasLogoImg : logoImg} />
          </Link>
          <ProfileImage
            src={subjectImg}
            size="xLarge"
            mobileSize="large"
            onClick={isAnswerPage ? openModal : closeModal}
            filter={isAnswerPage && filter ? 'true' : 'false'}
          />
          <Styled.Name>{subjectName}</Styled.Name>
          <ButtonShare name={subjectName} image={subjectImg} />
        </Styled.Container>
      </Styled.Header>
      {isOpen && (
        <Modal
          title="계정 관리"
          trigger={
            <AccountForm image={subjectImg} name={subjectName} id={id} />
          }
          option={option}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default PostHeader;
