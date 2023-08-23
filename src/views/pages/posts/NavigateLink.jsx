import { Button, Typography } from 'antd';
import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { Modal } from '~/ui-component/molecules';
const { Link, Paragraph } = Typography;

const NavigateLinkModal = ({ open, setOpen }) => {
  // const { t } = useTranslation();

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        title="Đường dẫn bài viết"
        onCancel={handleCancel}
        width="650px"
        footer={[
          <Button key="ok" type="primary" onClick={() => handleCancel()}>
            OK
          </Button>
        ]}
      >
        <EditUserWrapper>
          <InputWrapper>
            <Label>Truy cập tới đường dẫn</Label>
            <MaxLengthLink href="https://www.youtube.com/watch?v=ba7mB8oueCY&list=RDquv06q2u3LA&index=3" target="_blank">
              https://www.youtube.com/watch?v=ba7mB8oueCY&list=RDquv06q2u3LA&index=3
            </MaxLengthLink>
          </InputWrapper>

          <InputWrapper>
            <Label>Chia sẻ đường dẫn</Label>
            <MaxLengthParagraph copyable>https://www.youtube.com/watch?v=ba7mB8oueCY&list=RDquv06q2u3LA&index=3</MaxLengthParagraph>
          </InputWrapper>
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(NavigateLinkModal);

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
  height: fit-content;
  position: relative;
  overflow: hidden;

  &.hidden {
    visibility: hidden;
  }

  &.none {
    display: none;
  }
`;

const EditUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const MaxLengthLink = styled(Link)`
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MaxLengthParagraph = styled(Paragraph)`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Label = styled.label`
  position: relative;
  font-weight: 600;

  &.focused {
    color: #4096ff;
  }
`;
