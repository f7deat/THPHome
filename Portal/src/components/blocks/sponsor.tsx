import { queryBlock } from '@/services/block';
import { PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Badge, Button, Image, Upload, message } from 'antd';
import { useEffect, useState } from 'react';

type Props = {
  id: string;
};

const SponsorBlock: React.FC<Props> = ({ id }) => {
  const [sponsors, setSponsors] = useState<{ logo: string; link: string }[]>(
    [],
  );
  const [fileList, setFileList] = useState<any>([]);
  const form = ProForm.useFormInstance();

  useEffect(() => {
    if (id) {
      queryBlock(id).then((response) => {
        form.setFields([
          { name: 'label', value: response.label },
          { name: 'className', value: response.className },
          { name: 'autoPlay', value: response.autoPlay },
          { name: 'speed', value: response.speed },
        ]);
        setSponsors(response.sponsors || []);
      });
    }
  }, [id]);

  useEffect(() => {
    setFileList([]);
  }, [form]);

  return (
    <>
      <ProFormDigit name="autoPlay" label="Auto Play" />
      <ProFormDigit name="speed" label="Speed" />
      <ProFormText name="sponsors" hidden />
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
                    form.setFieldValue('sponsors', updatedSponsors);
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
                  form.setFieldValue('sponsors', updatedSponsors);
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
              form.setFieldValue('sponsors', newSponsors);
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
