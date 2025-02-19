import { PlusOutlined } from '@ant-design/icons';
import { DrawerForm, DrawerFormProps, ProFormDigit, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Badge, Button, Col, Divider, Image, Row, Upload, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

type Props = DrawerFormProps & {
  data?: any;
};

const SponsorBlock: React.FC<Props> = (props) => {
  const [sponsors, setSponsors] = useState<{ logo: string; link: string }[]>(
    [],
  );
  const [fileList, setFileList] = useState<any>([]);
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (props.data) {
      formRef.current?.setFields([
        { name: 'label', value: props.data?.label },
        { name: 'className', value: props.data?.className },
        { name: 'delay', value: props.data?.autoPlay?.delay },
        { name: 'speed', value: props.data?.speed },
      ]);
      setSponsors(props.data?.sponsors || []);
    }
  }, [props.data]);

  useEffect(() => {
    setFileList([]);
  }, [props.data]);

  return (
    <DrawerForm {...props} formRef={formRef} onFinish={async (values) => {
      values.autoPlay.delay = values.delay;
      props.onFinish?.(values);
    }}>
      <Divider orientation="left">Auto Play</Divider>
      <Row gutter={16}>
        <Col span={12}>
          <ProFormDigit name="delay" label="Delay" />
        </Col>
        <Col span={12}>
          <ProFormDigit name="speed" label="Speed" />
        </Col>
      </Row>
      <ProFormText name="sponsors" hidden />
      <Divider orientation="left">Logo</Divider>
      <div className="flex gap-4" style={{ gap: 8, flexWrap: 'wrap' }}>
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
                    formRef.current?.setFieldValue('sponsors', updatedSponsors);
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
                width={90}
                height={90}
                style={{
                  borderRadius: 8,
                  objectFit: 'cover',
                }}
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
                  formRef.current?.setFieldValue('sponsors', updatedSponsors);
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
              formRef.current?.setFieldValue('sponsors', newSponsors);
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
    </DrawerForm>
  );
};

export default SponsorBlock;
