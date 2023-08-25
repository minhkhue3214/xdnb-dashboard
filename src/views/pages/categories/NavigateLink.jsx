import { Button, Typography } from 'antd';
import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { Modal } from '~/ui-component/molecules';
const { Link, Paragraph } = Typography;

const NavigateLinkModal = ({ open, setOpen, navigateLink }) => {
  // const { t } = useTranslation();

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <Modal
        open={open}
        onOpen={() => setOpen(!open)}
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
            <MaxLengthLink href={navigateLink} target="_blank">
              {navigateLink}
            </MaxLengthLink>
          </InputWrapper>

          <InputWrapper>
            <Label>Chia sẻ đường dẫn</Label>
            <MaxLengthParagraph copyable>{navigateLink}</MaxLengthParagraph>
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
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MaxLengthParagraph = styled(Paragraph)`
  width: 100%;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Label = styled.h4`
  position: relative;
  font-weight: 600;

  &.focused {
    color: #4096ff;
  }
`;
