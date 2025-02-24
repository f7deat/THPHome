import { DividerBlock, MajorGeneralBlock, SloganBlock, SponsorBlock, TextBlock, TinyMCEBlock, VideoBlock } from "@/components/blocks";
import HtmlBlock from "@/components/blocks/html";
import SideGalleryBlock from "@/components/blocks/side-gallery";
import { queryActiveBlock, queryBlock, queryBlockAdd, queryBlockOptions, queryBlockSave, queryBlockSaveInfo, queryBlocks, queryDeleteBlock, querySortOrderBlock } from "@/services/block";
import { DeleteOutlined, EditOutlined, PlusOutlined, ToolOutlined } from "@ant-design/icons";
import { ActionType, DragSortTable, DrawerForm, ModalForm, ProColumns, ProFormInstance, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { useParams } from "@umijs/max";
import { Button, Popconfirm, Switch, Tooltip, message, Skeleton } from "antd";
import { useEffect, useRef, useState } from "react";

const PageBlock: React.FC = () => {
    const { id } = useParams();
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [block, setBlock] = useState<any>();
    const formBlock = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const [blockId, setBlockId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = () => {
        if (id) {
            queryBlocks(id).then(response => {
                setDataSource(response.data)
            })
        }
    }

    useEffect(() => {
        if (blockId && open) {
            setLoading(true);
            queryBlock(blockId).then(response => {
                setLoading(false);
                setBlock(response);
            })
        }
    }, [blockId, open]);

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

    const columns: ProColumns<any>[] = [
        {
            title: '#',
            dataIndex: 'sortOrder',
            className: 'drag-visible',
            width: 50,
            align: 'center'
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
            width: 80,
            render: (dom, entity) => (
                <Switch size="small" checked={entity.active} onChange={async () => {
                    await queryActiveBlock(entity.id);
                    message.success('Thao tác thành công!');
                    actionRef.current?.reload();
                }} />
            ),
            align: 'center'
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
                            setBlockId(entity.id);
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
            align: 'center',
            width: 100
        }
    ];

    const handleDragSortEnd = (beforeIndex: number, afterIndex: number, newDataSource: any) => {
        querySortOrderBlock(newDataSource).then(() => {
            setDataSource(newDataSource);
            message.success('Saved!');
        })
    };

    const onSaveBlock = async (values: any) => {
        if (!block) return;
        await queryBlockSave(block.id, values);
        message.success('Saved!');
        setOpen(false);
    }

    const FormSetting = () => {
        if (!block) return <div />
        if (block.normalizedName === 'TextBlock') return <TextBlock data={block.data} />
        if (block.normalizedName === 'VideoBlock') return <VideoBlock data={block.data} />
        if (block.normalizedName === 'DividerBlock') return <DividerBlock data={block.data} />
        if (block.normalizedName === 'TinyMCEBlock') return <TinyMCEBlock data={block.data} />
        if (block.normalizedName === 'SponsorBlock') return <SponsorBlock data={block.data} />
        if (block.normalizedName === 'HtmlBlock') return <HtmlBlock data={block.data} />
        if (block.normalizedName === 'MajorGeneralBlock') return <MajorGeneralBlock data={block.data} />
        if (block.normalizedName === 'SideGalleryBlock') return <SideGalleryBlock data={block.data} />
        if (block.normalizedName === 'SloganBlock') return <SloganBlock data={block.data} />
        return <div />
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
                ghost
                actionRef={actionRef}
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
                <ProFormSelect
                    showSearch
                    rules={[
                        {
                            required: true
                        }
                    ]}
                    request={queryBlockOptions}
                    name="blockId" label="Block" />
            </ModalForm>
            <DrawerForm open={open} onOpenChange={setOpen} title={block?.name} onFinish={onSaveBlock} width={1000}>
                <Skeleton loading={loading}>
                    <FormSetting />
                </Skeleton>
            </DrawerForm>
        </>
    );
}

export default PageBlock;