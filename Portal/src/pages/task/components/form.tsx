import MyCkEditor from "@/components/my-ckeditor"
import { DrawerForm, DrawerFormProps, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components"
import { Col, message, Row } from "antd"
import { apiTaskItemCreate, apiTaskItemDetail, apiTaskItemUpdate } from "../services/task-item"
import { TaskPriorityList } from "../constants"
import { useEffect, useRef, useState } from "react"
import dayjs from "dayjs"

type Props = DrawerFormProps & {
    reload?: () => void;
}

const FormTask: React.FC<Props> = (props) => {

    const formRef = useRef<ProFormInstance>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (props.open && props.id) {
            setLoading(true);
            apiTaskItemDetail(props.id).then((res) => {
                const data = res.data;
                formRef.current?.setFields([
                    {
                        name: "id",
                        value: data.id
                    },
                    {
                        name: "title",
                        value: data.title
                    },
                    {
                        name: "description",
                        value: data.description
                    },
                    {
                        name: "startDate",
                        value: data.startDate ? dayjs(data.startDate) : undefined
                    },
                    {
                        name: "dueDate",
                        value: data.dueDate ? dayjs(data.dueDate) : undefined
                    },
                    {
                        name: "priority",
                        value: data.priority
                    },
                    {
                        name: "content",
                        value: data.content
                    }
                ]);
                setLoading(false);
            })
        } else {
            formRef.current?.resetFields();
        }
    }, [props.id, props.open]);

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiTaskItemUpdate(values);
        } else {
            await apiTaskItemCreate(values);
        }
        message.success("Thành công!");
        props.onOpenChange?.(false);
        props.reload?.();
        formRef.current?.resetFields();
    }

    return (
        <DrawerForm {...props} title="Cài đặt" onFinish={onFinish} formRef={formRef}>
            <ProFormText name="id" hidden />
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
            {
                !loading && (<MyCkEditor name="content" label="Nội dung" placeholder="Nhập nội dung" rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]} />)
            }

        </DrawerForm>
    )
}

export default FormTask