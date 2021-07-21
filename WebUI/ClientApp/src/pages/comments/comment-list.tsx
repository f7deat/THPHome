import { Button, message, Popconfirm, Space, Table, Tag } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
import {
    DeleteOutlined
} from "@ant-design/icons";
import { ECommentStatus } from "./types/comment-enum";
import moment from "moment";

export default function CommentList() {

    const [comments, setComments] = useState<any>([])

    useEffect(() => {
        getList()
    }, [])

    function getList() {
        axios.get(`/api/comment/get-list`).then((response: any) => {
            setComments(response.data)
        })
    }

    function handleDelete(id:string) {
        axios.delete(`/api/comment/delete/${id}`).then((response: any) => {
            if (response.data.succeeded) {
                getList()
            }
        })
    }

    function handleChangeStatus(record: any) {
        record.status = ECommentStatus.PUBLISHED;
        axios.post(`/api/comment/change-status`, record).then(response => {
            if (response.data.succeeded) {
                getList();
                message.success(response.data.message)
            } else {
                message.error(response.data.error)
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