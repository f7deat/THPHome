import { DividerBlock, MajorGeneralBlock, SponsorBlock, TextBlock, TinyMCEBlock, VideoBlock } from "@/components/blocks";
import SideGalleryBlock from "@/components/blocks/side-gallery";
import { queryActiveBlock, queryBlockAdd, queryBlockOptions, queryBlockSave, queryBlockSaveInfo, queryBlocks, queryDeleteBlock, querySortOrderBlock } from "@/services/block";
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined, ToolOutlined } from "@ant-design/icons";
import { DragSortTable, ModalForm, ProColumns, ProFormInstance, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { useParams } from "@umijs/max";
import { Button, Dropdown, Empty, MenuProps, Popconfirm, Tooltip, message } from "antd";
import { Fragment, useEffect, useRef, useState } from "react";

const PageBlock: React.FC = () => {
    const { id } = useParams();
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [block, setBlock] = useState<any>();
    const form = useRef<ProFormInstance>();
    const formBlock = useRef<ProFormInstance>();

    const fetchData = () => {
        if (id) {
            queryBlocks(id).then(response => {
                setDataSource(response.data)
            })
        }
    }

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const onConfirm = async (id?: string) => {
        await queryDeleteBlock(id);
        message.success('Deleted!');
        fetchData();
    };

    const onFinish = async (value: any) => {
        value.postId = id;
        if (value.id) {
            await queryBlockSaveInfo(value);
            message.success('Lưu thành công!');
        } else {
            await queryBlockAdd(value);
            message.success('Thêm thành công!');
        }
        setVisible(false);
        fetchData();
        formBlock.current?.resetFields();
    };

    useEffect(() => {
        if (block) {
            formBlock.current?.setFields([
                {
                    name: 'id',
                    value: block.id
                },
                {
                    name: 'name',
                    value: block.name
                },
                {
                    name: 'blockId',
                    value: block.blockId
                }
            ]);
        }
    }, [block]);

    const columns: ProColumns<any>[] = [
        {
            title: '#',
            dataIndex: 'sortOrder',
            className: 'drag-visible'
        },
        {
            title: 'Loại',
            dataIndex: 'blockName'
        },
        {
            title: 'Tên',
            dataIndex: 'name'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            valueEnum: {
                false: {
                    text: 'Draft',
                    status: 'Default',
                },
                true: {
                    text: 'Active',
                    status: 'Processing',
                },
            },
            width: 80
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: (dom, entity) => [
                <Tooltip
                    key="setting" title="Cấu hình block">
                    <Button
                        size="small"
                        type="primary"
                        icon={<ToolOutlined />}
                        onClick={() => {
                            setBlock(entity);
                            form.current?.setFieldValue('id', entity.id);
                            setOpen(true);
                        }}
                    />
                </Tooltip>,
                <Tooltip key="edit" title="Chỉnh sửa thông tin">
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setBlock(entity);
                            setVisible(true);
                        }}
                    />
                </Tooltip>,
                <Popconfirm
                    title="Are you sure?"
                    key={4}
                    onConfirm={() => onConfirm(entity.id)}
                >
                    <Button
                        size="small"
                        icon={<DeleteOutlined />}
                        danger
                        type="primary"
                    ></Button>
                </Popconfirm>
            ],
            align: 'center'
        }
    ];

    const handleDragSortEnd = (beforeIndex: number, afterIndex: number, newDataSource: any) => {
        querySortOrderBlock(newDataSource).then(response => {
            setDataSource(newDataSource);
            message.success('Saved!');
        })
    };

    const renderSetting = () => {
        if (!block) return <Empty />
        if (block.normalizedName === 'TextBlock') {
            return <TextBlock id={block.id} />
        }
        if (block.normalizedName === 'MajorGeneralBlock') {
            return <MajorGeneralBlock id={block.id} />
        }
        if (block.normalizedName === 'VideoBlock') {
            return <VideoBlock id={block.id} />
        }
        if (block.normalizedName === 'DividerBlock') {
            return <DividerBlock id={block.id} />
        }
        if (block.normalizedName === 'TinyMCEBlock') {
            return <TinyMCEBlock id={block.id} />
        }
        if (block.normalizedName === 'SponsorBlock') {
            return <SponsorBlock id={block.id} />
        }
        if (block.normalizedName === 'SideGalleryBlock') {
            return <SideGalleryBlock id={block.id} />
        }
        return <Empty />
    }

    const onSaveBlock = async (values: any) => {
        if (!block) return;
        console.log(values)
        await queryBlockSave(block.id, values);
        message.success('Saved!');
        setOpen(false);
    }

    return (
        <>
            <div className='mb-2 flex justify-end gap-2'>
                <Button
                    key={0}
                    onClick={() => setVisible(true)}
                    type="primary"
                    icon={<PlusOutlined />}
                >
                    <span>
                        Thêm mới
                    </span>
                </Button>
            </div>
            <DragSortTable
                search={false}
                rowKey="id"
                columns={columns}
                pagination={false}
                dataSource={dataSource}
                dragSortKey="sortOrder"
                onDragSortEnd={handleDragSortEnd}
            />
            <ModalForm open={visible} title='Block' onOpenChange={setVisible} onFinish={onFinish} formRef={formBlock}>
                <ProFormText name="id" hidden />
                <ProFormText name="name" label="Name" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormSelect rules={[
                    {
                        required: true
                    }
                ]}
                    request={queryBlockOptions}
                    name="blockId" label="Block" />
            </ModalForm>
            <ModalForm open={open} onOpenChange={setOpen} title="Block Configuration" onFinish={onSaveBlock} formRef={form}>
                <ProFormText name="id" hidden />
                <ProFormText name="className" label="Class Name" />
                {renderSetting()}
            </ModalForm>
        </>
    );
}

export default PageBlock;