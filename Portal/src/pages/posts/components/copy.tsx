import { ModalForm, ModalFormProps, ProForm, ProFormInstance, ProFormText, ProFormTextArea } from "@ant-design/pro-components"
import { useEffect, useRef } from "react";

type Props = ModalFormProps & {
    data: any;
}

const CopyPost : React.FC<Props> = (props) => {

    const formRef = useRef<ProFormInstance>();

    useEffect(() => {
        if (props.data) {
            formRef.current?.setFields([
                {
                    name: 'title',
                    value: props.data.title
                },
                {
                    name: 'description',
                    value: props.data.description
                }
            ])
        }
    }, [JSON.stringify(props.data)]);

    return (
        <ModalForm {...props} title="Nhân bản" formRef={formRef}>
            <ProFormText label="Tiêu đề" name="title" rules={[{
                required: true
            }]} />
            <ProFormTextArea label="Mô tả" name="description" />
        </ModalForm>
    )
}

export default CopyPost;