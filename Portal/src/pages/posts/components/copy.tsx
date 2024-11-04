import { queryBlockCopy } from "@/services/block";
import { ActionType, ModalForm, ModalFormProps, ProFormInstance, ProFormText, ProFormTextArea } from "@ant-design/pro-components"
import { message } from "antd";
import { useEffect, useRef } from "react";

type Props = ModalFormProps & {
    data: any;
    actionRef: React.MutableRefObject<ActionType | undefined>;
    setOpen: any;
}

const CopyPost : React.FC<Props> = (props) => {

    const { data, actionRef, setOpen } = props;

    const formRef = useRef<ProFormInstance>();

    useEffect(() => {
        if (data) {
            formRef.current?.setFields([
                {
                    name: 'title',
                    value: data.title
                },
                {
                    name: 'description',
                    value: data.description
                }
            ])
        }
    }, [JSON.stringify(data)]);

    const onFinish = async (values: any) => {
        const body = {
            ...data,
            title: values.title,
            description: values.description
        }
        await queryBlockCopy(body);
        message.success('Nhân bản thành công!');
        setOpen(false);
        actionRef.current?.reload();
    }

    return (
        <ModalForm {...props} title="Nhân bản" formRef={formRef} onFinish={onFinish}>
            <ProFormText label="Tiêu đề" name="title" rules={[{
                required: true
            }]} />
            <ProFormTextArea label="Mô tả" name="description" rules={[{
                required: true
            }]} />
        </ModalForm>
    )
}

export default CopyPost;