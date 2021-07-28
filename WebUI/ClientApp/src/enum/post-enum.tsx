export enum PostType {
    DEFAULT,
    PAGE,
    NEWS,
    NOTIFICATION
}

export const ListPostType = [
    {
        value: PostType.DEFAULT,
        name: 'Default'
    },
    {
        value: PostType.PAGE,
        name: 'Page'
    },
    {
        value: PostType.NEWS,
        name: 'News'
    },
    {
        value: PostType.NOTIFICATION,
        name: 'Notification'
    }
]