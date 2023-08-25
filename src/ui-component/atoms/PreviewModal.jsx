import { Button, Tabs } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '~/ui-component/molecules';
// import styled from 'styled-components';
import { DesktopOutlined, LaptopOutlined, MobileOutlined, TabletOutlined } from '@ant-design/icons';

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

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: (
        <>
          <MobileOutlined />
          Mobile
        </>
      ),
      children: (
        <div
          style={{
            width: '375px',
            height: '667px',
            border: '1px solid #000',
            overflow: 'auto'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: previewValue }} />
        </div>
      )
    },
    {
      key: '2',
      label: (
        <>
          <TabletOutlined />
          Tablet
        </>
      ),
      children: (
        <div
          style={{
            width: '820px',
            height: '1180px',
            border: '1px solid #000',
            overflow: 'auto'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: previewValue }} />
        </div>
      )
    },
    {
      key: '3',
      label: (
        <>
          <LaptopOutlined />
          Laptop
        </>
      ),
      children: (
        <div
          style={{
            width: '1280px',
            height: '720px',
            border: '1px solid #000',
            overflow: 'auto'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: previewValue }} />
        </div>
      )
    },
    {
      key: '4',
      label: (
        <>
          <DesktopOutlined />
          Desktop
        </>
      ),
      children: (
        <div
          style={{
            width: '1920px',
            height: '1080px',
            border: '1px solid #000',
            overflow: 'auto'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: previewValue }} />
        </div>
      )
    }
  ];

  return (
    <>
      <Modal
        title={t('modal.post.previewModal')}
        open={open}
        onOpen={setOpen}
        width="cover"
        height="cover"
        footer={[
          <Button key="2" danger onClick={handleCancel}>
            {t('modal.post.cancel')}
          </Button>
        ]}
      >
        <Tabs
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px',
            width:"100%",
            height:"100%"
          }}
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </Modal>
    </>
  );
};

export default memo(AtomPreviewModal);
