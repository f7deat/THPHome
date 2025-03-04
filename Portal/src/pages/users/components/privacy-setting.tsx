import { request } from "@umijs/max";
import { Button, Space, Typography } from "antd"

const PrivacySetting: React.FC = () => {

    const downloadPersonalData = () => {
        request(`user/download-personal-data`, {
            responseType: 'blob',
            method: 'POST'
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'personalData.json');
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
    }

    return (
        <div>
            <div className="mb-2">
                <Typography.Title level={5}>Disable 2FA</Typography.Title>
                <div className="mb-2">
                    Disabling 2FA does not change the keys used in authenticator apps. If you wish to change the key
                    used in an authenticator app you should <a href="./ResetAuthenticator">reset your authenticator keys.</a>
                </div>
                <Button type="primary" danger>Disable 2FA</Button>
            </div>
            <div className="mb-2">
                <Typography.Title level={5}>Delete account</Typography.Title>
                <div className="mb-2">Deleting this data will permanently remove your account, and this cannot be recovered.</div>
                <Space>
                    <Button type="primary" onClick={downloadPersonalData}>Download my data</Button>
                    <Button type="primary" danger>Delete data and close my account</Button>
                </Space>
            </div>

        </div>
    )
}

export default PrivacySetting