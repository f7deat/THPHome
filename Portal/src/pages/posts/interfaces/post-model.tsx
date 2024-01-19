interface IPost {
    id?: number;
    title?: string;
    description?: string;
    createdDate?: Date;
    createdBy?: Date;
    content?: string;
    modifiedBy?: string;
    modifiedDate?: Date;
    status?: number;
    tags?: string;
    thumbnail?: string;
    type?: number;
    url?: string;
    view?: number;
}
export default IPost