import { postType } from "./PostType";

export interface PostInputDTO {
    photo: string,
    description: string,
    type?: postType,
    author: string
}