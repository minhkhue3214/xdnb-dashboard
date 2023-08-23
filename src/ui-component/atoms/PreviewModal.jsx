import { Button } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '~/ui-component/molecules';

dayjs.extend(utc);
dayjs.extend(timezone);

const AtomPreviewModal = ({ open, setOpen, previewValue }) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log('previewValue', previewValue);
  }, [previewValue]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <Modal
        title={t('modal.post.previewModal')}
        open={open}
        onOpen={setOpen}
        width="95%"
        footer={[
          <Button key="2" danger onClick={handleCancel}>
            {t('modal.post.cancel')}
          </Button>
        ]}
      >
        <div>
          <div dangerouslySetInnerHTML={{ __html: previewValue }} />
        </div>
      </Modal>
    </>
  );
};

export default memo(AtomPreviewModal);
