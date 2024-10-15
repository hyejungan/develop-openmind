import { useState, useEffect, useCallback, useRef } from 'react';
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
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const sort = location.pathname.split('/')[3];
  const { width: browserWidth } = useWindowSizeCustom();
  const { isOpen, closeModal, openModal } = useModal();
  const option = { center: true, smallContainer: true };
  const [limit, setLimit] = useState(null);
  const [scrollLimit, setScrollLimit] = useState(null);
  const offsetRef = useRef(0);
  const [total, setTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subjectData, setSubjectData] = useState([]);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

  const handleCardSection = async (args: Partial<GetSubjectsTypes>) => {
    console.log(1);
    setIsLoading(true);
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

  const fetchAdditionalData = async (
    additionalLimit: number,
    currentOffset: number
  ) => {
    console.log(2);
    await handleCardSection({
      id: null,
      limit: additionalLimit,
      offset: currentOffset.toString(),
      sort,
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      console.log(3);
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          offsetRef.current += scrollLimit;
          handleCardSection({
            id: null,
            limit: scrollLimit,
            offset: offsetRef.current.toString(),
            sort,
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  useEffect(() => {
    console.log(4);
    if (ref.current) {
      io.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        io.unobserve(ref.current);
      }
    };
  }, [ref.current, scrollLimit]);

  const handleNavClick = () => {
    if (checkLocalStorage()) {
      openModal();
    } else {
      navigate('/');
    }
  };

  // 화면 크기 변경 감지 및 처리
  useEffect(() => {
    console.log(5);
    if (browserWidth) {
      console.log(6);
      const newLimit = browserWidth >= 910 ? 10 : 7;
      const newScrollLimit = browserWidth >= 910 ? 8 : 6;

      // 첫 렌더링 시
      if (!initialLoadComplete) {
        console.log(7);
        setLimit(newLimit);
        setScrollLimit(newScrollLimit);
        handleCardSection({
          id: null,
          limit: newLimit,
          offset: '0',
          sort,
        });
        setInitialLoadComplete(true); // 첫 로딩 완료 표시
      } else {
        console.log(8);
        // 첫 렌더링 이후: 화면 크기가 변경되었을 때만 추가 데이터 로딩
        if (subjectData.length < newLimit) {
          const additionalLimit = newLimit - subjectData.length;
          fetchAdditionalData(additionalLimit, subjectData.length);
        }
      }
      setLimit(newLimit);
      setScrollLimit(newScrollLimit);
    }
  }, [browserWidth]);

  useEffect(() => {
    console.log(9);
    setSubjectData([]); // 기존 데이터 초기화
    offsetRef.current = 0; // offset을 0으로 리셋
    setInitialLoadComplete(false); 
    handleCardSection({
      id: null,
      limit,
      offset: offsetRef.current.toString(),
      sort, // 정렬 기준 변경에 따라 데이터 다시 로드
    });
  }, [sort]);

  useEffect(() => {
    console.log(10);
    if (limit !== null && offsetRef.current !== 0 && initialLoadComplete && subjectData.length < total) {
      console.log(11);
      handleCardSection({
        id: null,
        limit: scrollLimit, // 스크롤 시에는 scrollLimit 적용
        offset: offsetRef.current.toString(),
        sort,
      });
    } else if (total !== null && subjectData.length >= total) {
      console.log(12);
      setIsAllDataLoaded(true);
    }
  }, [sort, scrollLimit]);

  return (
    <>
      <Styled.PageContainer>
        <NavBar onClick={handleNavClick}>답변하러 가기</NavBar>
        <Styled.cardSectionContainer>
          <Styled.ListPageHeaderBox>
            <Styled.ListPageHeader>누구에게 질문할까요?</Styled.ListPageHeader>
            <DropDown offset={offsetRef.current} limit={limit} sorted={sort} />
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
        {!isLoading &&
          (isAllDataLoaded ? ( // 모든 데이터를 불러왔을 때 메시지 표시
            <Styled.AllDataLoadedMessage>
              모든 데이터를 불러왔습니다:)
            </Styled.AllDataLoadedMessage>
          ) : (
            <Styled.refContainer ref={ref} />
          ))}
      </Styled.PageContainer>
    </>
  );
};

export default QuestionListPage;
