import { Button } from "antd";
import { history, useModel } from "@umijs/max";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { LeftOutlined } from "@ant-design/icons";
import ProFileInfo from "./profile/components/info";
import ForeignLanguageProficiency from "./profile/components/foreign-language-proficiency";

const UserEdit = () => {

    const { initialState } = useModel('@@initialState');

    return (
        <PageContainer title={initialState?.currentUser?.name} extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProCard
                tabs={{
                    items: [
                        {
                            key: 'general',
                            label: 'Thông tin chung',
                            children: <ProFileInfo />
                        },
                        {
                            key: 'detail',
                            label: 'Thông tin cá nhân'
                        },
                        {
                            key: 'education',
                            label: 'Quá trình đào tạo'
                        },
                        {
                            key: 'language',
                            label: 'Ngoại ngữ',
                            children: <ForeignLanguageProficiency />
                        },
                        {
                            key: 'working-experience',
                            label: 'Quá trình công tác'
                        },
                        {
                            key: 'teaching-experience',
                            label: 'Quá trình giảng dạy'
                        },
                        {
                            key: 'adward',
                            label: 'Giải thưởng'
                        }
                    ]
                }}
            />
        </PageContainer>
    )
}

export default UserEdit