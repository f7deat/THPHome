import { EditOutlined } from "@ant-design/icons"
import { ProForm, ProFormSelect } from "@ant-design/pro-components"
import { Button, message, Popover } from "antd"
import { apiTaskItemChangeStatus, apiTaskItemStatusOptions } from "../../services/task-item"
import { useAccess } from "@umijs/max"
import { TaskStatus } from "../../constants"

type Props = {
    refresh: () => void;
    status?: TaskStatus;
    taskItemId?: string;
}

const StatusChange: React.FC<Props> = ({ refresh, status, taskItemId }) => {

    const access = useAccess();
    
    const Content = () => {
        return (
            <ProForm submitter={false}>
                <ProFormSelect request={() => apiTaskItemStatusOptions({ isForm: true}) as any} name="status" label="Trạng thái" rules={[
                    {
                        required: true
                    }
                ]} fieldProps={{
                    popupMatchSelectWidth: false,
                }} onChange={async (value) => {
                    await apiTaskItemChangeStatus({ status: value, taskItemId });
                    message.success('Cập nhật trạng thái thành công!');
                    refresh();
                }} />
            </ProForm>
        )
    }

    const canChange = () => {
        if (access.hod || access.admin) return true;
        if (status === TaskStatus.NeedsReview) return false;
        return true;
    }

    return (
        <Popover content={Content}>
            <Button icon={<EditOutlined />} size="small" type="link" hidden={!canChange()} />
        </Popover>
    )
}

export default StatusChange