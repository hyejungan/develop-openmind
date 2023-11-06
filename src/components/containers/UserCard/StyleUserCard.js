import styled from 'styled-components';

/* PC: 1200px 이상
Tablet: 768px 이상 ~ 1199px 이하
Mobile: 767px 이하*/

export const MessageIcon = styled.img`
  width: 18px;
  height: 18px;

  @media (max-width: 767px) {
    width: 16px;
    height: 16px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
  max-width: 220px;
  height: 187px;
  padding: 20px;
  border: 1px solid var(--gray40);
  border-radius: 16px;
  background: var(--gray10);

  @media (max-width: 767px) {
    padding: 16px;
  }
`;

export const Name = styled.p`
  font-family: Actor;
  font-size: 2rem;
  line-height: 2.5rem;
  color: var(--gray60);

  @media (max-width: 767px) {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
`;

export const P = styled.p`
  font-size: 1.6rem;
  line-height: 2.2rem;
  color: var(--gray40);
  white-space: nowrap;

  @media (max-width: 767px) {
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Section = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(4, minmax(186px, auto));
  gap: 20px;
`;
