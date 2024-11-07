import { apiGetProficiencyPracticeUpdateStatus, apiGetProficiencyStatusOptions } from "@/services/onboard/proficiency";
import { ModalForm, ModalFormProps, ProFormInstance, ProFormSelect, ProFormText } from "@ant-design/pro-components"
import { message } from "antd";
import { useEffect, useRef } from "react";

type Props = ModalFormProps & {
    data?: any;
    reload: any;
}

const ProficiencyPracticeStatusForm: React.FC<Props> = (props) => {

    const formRef = useRef<ProFormInstance>();

    useEffect(() => {
        const data = props.data;
        if (data) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: data.id
                },
                {
                    name: 'status',
                    value: data.status
                }
            ])
        }
    }, [props.data]);

    return (
        <ModalForm {...props} title={`Đổi trạng thái ${props.data?.name}`} formRef={formRef} onFinish={async (values: any) => {
            await apiGetProficiencyPracticeUpdateStatus(values);
            message.success('Thành công!');
            props.reload();
            props.onOpenChange?.(false);
        }}>
            <ProFormText name="id" hidden />
            <ProFormSelect request={apiGetProficiencyStatusOptions} name="status" label="Trạng thái" />
        </ModalForm>
    )
}

export default ProficiencyPracticeStatusForm;