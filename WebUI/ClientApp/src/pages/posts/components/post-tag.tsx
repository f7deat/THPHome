import { Input, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';

interface IPostTagProps {
    tags: any,
    setTags: any
}

const PostTag = (props: IPostTagProps) => {

    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [editInputIndex, setEditInputIndex] = useState(-1)
    const [editInputValue, setEditInputValue] = useState('')
    const [editInput, setEditInput] = useState<any>()
    const [input, setInput] = useState<any>()

    const handleClose = (removedTag: any) => {
        props.setTags(props.tags.filter((tag: string) => tag !== removedTag))
        console.log(props.tags);
    };

    const showInput = () => {
        input?.focus();
        setInputVisible(true);
    };

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value)
    };

    const handleInputConfirm = () => {
        if (inputValue && props.tags.indexOf(inputValue) === -1) {
            props.setTags([...props.tags, inputValue]);
        }
        setInputValue('');
        setInputVisible(false);

    };

    const handleEditInputChange = (e: any) => {
        setEditInputValue(e.target.value)
    };

    const handleEditInputConfirm = () => {
        const updateTags = [...props.tags];
        updateTags[editInputIndex] = editInputValue;
        props.setTags(updateTags);
        setEditInputIndex(-1);
        setInputValue('');
        console.log(props.tags)
    };

    const saveInputRef = (input: any) => {
        setInput(input)
    };

    const saveEditInputRef = (input: any) => {
        setEditInput(input);
    };

    return (
        <div>
            {props.tags.map((tag: string, index: number) => {
                if (editInputIndex === index) {
                    return (
                        <Input
                            ref={saveEditInputRef}
                            key={tag}
                            size="small"
                            style={{ width: '78px', marginRight: '8px', verticalAlign: 'top' }}
                            value={editInputValue}
                            onChange={handleEditInputChange}
                            onBlur={handleEditInputConfirm}
                            onPressEnter={handleEditInputConfirm}
                        />
                    );
                }

                const isLongTag = tag.length > 20;

                const tagElem = (
                    <Tag
                        style={{ userSelect: 'none' }}
                        key={tag}
                        closable
                        onClose={() => handleClose(tag)}
                    >
                        <span
                            onDoubleClick={e => {
                                setEditInputIndex(index);
                                setEditInputValue(tag)
                                editInput?.focus();
                                e.preventDefault();
                            }}
                        >
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </span>
                    </Tag>
                );
                return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                        {tagElem}
                    </Tooltip>
                ) : (
                        tagElem
                    );
            })}
            {inputVisible && (
                <Input
                    ref={saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: '78px', marginRight: '8px', verticalAlign: 'top' }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                <Tag style={{ borderStyle: 'dashed' }} onClick={showInput}>
                    <PlusOutlined /> New Tag
                </Tag>
            )}
        </div>
    )
}

export default PostTag