import { request } from "@umijs/max";

export async function apiLogin(data: any) {
    return request(`user/password-sign-in`, {
        method: 'POST',
        data,
    });
}

export async function queryCurrentUser() {
    return request(`user`);
}

export const queryUserList = (params: any) => request(`user/list`, { params });

export const apiGetUserTypeOptions = () => request(`user/type/options`);

export async function apiForeignLanguageProficiencyList(params: any) {
    return request(`user/foreign-language-proficiency/list`, { params });
}

export async function apiForeignLanguageProficiencyCreate(data: any) {
    return request(`user/foreign-language-proficiency/add`, {
        method: 'POST',
        data,
    });
}

export async function apiForeignLanguageProficiencyUploadEvidence(data: FormData) {
    return request(`user/foreign-language-proficiency/upload-evidence`, {
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export async function apiForeignLanguageProficiencyUpdate(data: any) {
    return request(`user/foreign-language-proficiency/update`, {
        method: 'POST',
        data,
    });
}

export async function apiForeignLanguageProficiencyDelete(id: string) {
    return request(`user/foreign-language-proficiency/delete/${id}`, {
        method: 'POST'
    });
}

export async function apiGetUserDetail(userName?: string) {
    return request(`user/detail/${userName}`);
}

export async function apiChangeAvatar(data: any) {
    return request(`user/change-avatar`, {
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

}

export async function apiAcademicTitleOptions(params: any) {
    return request(`user/academic-title/options`, { params });
}

export async function apiAcademicDegreeOptions() {
    return request(`user/academic-degree/options`);
}

export async function apiUserUpdate(data: any) {
    return request(`user/update`, {
        data,
        method: 'POST'
    });
}

export async function apiCountryOptions(params: any) {
    return request(`country/options`, { params });
}

export async function apiCityOptions(params: any) {
    return request(`city/options`, { params });
}

export async function apiEducationHistoryAdd(data: any) {
    return request(`user/education-history/add`, {
        method: 'POST',
        data
    })
}

export async function apiEducationHistoryUpdate(data: any) {
    return request(`user/education-history/update`, {
        method: 'POST',
        data
    });
}

export async function apiEducationHistoryDelete(id: string) {
    return request(`user/education-history/delete/${id}`, {
        method: 'POST'
    });
}

export async function apiEducationHistoryList(params: any) {
    return request(`user/education-history/list`, { params });
}

export async function apiAwardAdd(data: any) {
    return request(`award/add`, {
        method: 'POST',
        data
    });
}

export async function apiAwardUpdate(data: any) {
    return request(`award/update`, {
        method: 'POST',
        data
    });
}

export async function apiAwardDelete(id: string) {
    return request(`award/delete/${id}`, {
        method: 'POST'
    });
}

export async function apiAwardList(params: any) {
    return request(`award/list`, { params });
}

export async function apiAwardUploadEvidence(data: FormData) {
    return request('award/upload-evidence', {
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export async function apiResearchProjectAdd(data: any) {
    return request(`user/research-project/add`, {
        method: 'POST',
        data
    });
}

export async function apiResearchProjectUpdate(data: any) {
    return request(`user/research-project/update`, {
        method: 'POST',
        data
    });
}

export async function apiResearchProjectDelete(id: string) {
    return request(`user/research-project/delete/${id}`, {
        method: 'POST'
    });
}

export async function apiResearchProjectList(params: any) {
    return request(`user/research-project/list`, { params });
}

export async function apiMyDepartment() {
    return request(`user/my-department`);
}

export async function apiMyBooks(params: any) {
    return request(`user/my-books`, { params });
}

export async function apiBookAdd(data: any) {
    return request(`user/my-book/add`, {
        method: 'POST',
        data
    });
}

export async function apiBookUpdate(data: any) {
    return request(`user/my-book/update`, {
        method: 'POST',
        data
    });
}

export async function apiBookDelete(id: string) {
    return request(`user/my-book/delete/${id}`, {
        method: 'POST'
    });
}

export async function apiJournalAdd(data: any) {
    return request(`user/my-journal/add`, {
        method: 'POST',
        data
    });
}

export async function apiJournalUpdate(data: any) {
    return request(`user/my-journal/update`, {
        method: 'POST',
        data
    });
}

export async function apiJournalDelete(id: string) {
    return request(`user/my-journal/delete/${id}`, {
        method: 'POST'
    });
}

export async function apiJournalList(params: any) {
    return request(`user/my-journals`, { params });
}

export async function apiWorkingExperienceAdd(data: any) {
    return request(`user/my-working-experience/add`, {
        method: 'POST',
        data
    });
}

export async function apiWorkingExperienceUpdate(data: any) {
    return request(`user/my-working-experience/update`, {
        method: 'POST',
        data
    });
}

export async function apiWorkingExperienceDelete(id: string) {
    return request(`user/my-working-experience/delete/${id}`, {
        method: 'POST'
    });
}

export async function apiWorkingExperienceList(params: any) {
    return request(`user/my-working-experiences`, { params });
}

export async function apiAchievementAdd(data: any) {
    return request(`user/my-achievement/add`, {
        method: 'POST',
        data
    });
}

export async function apiAchievementUpdate(data: any) {
    return request(`user/my-achievement/update`, {
        method: 'POST',
        data
    });
}

export async function apiAchievementDelete(id: string) {
    return request(`user/my-achievement/delete/${id}`, {
        method: 'POST'
    });
}

export async function apiAchievementList(params: any) {
    return request(`user/my-achievements`, { params });
}

export async function apiAchievementUploadEvidence(data: FormData) {
    return request('achievement/upload-evidence', {
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export async function apiMyTeachingExperiences(params: any) {
    return request(`user/teaching-experience/list`, { params });
}

export async function apiTeachingExperienceAdd(data: any) {
    return request(`user/teaching-experience/add`, {
        method: 'POST',
        data
    });
}

export async function apiTeachingExperienceUpdate(data: any) {
    return request(`user/teaching-experience/update`, {
        method: 'POST',
        data
    });
}

export async function apiTeachingExperienceDelete(id: string) {
    return request(`user/teaching-experience/delete/${id}`, {
        method: 'POST'
    });
}

export async function apiStaffList(params: any) {
    return request(`user/staff/list`, { params });
}

export async function apiStaffAdd(data: any) {
    return request(`user/create`, {
        method: 'POST',
        data
    });
}

export async function apiUserListNotification(params: any) {
    return request(`user/list-notification`, { params });
}

export async function apiDeactiveUser(id: string) {
    return request(`user/deactivate/${id}`, {
        method: 'POST'
    });
}

export async function apiUserNotificationDelete(id: string) {
    return request(`user/notification/${id}`, {
        method: 'DELETE'
    });
}

export async function apiStaffIdOptions() {
    return request(`user/staff-id-options`);
}

export async function apiUserTopPosts(params: any) {
    return request(`user/top-posts`, { params });
}

export async function apiAddUserToRole(data: any) {
    return request(`https://identity.dhhp.edu.vn/user/add-to-role`, {
        method: 'POST',
        data
    });
}

