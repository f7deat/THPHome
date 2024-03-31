import { Button, message, Popconfirm, Popover, Space, Image } from "antd"
import { useRef, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { ActionType, PageContainer, ProColumnType, ProTable } from "@ant-design/pro-components";
import { apiDeletePartner, apiGetListPartner } from "@/services/partner";
import PartnerSetting from "./setting";

const PartnerPage = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [id, setId] = useState<number>();
    const actionRef = useRef<ActionType>();

    function handleRemove(id: number) {
        apiDeletePartner(id).then((response: any) => {
            if (response.succeeded) {
                message.success(response.message);
                actionRef.current?.reload();
            } else {
                message.error(response.errors[0].description);
            }
        })
    }

    const columns: ProColumnType<any>[] = [
        {
            title: 'STT',
            valueType: 'indexBorder',
            width: 50,
            align: 'center'
        },
        {
            title: 'Đối tác',
            dataIndex: 'name'
        },
        {
            title: 'Liên kết',
            dataIndex: 'url',
            search: false
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            valueEnum: {
                0: {
                    text: 'Draft',
                    status: 'Default',
                },
                1: {
                    text: 'Active',
                    status: 'Processing',
                },
            },
            width: 100
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'modifiedDate',
            valueType: 'dateTime',
            width: 200,
            search: false
        },
        {
            title: 'Người cập nhật',
            dataIndex: 'modifiedBy',
            width: 200,
            search: false
        },
        {
            title: '',
            render: (dom: any, record: any) => [
                <Button size="small" type="primary" icon={<EditOutlined />} onClick={() => {
                    setId(record.id);
                    setOpen(true);
                }} key="edit" />,
                <Popconfirm
                    key="delete"
                    title="Are you sure to delete?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleRemove(record.id)}
                >
                    <Button size="small" type="primary" danger icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            ],
            valueType: 'option',
            width: 100,
            align: 'center'
        }
    ];

    return (
        <PageContainer>
            <ProTable
                search={{
                    layout: 'vertical'
                }}
                actionRef={actionRef}
                request={(params) => apiGetListPartner({
                    ...params,
                    pageIndex: params.current
                })} columns={columns} rowKey="id" rowSelection={{}} />

            <PartnerSetting open={open} setOpen={setOpen} id={id} actionRef={actionRef} />
        </PageContainer>
    )
}

export default PartnerPage