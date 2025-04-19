import { EditOutlined } from "@ant-design/icons"
import { ProForm, ProFormSelect } from "@ant-design/pro-components"
import { Button, message, Popover } from "antd"
import { apiTaskItemChangeStatus, apiTaskItemStatusOptions } from "../../services/task-item"
import { useParams } from "@umijs/max"

type Props = {
    refresh: () => void
}

const StatusChange: React.FC<Props> = ({ refresh }) => {

    const { id } = useParams<{ id: string }>();
    
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
                    await apiTaskItemChangeStatus({ status: value, taskItemId: id });
                    message.success('Cập nhật trạng thái thành công!');
                    refresh();
                }} />
            </ProForm>
        )
    }

    return (
        <Popover content={Content}>
            <Button icon={<EditOutlined />} size="small" type="link" />
        </Popover>
    )
}

export default StatusChange