import { ModalForm, ModalFormProps, ProFormTextArea } from "@ant-design/pro-components"

const WorkLog: React.FC<ModalFormProps> = (props) => {
    return (
        <ModalForm {...props} title="Log Work">
            <ProFormTextArea name="note" label="Ghi chú" />
        </ModalForm>
    )
}

export default WorkLog