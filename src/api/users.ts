
import { User } from "../types/User";
import axiosInstance from "./apiInstance";

const usersRequest = {
  delete: async (id: string) => {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
  },

  get: async () => {
    const res = await axiosInstance.get<User[]>('/users');
    return res.data;
  },

  getById: async (id: string) => {
    const res = await axiosInstance.get<User>(`/users/${id}`);
    return res.data;
  },

  getAuth: async (auth: {email: string, password: string}) => {
    const res = await axiosInstance.get(`users/?email=${auth.email || null}&password=${auth.password || null}`);
    return res.data
},

  put:async (id:string, user:User) => {
    const res = await axiosInstance.put(`/users/${id}`, user)
    return res.data
  },

  post:async (user: User) => {
    const res = await axiosInstance.post('users', user);
    return res.data
  }

};

export default usersRequest;