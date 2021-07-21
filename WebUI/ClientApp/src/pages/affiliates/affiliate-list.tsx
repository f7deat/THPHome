import { Button, Input, message, Modal, Popconfirm, Space, Table } from "antd"
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    EditOutlined,
    DeleteOutlined,
    FolderOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const AffiliateList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [affiliate, setAffiliate] = useState<any>({})
    const [affiliates, setAffiliates] = useState<any>();

    const featData = () => {
        axios.get(`/api/affiliate/get-list`).then(response => {
            setAffiliates(response.data);
        })
    }

    useEffect(() => {
        featData()
    }, [])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (affiliate.id) {
            axios.post('/api/affiliate/update', affiliate).then(response => {
                if (response.data.succeeded) {
                    message.success(response.data.message);
                    featData();
                    setIsModalVisible(false);
                } else {
                    message.error(response.data.message);
                }
            })
        } else {
            axios.post(`/api/affiliate/add`, affiliate).then(response => {
                if (response.data.succeeded) {
                    featData();
                    message.info('Create Success!!!');
                    setIsModalVisible(false);
                } else {
                    message.error(response.data.error);
                }
            })
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function handleDelete(id: any) {
        axios.post(`/api/affiliate/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                setAffiliates(affiliates.filter((x: any) => x.id !== id))
                message.info('Delete success!');
            }
        })
    }

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Name",
            render: (record: any) => (
                <a href={`/page/${record.slug}-${record.id}.html`} target="_blank">{record.name}</a>
            )
        },
        {
            title: "Slug",
            dataIndex: "slug",
        },
        {
            title: "Website Url",
            dataIndex: "websiteUrl",
        },
        {
            title: "",
            render: (record: any) => (
                <Space>
                    <Link to={`/admin/affiliate/details/${record.id}`}>
                        <Button type="primary" icon={<FolderOutlined/>}></Button>
                    </Link>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setAffiliate(record)
                            showModal()
                        }}
                    ></Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button type="primary" onClick={() => {
                    setAffiliate({})
                    showModal()
                }}>Affiliate</Button>
            </div>
            <div>
                <Table
                    dataSource={affiliates}
                    columns={columns}
                    rowSelection={{}}
                    rowKey="id"
                />
            </div>
            <Modal title="Create New" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <label>Name:</label>
                <Input className="mb-2"
                    onChange={(value) => {
                        affiliate.name = value.target.value;
                        setAffiliate({ ...affiliate, affiliate })
                    }}
                    value={affiliate?.name}
                />
                <label>Slug:</label>
                <Input className="mb-2"
                    onChange={(value) => {
                        affiliate.slug = value.target.value;
                        setAffiliate({ ...affiliate, affiliate })
                    }}
                    value={affiliate?.slug}
                />
                <label>Logo:</label>
                <Input className="mb-2"
                    onChange={(value) => {
                        affiliate.logo = value.target.value;
                        setAffiliate({ ...affiliate, affiliate })
                    }}
                    value={affiliate?.logo}
                />
                <label>ClassName:</label>
                <Input className="mb-2"
                    onChange={(value) => {
                        affiliate.className = value.target.value;
                        setAffiliate({ ...affiliate, affiliate })
                    }}
                    value={affiliate?.className}
                />
                <label>WebsiteUrl:</label>
                <Input className="mb-2"
                    onChange={(value) => {
                        affiliate.websiteUrl = value.target.value;
                        setAffiliate({ ...affiliate, affiliate })
                    }}
                    value={affiliate?.websiteUrl}
                />
            </Modal>
        </div>
    )
}