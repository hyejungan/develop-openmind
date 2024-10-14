import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  NavBar,
  DropDown,
  UserCardSection,
  Pagination,
  ModalLoading,
  Modal,
  CheckAccount,
} from 'components';
import { getSubjects } from 'api/api';
import useWindowSizeCustom from 'hooks/useWindowSize';
import useModal from 'hooks/useModal';
import { checkLocalStorage } from 'utils/localStorage';
import * as Styled from './StyleQuestionListPage';

type GetSubjectsTypes = {
  id: string | null;
  limit: number;
  offset: string;
  sort: string;
};

const QuestionListPage = () => {
  const navigate = useNavigate();
  const sorted = useLocation().pathname.split('/')[3];
  const { width: browserWidth } = useWindowSizeCustom();
  const { isOpen, closeModal, openModal } = useModal();
  const option = { center: true, smallContainer: true };
  const [limit, setLimit] = useState(null);
  const [scrollLimit, setScrollLimit] = useState(null);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subjectData, setSubjectData] = useState([]);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  console.log(subjectData);
  console.log(limit, scrollLimit);

  const handleCardSection = async (args: Partial<GetSubjectsTypes>) => {
    setIsLoading(true);
    console.log(args);
    try {
      const { results: data, count } = await getSubjects({ ...args });
      setSubjectData((prevData) => {
        const newData = data.filter(
          (newItem: GetSubjectsTypes) =>
            !prevData.some((prevItem) => prevItem.id === newItem.id)
        );
        return [...prevData, ...newData];
      });
      setTotal(count);
    } catch (err) {
      console.error(err);
      navigate('/FailToLoadData');
    } finally {
      setIsLoading(false);
    }
  };
  const handleScroll = useCallback(() => {
    const { innerHeight, scrollY } = window;

    if (innerHeight + scrollY >= document.body.offsetHeight && !isLoading) {
      setOffset((prevOffset) => prevOffset + scrollLimit);
    }
  }, [isLoading]);

  const handleNavClick = () => {
    if (checkLocalStorage()) {
      openModal();
    } else {
      navigate('/');
    }
  };

  const fetchAdditionalData = async (
    additionalLimit: number,
    currentOffset: number
  ) => {
    await handleCardSection({
      id: null,
      limit: additionalLimit,
      offset: currentOffset.toString(),
      sort: sorted,
    });
  };

  // 화면 크기 변경 감지 및 처리
  useEffect(() => {
    if (browserWidth) {
      const newLimit = browserWidth >= 910 ? 10 : 7;
      const newScrollLimit = browserWidth >= 910 ? 8 : 6;

      // 첫 렌더링 시
      if (!initialLoadComplete) {
        setLimit(newLimit);
        setScrollLimit(newScrollLimit);
        handleCardSection({
          id: null,
          limit: newLimit,
          offset: '0',
          sort: sorted,
        });
        setInitialLoadComplete(true); // 첫 로딩 완료 표시
      } else {
        // 첫 렌더링 이후: 화면 크기가 변경되었을 때만 추가 데이터 로딩
        if (subjectData.length < newLimit) {
          const additionalLimit = newLimit - subjectData.length;
          fetchAdditionalData(additionalLimit, subjectData.length);
        }
      }

      // 화면 크기 변경에 따라 limit, scrollLimit 업데이트
      setLimit(newLimit);
      setScrollLimit(newScrollLimit);
    }
  }, [browserWidth]);

  useEffect(() => {
    if (limit !== null && offset > 0) {
      handleCardSection({
        id: null,
        limit: scrollLimit, // 스크롤 시에는 scrollLimit 적용
        offset: offset.toString(),
        sort: sorted,
      });
    }
  }, [sorted, offset, limit, scrollLimit]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // 언마운트 시 이벤트 해제
    };
  }, [handleScroll]);

  return (
    <>
      <Styled.PageContainer>
        <NavBar onClick={handleNavClick}>답변하러 가기</NavBar>
        <Styled.cardSectionContainer>
          <Styled.ListPageHeaderBox>
            <Styled.ListPageHeader>누구에게 질문할까요?</Styled.ListPageHeader>
            <DropDown offset={offset} limit={limit} sorted={sorted} />
          </Styled.ListPageHeaderBox>
          <UserCardSection data={subjectData} />
        </Styled.cardSectionContainer>
        {isOpen && (
          <Modal
            title="계정이 있으신가요?"
            trigger={<CheckAccount />}
            option={option}
            closeModal={closeModal}
          />
        )}
        {isLoading && <ModalLoading />}
      </Styled.PageContainer>
    </>
  );
};

export default QuestionListPage;

// console.log('window.innerHeight : ', window.innerHeight);
//     console.log('window.scrollY : ', window.scrollY);
//     console.log('window.scrollTop : ', document.documentElement.scrollTop);
//     console.log('document.body.offsetHeight :', document.documentElement.offsetHeight);
//     console.log('document.documentElement.scrollHeight:', document.documentElement.scrollHeight);
