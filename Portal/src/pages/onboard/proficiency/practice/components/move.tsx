import { apiMoveProficiencyBatch, apiProficiencyBatchAvailableOptions } from "@/services/onboard/proficiency";
import { ModalForm, ModalFormProps, ProFormInstance, ProFormSelect, ProFormText } from "@ant-design/pro-components"
import { message } from "antd";
import { useEffect, useRef } from "react";

type Props = ModalFormProps & {
    data?: any;
    reload: () => void;
}

const MoveBatch: React.FC<Props> = (props) => {

    const formRef = useRef<ProFormInstance>();

    useEffect(() => {
        if (props.open) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: props.data?.id
                }
            ])
        }
    }, [props, props.open]);

    const onFinish = async (values: any) => {
        await apiMoveProficiencyBatch(values);
        message.success('Đã chuyển đợt ôn tập');
        props.reload();
        props.onOpenChange?.(false);
    }

    return (
        <ModalForm {...props} title="Đổi đợt ôn tập" onFinish={onFinish} formRef={formRef}>
            <ProFormText name="id" hidden />
            <ProFormSelect name="batchId" label="Đợt ôn tập" request={apiProficiencyBatchAvailableOptions} rules={[
                {
                    required: true
                }
            ]} />
        </ModalForm>
    )
}

export default MoveBatch;