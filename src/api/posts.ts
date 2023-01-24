import { CardProps } from "../types/CardProps";
import axios_instance from "./api_instance";

const postsRequest = {
    delete: async (id: string) => {
        const res = await axios_instance.delete(`/posts/${id}`);
        return res.data;
    },

    get: async() => {
        const res = await axios_instance.get('/posts');
        return res.data;
    },

    getById: async (id?:string) => {
        const res = await axios_instance.get(`posts/${id}`);
        return res.data;
    },

    post: async (post: CardProps ) => {
        const res = await axios_instance.post('posts', post);
        return res.data;
    },

    put: async (id?:string, post?:CardProps) => {
        const res = await axios_instance.put(`posts/${id}`, post);
        return res.data
    }
}

export default postsRequest;