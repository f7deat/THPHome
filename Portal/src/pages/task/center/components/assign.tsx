import { apiDepartmentCurrentUserOptions } from "@/services/department";
import { EditTwoTone } from "@ant-design/icons"
import { ModalForm, ProFormSelect } from "@ant-design/pro-components"
import { useParams } from "@umijs/max";
import { Button, message } from "antd"
import { useState } from "react";
import { apiTaskItemAssign } from "../../services/task-item";

type Props = {
    refresh: () => Promise<any>;
}

const AssignModal: React.FC<Props> = ({ refresh }) => {

    const { id } = useParams<{ id: string }>();
    const [open, setOpen] = useState<boolean>(false);

    const onFinish = async (values: any) => {
        values.taskItemId = id;
        await apiTaskItemAssign(values);
        message.success("Gán nhiệm vụ thành công");
        setOpen(false);
        refresh();
    }

    return (
        <>
            <Button size="small" icon={<EditTwoTone />} type="link" onClick={() => setOpen(true)} />
            <ModalForm open={open} onOpenChange={setOpen} title="Gán nhiệm vụ" onFinish={onFinish}>
                <ProFormSelect name="assignedTo" label="Người thực hiện" placeholder="Chọn người thực hiện" showSearch request={apiDepartmentCurrentUserOptions} />
            </ModalForm>
        </>
    )
}

export default AssignModal