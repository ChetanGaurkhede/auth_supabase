import {create} from "zustand"
import { Iuser } from "../interfaces"

const userGlobalStore = create((set) => ({
  user: null,
  setUser: (user: Iuser) => set({user})
}))

export default userGlobalStore;
export interface IuserGlobalStore{
  user: Iuser;
  setUser: (user: Iuser) => void; 
}