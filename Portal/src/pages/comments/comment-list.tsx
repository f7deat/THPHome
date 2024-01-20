import { Button, message, Popconfirm, Space, Table, Tag } from "antd"
import React, { useEffect, useState } from "react"
import {
    DeleteOutlined
} from "@ant-design/icons";
import { ECommentStatus } from "./types/comment-enum";
import moment from "moment";
import { request } from "@umijs/max";

export default function CommentList() {

    const [comments, setComments] = useState<any>([])

    useEffect(() => {
        getList()
    }, [])

    function getList() {
        request(`comment/get-list`).then((response: any) => {
            setComments(response)
        })
    }

    function handleDelete(id:string) {
        request(`comment/delete/${id}`, {
            method: 'DELETE'
        }).then((response: any) => {
            if (response.succeeded) {
                getList()
            }
        })
    }

    function handleChangeStatus(record: any) {
        record.status = ECommentStatus.PUBLISHED;
        request(`/api/comment/change-status`, {
            method: 'POST',
            data: record
        }).then(response => {
            if (response.succeeded) {
                getList();
                message.success(response.message)
            } else {
                message.error(response.error)
            }
        })
    }

    function statusName(status: ECommentStatus) {
        switch (status) {
            case ECommentStatus.PENDING:
                return 'Pending'
            default:
                return 'Published'
        }
    }

    const columns = [
        {
            title: "Id",
            render: (text: string, record: any, index: number) => index + 1
        },
        {
            title: 'Status',
            render: (record: any) => (
                <Button size="small" danger={record.status === 0} disabled={record.status === 1} onClick={() => handleChangeStatus(record)}>
                    {statusName(record.status)}
                </Button>
            )
        },
        {
            title: 'Date',
            render: (record: any) => moment(record.createdDate).format('DD/MM/YYYY hh:mm:ss')
        },
        {
            title: "Content",
            dataIndex: "content",
        },
        {
            title: '',
            render: (record: any) => (
                <Space>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div className="p-4 rounded bg-white">
            <Table dataSource={comments} columns={columns} rowSelection={{}} rowKey="id" />
        </div>
    )
}