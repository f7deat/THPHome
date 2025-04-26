import { ModalForm, ModalFormProps, ProFormDatePicker, ProFormDigit, ProFormTextArea } from "@ant-design/pro-components"
import dayjs from "dayjs"
import { apiLogWork } from "../../services/work-log"
import { useParams } from "@umijs/max"
import { message } from "antd"

const WorkLog: React.FC<{
    reload: () => void;
} & ModalFormProps> = (props) => {

    const { id } = useParams<{ id: string }>();

    const onFinish = async (values: any) => {
        values.taskItemId = id;
        await apiLogWork(values);
        message.success("Log work thành công");
        props.onOpenChange?.(false);
        props.reload();
    }

    return (
        <ModalForm {...props} title="Log Work" onFinish={onFinish}>
            <div className="flex items-center gap-2">
                <ProFormDatePicker name="logDate" label="Ngày log" initialValue={dayjs()} rules={[{ required: true, message: "Vui lòng chọn ngày log" }]} />
                <div className="flex-1">
                    <ProFormDigit name="timeSpent" label="Thời gian (giờ)" rules={[{ required: true, message: "Vui lòng nhập thời gian" }]} placeholder="Nhập thời gian" />
                </div>
            </div>
            <ProFormTextArea name="note" label="Mô tả công việc" rules={[{ required: true }]} />
        </ModalForm>
    )
}

export default WorkLog