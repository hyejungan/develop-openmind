import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 767px) {
    gap: 30px;
  }
`;

export const cardSectionContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 0 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  @media (max-width: 1199px) {
    padding: 0 45px;
  }

  @media (max-width: 767px) {
    gap: 15px;
  }
`;

export const refContainer = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid none;
`;

export const AllDataLoadedMessage = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: green;
`;

export const ListPageHeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  @media (max-width: 767px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ListPageHeader = styled.h1`
  text-align: center;
  margin-bottom: 15px;

  @media (max-width: 767px) {
    font-size: 2.4rem;
  }
`;
