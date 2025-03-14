import { Button } from "antd";
import { history, useModel } from "@umijs/max";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { LeftOutlined } from "@ant-design/icons";
import ProFileInfo from "./profile/components/info";
import ForeignLanguageProficiency from "./profile/components/foreign-language-proficiency";
import EducationHistoryTab from "./profile/components/education-history";
import { AwardTab } from "./profile/components";

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
                            key: 'education',
                            label: 'Quá trình đào tạo',
                            children: <EducationHistoryTab />
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
                            key: 'adward',
                            label: 'Giải thưởng',
                            children: <AwardTab />
                        }
                    ]
                }}
            />
        </PageContainer>
    )
}

export default UserEdit