import MyCkEditor from "@/components/my-ckeditor"
import { DrawerForm, DrawerFormProps, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components"
import { Col, message, Row } from "antd"
import { apiTaskItemCreate } from "../services/task-item"
import { TaskPriorityList } from "../constants"
import { useRef } from "react"

type Props = DrawerFormProps & {
    reload?: () => void;
}

const FormTask: React.FC<Props> = (props) => {

    const formRef = useRef<ProFormInstance>();

    const onFinish = async (values: any) => {
        await apiTaskItemCreate(values);
        message.success("Tạo nhiệm vụ thành công!");
        props.onOpenChange?.(false);
        props.reload?.();
        formRef.current?.resetFields();
    }

    return (
        <DrawerForm {...props} title="Cài đặt" onFinish={onFinish} formRef={formRef}>
            <ProFormText name="title" label="Tên nhiệm vụ" placeholder="Nhập tên nhiệm vụ" rules={[{ required: true, message: "Vui lòng nhập tên nhiệm vụ!" }]} />
            <ProFormTextArea name="description" label="Mô tả nhiệm vụ" placeholder="Nhập mô tả nhiệm vụ" />
            <Row gutter={16}>
                <Col md={8} xs={24}>
                    <ProFormDatePicker width="lg" name="startDate" label="Thời gian bắt đầu" placeholder="Nhập thời gian bắt đầu" rules={[{ required: true, message: "Vui lòng nhập thời gian bắt đầu!" }]} />
                </Col>
                <Col md={8} xs={24}>
                    <ProFormDatePicker width="lg" name="dueDate" label="Thời gian hoàn thành" placeholder="Nhập thời gian hoàn thành" />
                </Col>
                <Col md={8} xs={24}>
                    <ProFormSelect
                        options={TaskPriorityList}
                        name="priority" label="Độ ưu tiên" placeholder="Nhập độ ưu tiên" rules={[{ required: true, message: "Vui lòng nhập độ ưu tiên!" }]} />
                </Col>
            </Row>
            <MyCkEditor name="content" label="Nội dung" placeholder="Nhập nội dung" rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]} />
        </DrawerForm>
    )
}

export default FormTask