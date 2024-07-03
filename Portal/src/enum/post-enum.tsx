export enum PostType {
    DEFAULT,
    PAGE,
    NEWS,
    NOTIFICATION,
    GALLERY,
    ADMISSION
}

export const ListPostType = [
    {
        value: PostType.PAGE,
        label: 'Trang'
    },
    {
        value: PostType.NEWS,
        label: 'Tin tức'
    },
    {
        value: PostType.NOTIFICATION,
        label: 'Thông báo'
    },
    {
        value: PostType.ADMISSION,
        label: 'Tuyển sinh'
    }
]