import { queryBlock } from "@/services/block";
import { ProForm, ProFormSelect, ProFormTextArea } from "@ant-design/pro-components";
import { useEffect } from "react";

type Props = {
    id: string;
}

const MajorGeneralBlock: React.FC<Props> = ({ id }) => {

    const form = ProForm.useFormInstance();
    useEffect(() => {
        if (id) {
            queryBlock(id).then(response => {
                form.setFields([
                    {
                        name: 'introduce',
                        value: response.introduce
                    },
                    {
                        name: 'lecturer',
                        value: response.lecturer
                    },
                    {
                        name: 'career',
                        value: response.career
                    },
                    {
                        name: 'opportunity',
                        value: response.opportunity
                    }
                ]);
            })
        }
    }, [id])

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