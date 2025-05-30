﻿import { Button } from "antd";
import { history, useModel } from "@umijs/max";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { LeftOutlined } from "@ant-design/icons";
import ProFileInfo from "./profile/components/info";
import ForeignLanguageProficiency from "./profile/components/foreign-language-proficiency";
import EducationHistoryTab from "./profile/components/education-history";
import { AchievementTab, AwardTab, BookTab, JournalTab, ResearchProjectTab, TeachingExperienceTab, WorkingExperienceTab } from "./profile/components";

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
                            key: 'working-experience',
                            label: 'Quá trình công tác',
                            children: <WorkingExperienceTab />
                        },
                        {
                            key: 'teaching-experience',
                            label: 'Kinh nghiệm giảng dạy',
                            children: <TeachingExperienceTab />
                        },
                        {
                            key: 'language',
                            label: 'Ngoại ngữ',
                            children: <ForeignLanguageProficiency />
                        },
                        {
                            key: 'research-project',
                            label: 'Nghiên cứu khoa học',
                            children: <ResearchProjectTab />
                        },
                        {
                            key: 'journal',
                            label: 'Bài báo - Tạp chí',
                            children: <JournalTab />
                        },
                        {
                            key: 'book',
                            label: 'Sách - Giáo trình',
                            children: <BookTab />
                        },
                        {
                            key: 'adward',
                            label: 'Giải thưởng',
                            children: <AwardTab />
                        },
                        {
                            key: 'achievement',
                            label: 'Thành tựu',
                            children: <AchievementTab />
                        }
                    ]
                }}
            />
        </PageContainer>
    )
}

export default UserEdit