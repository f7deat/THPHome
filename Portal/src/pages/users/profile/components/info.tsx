import { apiAcademicDegreeOptions, apiAcademicTitleOptions, apiCityOptions, apiCountryOptions, apiGetUserDetail, apiUserUpdate } from "@/services/user";
import { ProForm, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components"
import { useModel, useRequest } from "@umijs/max";
import { Col, Divider, message, Row } from "antd";
import { useEffect, useRef } from "react";

const ProFileInfo: React.FC = () => {

    const { initialState } = useModel('@@initialState');
    const { data } = useRequest(() => apiGetUserDetail(initialState?.currentUser.userName));
    const formRef = useRef<ProFormInstance>();

    useEffect(() => {
        formRef.current?.setFields([
            {
                name: 'name',
                value: data?.name
            },
            {
                name: 'dateOfBirth',
                value: data?.dateOfBirth
            },
            {
                name: 'gender',
                value: data?.gender
            },
            {
                name: 'address',
                value: data?.address
            },
            {
                name: 'phoneNumber',
                value: data?.phoneNumber
            },
            {
                name: 'email',
                value: data?.email
            },
            {
                name: 'identityNumber',
                value: data?.identityNumber
            },
            {
                name: 'identityDate',
                value: data?.identityDate
            },
            {
                name: 'identityPlace',
                value: data?.identityPlace
            },
            {
                name: 'website',
                value: data?.website
            },
            {
                name: 'facebook',
                value: data?.facebook
            },
            {
                name: 'linkedin',
                value: data?.linkedin
            }
        ])
    }, [data]);

    const onFinish = async (values: any) => {
        await apiUserUpdate(values);
        message.success('Cập nhật thông tin thành công');
    }

    return (
        <ProForm formRef={formRef} onFinish={onFinish}>
            <Row gutter={16}>
                <Col md={10} xs={24}>
                    <ProFormText name="name" label="Họ và tên" rules={[
                        {
                            required: true
                        }
                    ]} />
                </Col>
                <Col md={4} xs={24}>
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
                <Col md={6} xs={24}>
                    <ProFormText name="phoneNumber" label="Số điện thoại" />
                </Col>
                <Col md={6} xs={24}>
                    <ProFormText name="email" label="Email" rules={[
                        {
                            type: 'email'
                        }
                    ]} />
                </Col>
                <Col md={4} xs={24}>
                    <ProFormSelect name="countryId" label="Quốc gia" request={apiCountryOptions} allowClear={false} />
                </Col>
                <Col md={4} xs={24}>
                    <ProFormSelect name="cityId" label="Tỉnh/thành" request={apiCityOptions} showSearch />
                </Col>
                <Col md={10} xs={24}>
                    <ProFormText name="address" label="Địa chỉ" />
                </Col>
                <Col md={4} xs={24}>
                    <ProFormSelect name="academicTitleId" label="Học vị" request={apiAcademicTitleOptions} />
                </Col>
                <Col md={4} xs={24}>
                    <ProFormSelect name="academicDegreeId" label="Học hàm" request={apiAcademicDegreeOptions} />
                </Col>
                <Col md={8} xs={24}>
                    <ProFormText name="identityNumber" label="Số CCCD" />
                </Col>
                <Col md={4} xs={24}>
                    <ProFormDatePicker name="identityDate" label="Ngày cấp" width="xl" />
                </Col>
                <Col md={4} xs={24}>
                    <ProFormText name="identityPlace" label="Nơi cấp" />
                </Col>
            </Row>
            <ProFormTextArea label="Giới thiệu" name="introduction" />
            <Divider orientation="left">Mạng xã hội</Divider>
            <Row gutter={16}>
                <Col md={8}>
                    <ProFormText name="facebook" label="Facebook" />
                </Col>
                <Col md={8}>
                    <ProFormText name="linkedin" label="Linkedin" />
                </Col>
                <Col md={8}>
                    <ProFormText name="website" label="Website" />
                </Col>
            </Row>
        </ProForm>
    )
}

export default ProFileInfo;