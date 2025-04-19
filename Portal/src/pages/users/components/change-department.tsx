import { apiDepartmentOptions } from "@/services/department";
import { apiChangeDepartment } from "@/services/identity/user";
import { EditOutlined } from "@ant-design/icons";
import { ProForm, ProFormSelect } from "@ant-design/pro-components";
import { Button, message, Popover } from "antd";

type Props = {
    userId: string;
    reload: () => void;
}

const ChangeDepartment: React.FC<Props> = ({ userId, reload }) => {
  return (
    <Popover content={(
        <ProForm submitter={false} className="min-w-52">
            <ProFormSelect name="departmentId" label="Đơn vị" showSearch fieldProps={{
                popupMatchSelectWidth: false
            }} request={apiDepartmentOptions} onChange={async (value) => {
                await apiChangeDepartment({ departmentId: value, userId });
                message.success("Cập nhật thành công");
                reload();
            }} />
        </ProForm>
    )}>
      <Button type="text" icon={<EditOutlined />} size="small" />
    </Popover>
  );
}

export default ChangeDepartment;