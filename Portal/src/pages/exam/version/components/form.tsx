import { ModalForm, ModalFormProps, ProFormInstance } from "@ant-design/pro-components"
import { useRef } from "react";

const ExamVersionForm: React.FC<ModalFormProps> = (props) => {
    const formRef = useRef<ProFormInstance>();
    return (
        <ModalForm {...props} title="Đề thi" formRef={formRef}></ModalForm>
    )
}

export default ExamVersionForm;