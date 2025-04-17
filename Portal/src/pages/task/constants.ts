export enum TaskPriority
{
    Low,
    Medium,
    High,
    Urgent
}
// Represents the current stage in the lifecycle
export enum TaskStatus
{
    NotStarted,
    InProgress,
    Complete,
    NeedsReview,
    Approved,
    Overdue,
    OnHold
}

export const TaskStatusList = [
    { label: 'Chưa bắt đầu', value: TaskStatus.NotStarted },
    { label: 'Đang thực hiện', value: TaskStatus.InProgress },
    { label: 'Hoàn thành', value: TaskStatus.Complete },
    { label: 'Chờ duyệt', value: TaskStatus.NeedsReview },
    { label: 'Đã phê duyệt', value: TaskStatus.Approved },
    { label: 'Quá hạn', value: TaskStatus.Overdue },
    { label: 'Tạm dừng', value: TaskStatus.OnHold }
]

export const TaskPriorityList = [
    { label: '📌 Thấp', value: TaskPriority.Low },
    { label: '⏳ Trung bình', value: TaskPriority.Medium },
    { label: '⚠️ Cao', value: TaskPriority.High },
    { label: '🔥 Khẩn cấp', value: TaskPriority.Urgent }
]