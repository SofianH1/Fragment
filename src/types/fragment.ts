export type Fragment = {
    id: string,
    title: string,
    content: string,
    tags: string[],
    createdAt: string,
    updatedAt: string,
    isPinned?:boolean,
    collectionId?:string,
}