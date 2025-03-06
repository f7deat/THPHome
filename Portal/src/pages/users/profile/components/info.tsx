import { ProForm, ProFormDatePicker, ProFormSelect, ProFormText } from "@ant-design/pro-components"
import { Col, Row } from "antd";

const ProFileInfo: React.FC = () => {
    return (
        <ProForm>
            <Row gutter={16}>
                <Col md={14} xs={24}>
                    <ProFormText name="name" label="Họ và tên" rules={[
                        {
                            required: true
                        }
                    ]} />
                </Col>
                <Col md={6} xs={24}>
                    <ProFormDatePicker name="dateOfBirth" label="Ngày sinh" width="xl" />
                </Col>
                <Col md={4} xs={24}>
                    <ProFormSelect name="gender" label="Giới tính" options={[
                        {
                            label: 'Nam',
                            value: false
                        },
                        {
                            label: 'Nữ',
                            value: true
                        }
                    ]} />
                </Col>
            </Row>
            <ProFormText name="address" label="Địa chỉ" />
        </ProForm>
    )
}

export default ProFileInfo;