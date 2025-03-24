import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <UmiSelectLang />
  );
};

export const Question = () => {
  return (
    <a
      className='h-10 w-10 flex items-center justify-center'
      href='https://help.dhhp.edu.vn' target='_blank' rel='noreferrer'
    ><QuestionCircleOutlined className='text-lg' /></a>
  );
};