import { ProForm, ProFormTextArea } from "@ant-design/pro-components";
import { useEffect } from "react";
import { BlockProps } from "./typings";

const MajorGeneralBlock: React.FC<BlockProps> = (props) => {

    const form = ProForm.useFormInstance();
    useEffect(() => {
        if (props.data) {
            form.setFields([
                {
                    name: 'introduce',
                    value: props.data?.introduce
                },
                {
                    name: 'lecturer',
                    value: props.data?.lecturer
                },
                {
                    name: 'career',
                    value: props.data?.career
                },
                {
                    name: 'opportunity',
                    value: props.data?.opportunity
                }
            ]);
        }
    }, [props.data])

    return (
        <>
            <ProFormTextArea label="THÔNG TIN VỀ NGÀNH" name="introduce" />
            <ProFormTextArea label="ĐỘI NGŨ GIẢNG VIÊN" name="lecturer" />
            <ProFormTextArea label="CƠ HỘI VIỆC LÀM" name="career" />
            <ProFormTextArea label="CƠ HỘI PHÁT TRIỂN" name="opportunity" />
        </>
    )
}

export default MajorGeneralBlock;