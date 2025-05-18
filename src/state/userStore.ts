import {create} from 'zustand'

interface UserStore{
    token: string
    setToken: (token: string) => void
}

const useUserStore = create<UserStore>()((set) => ({
    token: "",
    setToken: (token: string) => set((state: UserStore)=>({token: token}))
}))


export default useUserStore