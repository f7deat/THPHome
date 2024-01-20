export enum PostType {
    DEFAULT,
    PAGE,
    NEWS,
    NOTIFICATION
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
    }
]