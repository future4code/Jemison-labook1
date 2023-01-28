import { postType } from "./PostType"

export interface Post {
    id: string,
    photo: string,
    description: string,
    type?: postType,
    author: string
}