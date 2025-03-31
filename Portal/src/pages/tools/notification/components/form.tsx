import MyCkEditor from "@/components/my-ckeditor";
import { apiGetNotification } from "@/services/notificaton";
import { DrawerForm, DrawerFormProps, ProFormInstance, ProFormSelect, ProFormText } from "@ant-design/pro-components"
import { useEffect, useRef } from "react";

type Props = DrawerFormProps & {
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
                    },
                    {
                        name: 'type',
                        value: data.type
                    }
                ])
            })
        }
    }, [props.open, props.notificationId]);

    return (
        <DrawerForm {...props} title="Cài đặt thông báo" formRef={formRef} width={1000}>
            <ProFormText label="Tiêu đề" name="title" rules={[
                {
                    required: true
                }
            ]} />
            <ProFormSelect name="type" label="Loại thông báo" allowClear={false} rules={[
                {
                    required: true
                }
            ]} options={[
                {
                    label: 'Thông báo chung',
                    value: 0
                },
                {
                    label: 'Thông báo cá nhân',
                    value: 1
                },
                {
                    label: 'Thông báo hệ thống',
                    value: 2
                }
            ]} initialValue={0} />
            <MyCkEditor name="content" label="Nội dung" />
        </DrawerForm>
    )
}

export default NotificationForm