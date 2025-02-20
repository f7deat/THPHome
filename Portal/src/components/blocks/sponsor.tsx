import { PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Badge, Button, Col, Divider, Image, Row, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { BlockProps } from './typings';

const SponsorBlock: React.FC<BlockProps> = (props) => {
  const [sponsors, setSponsors] = useState<{ logo: string; link: string }[]>(
    [],
  );
  const [fileList, setFileList] = useState<any>([]);
  const formRef = ProForm.useFormInstance(); 

  useEffect(() => {
    console.log(formRef);
    if (props.data) {
      formRef?.setFields([
        { name: 'label', value: props.data?.label },
        { name: 'className', value: props.data?.className },
        { name: 'delay', value: props.data?.autoPlay?.delay },
        { name: 'speed', value: props.data?.speed },
        { name: 'items', value: props.data?.items },
      ]);
      setSponsors(props.data?.items || []);
    }
  }, [props.data]);

  const onDelayChange = (delay: number | null) => {
    console.log(delay)
    formRef.setFieldValue('autoPlay', {
      delay: delay,
    });
  }

  useEffect(() => {
    setFileList([]);
  }, [props.data]);

  return (
    <>
      <ProFormText name="items" hidden />
      <ProFormText name="autoPlay" hidden />
      <Divider orientation="left">Auto Play</Divider>
      <Row gutter={16}>
        <Col span={12}>
          <ProFormDigit name="deplay" label="Delay" fieldProps={{
            onChange: onDelayChange,
          }} />
        </Col>
        <Col span={12}>
          <ProFormDigit name="speed" label="Speed" />
        </Col>
      </Row>
      <Divider orientation="left">Logo</Divider>
      <div className="grid grid-cols-4 gap-4">
        {sponsors.map((sponsor, i) => (
          <div
            className="relative"
            key={i}
            style={{
              border: '1px solid #d1d1d1',
              borderRadius: 8,
              marginBottom: 8,
              padding: 4,
            }}
          >
            <Badge.Ribbon
              text={
                <Button
                  onClick={() => {
                    const updatedSponsors = sponsors.filter(
                      (_, index) => index !== i,
                    );
                    setSponsors(updatedSponsors);
                    formRef.setFieldValue('items', updatedSponsors);
                  }}
                  type="text"
                  size="small"
                  style={{ color: 'white' }}
                >
                  Xóa
                </Button>
              }
            >
              <Image
                src={sponsor.logo}
                alt="LOGO"
                height={90}
                style={{
                  borderRadius: 8,
                  objectFit: 'cover',
                }} className='w-full'
              />
            </Badge.Ribbon>
            <ProFormText
              name={`link-${i}`}
              label="Link"
              placeholder="Nhập link"
              initialValue={sponsor.link}
              fieldProps={{
                onChange: (e) => {
                  const updatedSponsors = [...sponsors];
                  updatedSponsors[i] = {
                    ...updatedSponsors[i],
                    link: e.target.value,
                  };
                  setSponsors(updatedSponsors);
                  formRef.setFieldValue('items', updatedSponsors);
                },
              }}
            />
          </div>
        ))}
        <Upload
          beforeUpload={(file) => {
            const isValid =
              file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isValid) {
              message.error('You can only upload JPG or PNG file!');
              return false;
            }
            const formData = new FormData();
            formData.append('file', file);
            request('file/upload', {
              method: 'POST',
              data: formData,
            }).then((response) => {
              if (!response.succeeded) {
                message.error(response.message);
                return false;
              }
              const newSponsors = [
                ...sponsors,
                { logo: response.url, link: '' },
              ];
              setSponsors(newSponsors);
              formRef.setFieldValue('items', newSponsors);
            });
            return false;
          }}
          listType="picture-card"
          fileList={fileList}
          onChange={({ fileList: newFileList }) => {
            setFileList([newFileList.pop()]);
          }}
        >
          <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </div>
    </>
  );
};

export default SponsorBlock;
