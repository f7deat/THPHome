import { apiAddProficiency, apiGetProficiencyTypeOptions } from "@/services/onboard/proficiency";
import { PlusOutlined } from "@ant-design/icons";
import { ModalForm, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { useParams } from "@umijs/max";
import { Button, Col, message, Row } from "antd";
import { useRef, useState } from "react";

type Props = {
    reload: any;
}

const ProFiciencyForm: React.FC<Props> = ({ reload }) => {

    const [open, setOpen] = useState<boolean>(false);
    const { id } = useParams();
    const formRef = useRef<ProFormInstance>();

    const onFinish = async (values: any) => {
        values.batchId = id;
        await apiAddProficiency(values);
        message.success('Tạo thành công!');
        formRef.current?.resetFields();
        reload();
        setOpen(false);
    }

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Tạo đơn đăng ký</Button>
            <ModalForm open={open} onOpenChange={setOpen} title="Đăng ký chuẩn đầu ra" onFinish={onFinish} formRef={formRef}>
                <ProFormText name="userName" label="Mã sinh viên" rules={[
                    {
                        required: true
                    }
                ]} />
                <Row gutter={16}>
                    <Col md={12}>
                        <ProFormSelect name="className" label="Lớp" options={[
                            '2-4-6-CN',
                            '3-5-7-CN'
                        ]} rules={[
                            {
                                required: true
                            }
                        ]} />
                    </Col>
                    <Col md={12}>
                        <ProFormSelect name="typeId" label="Loại" rules={[
                            {
                                required: true
                            }
                        ]} request={apiGetProficiencyTypeOptions} />
                    </Col>
                    <Col md={12}>
                        <ProFormSelect name="status" label="Trạng thái" rules={[
                            {
                                required: true
                            }
                        ]} options={[
                            {
                                label: 'Chờ xử lý',
                                value: 0
                            },
                            {
                                label: 'Đã thanh toán',
                                value: 2
                            }
                        ]} />
                    </Col>
                    <Col md={12}>
                        <ProFormDatePicker name="paymentDate" label="Ngày thanh toán" width="xl" />
                    </Col>
                </Row>
            </ModalForm>
        </>
    )
}

export default ProFiciencyForm;