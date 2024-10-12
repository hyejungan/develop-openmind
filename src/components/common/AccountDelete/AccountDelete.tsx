import * as Style from './StyleAccountDelete';

type VisibleType = {
  boolean: boolean;
  message: string;
};

type AccountDeleteTypes = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  visible: VisibleType;
  setVisible: React.Dispatch<React.SetStateAction<VisibleType>>;
};

const AccountDelete = ({
  onClick,
  visible,
  setVisible,
}: AccountDeleteTypes) => {
  const onClose = () => {
    setVisible((prev) => ({ ...prev, boolean: false }));
  };

  return (
    <>
      {visible.boolean && (
        <Style.Container>
          {visible.message}
          <Style.Box>
            <Style.Button onClick={onClick}>확인</Style.Button>
            <Style.Button onClick={onClose}>취소</Style.Button>
          </Style.Box>
        </Style.Container>
      )}
    </>
  );
};

export default AccountDelete;
