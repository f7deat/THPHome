import { TextBlock } from "@/components/blocks";
import { queryActiveBlock, queryBlockAdd, queryBlockOptions, queryBlocks, queryDeleteBlock, querySortOrderBlock } from "@/services/block";
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { DragSortTable, ModalForm, ProColumns, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { useParams } from "@umijs/max";
import { Badge, Button, Dropdown, Empty, MenuProps, Popconfirm, message } from "antd";
import { Fragment, useEffect, useState } from "react";

const PageBlock: React.FC = () => {
    const { id } = useParams();
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [block, setBlock] = useState<any>();

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

    const onConfirm = async (workId?: string) => {
        const response = await queryDeleteBlock(workId, id);
        if (response.succeeded) {
            message.success('Deleted!');
            fetchData();
        } else {
            message.error(response.errors[0].description);
        }
    };

    const onFinish = async (value: any) => {
        value.postId = id;
        await queryBlockAdd(value);
        message.success('Added!');
        setVisible(false);
        fetchData();
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Show / Hide'
        },
    ];

    const onMoreClick = async (event: any, id?: string) => {
        if (event.key === '1') {
            const resposne = await queryActiveBlock(id);
            if (resposne.succeeded) {
                message.success('Actived!');
                fetchData();
            }
        }
    }

    const columns: ProColumns<any>[] = [
        {
            title: '#',
            dataIndex: 'sort',
            className: 'drag-visible'
        },
        {
            title: 'Block',
            dataIndex: 'blockName'
        },
        {
            title: 'Tên',
            dataIndex: 'name'
        },
        {
            title: 'Status',
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
        },
        {
            title: 'Action',
            valueType: 'option',
            render: (dom, entity) => [
                <Button
                    size="small"
                    key={1}
                    type="primary"
                    disabled={entity.autoGenerateField}
                    icon={<EditOutlined />}
                    onClick={() => {
                        setBlock(entity);
                        setOpen(true);
                    }}
                />,
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
                </Popconfirm>,
                <Dropdown menu={{ items, onClick: (event) => onMoreClick(event, entity.id) }} key="more">
                    <Button
                        size="small" icon={<MoreOutlined />} type='dashed' />
                </Dropdown>
            ]
        }
    ];

    const handleDragSortEnd = (newDataSource: any) => {
        const workIds = newDataSource.map((x: any) => (x.id || ''));
        querySortOrderBlock(workIds).then(response => {
            if (response.succeeded) {
                setDataSource(newDataSource);
                message.success('Saved!');
            }
        })
    };

    const renderSetting = () => {
        if (!block) return <Empty />
        if (block.normalizedName === 'Text') {
            return <TextBlock />
        }
        return <Empty />
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
                dragSortKey="sort"
                onDragSortEnd={handleDragSortEnd}
            />
            <ModalForm open={visible} title='Add component' onOpenChange={setVisible} onFinish={onFinish}>
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
            <ModalForm open={open} onOpenChange={setOpen} title="Block Configuration">
                {renderSetting()}
            </ModalForm>
        </>
    );
}

export default PageBlock;