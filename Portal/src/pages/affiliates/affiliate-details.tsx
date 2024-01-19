import { Button, Col, Input, message, Modal, Popconfirm, Row, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    DeleteOutlined
} from '@ant-design/icons';
import moment from "moment";

const AffiliateDetails = () => {

    const { id } = useParams<any>();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [affiliateDetail, setAffiliateDetail] = useState<any>({});
    const [listAffliateDetail, setListAffliateDetail] = useState<any>([]);

    useEffect(() => {
        axios.get(`/api/affiliate/get-details/${id}`).then(response => {
            setListAffliateDetail(response.data);
        })
    }, [id]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (!affiliateDetail) {
            return message.error('Please input value!');
        }
        affiliateDetail.affiliateId = Number(id);
        axios.post('/api/affiliate/add-details', affiliateDetail).then(response => {
            if (response.data.succeeded) {
                setListAffliateDetail((current: any) => [...current, response.data.payload])
                message.info('Success!');
                setIsModalVisible(false);
            } else {
                message.error(response.data.error);
            }
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function remove(id: number) {
        axios.post(`/api/affiliate/details/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                setListAffliateDetail(listAffliateDetail.filter((x: any) => x.id !== id));
                message.info('Success!');
            }
        })
    }

    return (
        <div>
            <div className="mb-2">
                <Button type="primary" onClick={showModal}>Create New</Button>
            </div>

            <div>
                <Row gutter={16}>
                    {
                        listAffliateDetail && listAffliateDetail.map((x: any) => (
                            <Col span={6}>
                                <div className="bg-white">
                                    <img src={x.image} alt={x.name} className="w-full" />
                                    <div className="p-3">
                                        <div className="mb-2 font-bold text-blue-600">{x.name}</div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-gray-400">
                                                {x.click} click - {moment(x.modifiedDate).format('DD/MM/YYYY hh:mm:ss')}
                                            </div>
                                            <div>
                                                <Popconfirm
                                                    title="Are you sure to delete?"
                                                    onConfirm={() => remove(x.id)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                                                </Popconfirm>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </div>

            <Modal title="Create New" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>Name:</div>
                <Input onChange={(e) => {
                    affiliateDetail.name = e.target.value;
                    setAffiliateDetail(affiliateDetail)
                }} />
                <div>Link:</div>
                <Input onChange={(e) => {
                    affiliateDetail.link = e.target.value;
                    setAffiliateDetail(affiliateDetail)
                }} />
                <div>Text:</div>
                <Input onChange={(e) => {
                    affiliateDetail.text = e.target.value;
                    setAffiliateDetail(affiliateDetail)
                }} />
                <div>Image:</div>
                <Input onChange={(e) => {
                    affiliateDetail.image = e.target.value;
                    setAffiliateDetail(affiliateDetail)
                }} />
            </Modal>
        </div>
    )
}

export default AffiliateDetails