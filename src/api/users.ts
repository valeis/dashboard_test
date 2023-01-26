import { UserProps } from "../types/UserProps";
import axiosInstance from "./apiInstance";

const usersRequest = {
  delete: async (id: string) => {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
  },

  get: async () => {
    const res = await axiosInstance.get<UserProps[]>('/users');
    return res.data;
  },

  getById: async (id: string) => {
    const res = await axiosInstance.get<UserProps>(`/users/${id}`);
    return res.data;
  },

  getAuth: async (email?: string, password?: string) => {
    const res = await axiosInstance.get(`users/?email=${email || null}&password=${password || null}`);
    return res.data
},

  put:async (id:string, user:UserProps) => {
    const res = await axiosInstance.put(`/users/${id}`, user)
    return res.data
  },

  post:async (user: UserProps) => {
    const res = await axiosInstance.post('users', user);
    return res.data
  }

};

export default usersRequest;