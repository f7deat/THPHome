import { PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Button, Image, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { BlockProps } from './typings';

const PopupBlock: React.FC<BlockProps> = (props) => {
  const formRef = ProForm.useFormInstance();
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (props.data) {
      formRef?.setFields([
        { name: 'Url', value: props.data?.url },
        { name: 'Image', value: props.data?.image },
      ]);
      setImageUrl(props.data?.image || '');
    }
  }, [props.data, formRef]);

  return (
    <>
      <ProFormText
        name="Url"
        label="Url"
        placeholder="Nhập Url"
      />
      <ProFormText
        name="Image"
        hidden
      />
      <div className="mb-4">
        <div style={{ marginBottom: 8 }}>Image</div>
        {imageUrl ? (
          <div
            className="relative inline-block"
            style={{
              border: '1px solid #d1d1d1',
              borderRadius: 8,
              padding: 4,
            }}
          >
            <Button
              onClick={() => {
                setImageUrl('');
                formRef.setFieldValue('Image', '');
              }}
              type="primary"
              danger
              size="small"
              style={{ position: 'absolute', top: 5, right: 5, zIndex: 10 }}
            >
              Xóa
            </Button>
            <Image
              src={imageUrl}
              alt="Popup"
              height={150}
              style={{
                borderRadius: 8,
                objectFit: 'contain',
              }}
            />
          </div>
        ) : (
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
                setImageUrl(response.url);
                formRef.setFieldValue('Image', response.url);
              });
              return false;
            }}
            listType="picture-card"
            showUploadList={false}
          >
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        )}
      </div>
    </>
  );
};

export default PopupBlock;
