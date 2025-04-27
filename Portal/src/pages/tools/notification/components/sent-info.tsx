import { Drawer, DrawerProps } from "antd"

type Props = DrawerProps & {
    notification?: any
}

const SentInfo: React.FC<Props> = (props) => {

    const { notification } = props;

    return (
        <Drawer {...props} title={notification?.title} width={800}>

        </Drawer>
    )
}

export default SentInfo;