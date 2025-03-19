// logged in user global state with zustand store
import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"

interface IModalStore {
    modal: boolean
    setModal: (modal: boolean) => void
}

export const useModalStore = createWithEqualityFn<IModalStore>()((set) => {
    return {
        modal: false,
        // * actions
        setModal: (modal: boolean) => {
            set(() => ({ modal: modal }))
        },
    }
}, shallow)
