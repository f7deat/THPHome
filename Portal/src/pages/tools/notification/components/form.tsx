import MyCkEditor from "@/components/my-ckeditor";
import { apiGetNotification } from "@/services/notificaton";
import { ModalForm, ModalFormProps, ProFormInstance, ProFormText } from "@ant-design/pro-components"
import { useEffect, useRef } from "react";

type Props = ModalFormProps & {
    notificationId?: string;
}

const NotificationForm: React.FC<Props> = (props) => {

    const formRef = useRef<ProFormInstance>();

    useEffect(() => {
        if (props.open && props.notificationId) {
            apiGetNotification(props.notificationId).then(response => {
                const data = response.data;
                formRef.current?.setFields([
                    {
                        name: 'title',
                        value: data.title
                    },
                    {
                        name: 'content',
                        value: data.content
                    }
                ])
            })
        }
    }, [props.open, props.notificationId]);

    return (
        <ModalForm {...props} title="Cài đặt thông báo" formRef={formRef}>
            <ProFormText label="Tiêu đề" name="title" rules={[
                {
                    required: true
                }
            ]} />
             <MyCkEditor name="content" label="Nội dung" />
        </ModalForm>
    )
}

export default NotificationForm