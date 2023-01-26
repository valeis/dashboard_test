import { CardProps } from "../types/CardProps";
import axiosInstance from "./apiInstance";

const postsRequest = {
    delete: async (id: string) => {
        const res = await axiosInstance.delete(`/posts/${id}`);
        return res.data;
    },

    get: async() => {
        const res = await axiosInstance.get<CardProps[]>('/posts');
        return res.data;
    },

    getById: async (id?:string) => {
        const res = await axiosInstance.get<CardProps>(`posts/${id}`);
        return res.data;
    },

    post: async (post: CardProps ) => {
        const res = await axiosInstance.post('posts', post);
        return res.data;
    },

    put: async (id?:string, post?:CardProps) => {
        const res = await axiosInstance.put(`posts/${id}`, post);
        return res.data
    }
}

export default postsRequest;