import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import createPageArray from './createPageArray';
import { ReactComponent as ArrowLeft } from 'assets/double-arrow-left.svg';
import { ReactComponent as ArrowRight } from 'assets/double-arrow-right.svg';
import * as Styled from './StylePageButton';

type PaginationTypes = {
  total: number;
  onClick: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  width: number;
  sorted: string; //TODO : QuestionListPage 모듈의 querystring 확인하고 type strict하게 변경해주기
};

const Pagination = ({
  total,
  onClick,
  limit,
  width,
  sorted,
}: PaginationTypes) => {
  const location = useLocation();
  const pageNum = +location.pathname.split('/')[2];
  const [num, setNum] = useState(pageNum);
  const TOTAL_PAGE = Math.ceil(total / limit);

  let arrLen = width > 767 ? 7 : 5;
  let pageArr = createPageArray(TOTAL_PAGE, pageNum, arrLen);

  const handleButtonClick = (num: number) => {
    onClick(limit * (num - 1));
    setNum(num);
  };
  useEffect(() => {
    onClick(limit * (pageNum - 1));
    setNum(pageNum);
  }, [location]);

  return (
    <Styled.PaginationBox>
      {pageArr[0] !== 1 && (
        <Link to={`/list/${1}/${sorted}`}>
          <ArrowLeft width="16" height="16" />
        </Link>
      )}
      {pageArr.map((item, index) => {
        return (
          <Link to={`/list/${item}/${sorted}`} key={index}>
            <Styled.PageButton
              onClick={() => handleButtonClick(item)}
              select={num === item ? 'selected' : 'unselected'}
            >
              {String(item)}
            </Styled.PageButton>
          </Link>
        );
      })}
      {pageArr[arrLen - 1] !== TOTAL_PAGE && (
        <Link to={`/list/${TOTAL_PAGE}/${sorted}`}>
          <ArrowRight width="16" height="16" />
        </Link>
      )}
    </Styled.PaginationBox>
  );
};

export default Pagination;
