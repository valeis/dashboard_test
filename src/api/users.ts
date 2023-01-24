import { UserProps } from "../types/UserProps";
import axios_instance from "./api_instance";

const usersRequest = {
  delete: async (id: string) => {
    const res = await axios_instance.delete(`/users/${id}`);
    return res.data;
  },

  get: async () => {
    const res = await axios_instance.get('/users');
    return res.data;
  },

  getById: async (id: string) => {
    const res = await axios_instance.get(`/users/${id}`);
    return res.data;
  },

  getAuth: async (email?: string, password?: string) => {
    const res = await axios_instance.get(`users/?email=${email || null}&password=${password || null}`);
    return res.data
},

  put:async (id:string, user:UserProps) => {
    const res = await axios_instance.put(`/users/${id}`, user)
    return res.data
  },

  post:async (user: UserProps) => {
    const res = await axios_instance.post('users', user);
    return res.data
  }

};

export default usersRequest;