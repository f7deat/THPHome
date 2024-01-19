enum BANNER_TYPE {
    DEFAULT,
    SLIDE,
    POST,
    PHOTO
}

const LIST_BANNER_TYPE = [
    {
        id: BANNER_TYPE.DEFAULT,
        name: 'Default'
    },
    {
        id: BANNER_TYPE.SLIDE,
        name: 'Slide'
    },
    {
        id: BANNER_TYPE.POST,
        name: 'Post'
    },
    {
        id: BANNER_TYPE.PHOTO,
        name: 'Photo'
    }
]

export { LIST_BANNER_TYPE, BANNER_TYPE }