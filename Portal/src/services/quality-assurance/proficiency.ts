import request from '../onboard/request';

export async function apiCountProficiencyExamByStatus(status?: number) {
    return request(`proficiency/exam/count-by-status`, {
        params: {
            status
        }
    })
}

export async function apiTotalProficiencyExamAmount() {
    return request(`proficiency/exam/sum-amount`)
}