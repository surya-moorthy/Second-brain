import { createContext, useContext, useState, type ReactNode } from "react";

type ModalContextProps = {
    isOpen : boolean;
    openModal : ()=>void;
    closeModal : ()=>void;
}

const ModalContext = createContext<ModalContextProps>({
    isOpen : false,
    openModal : ()=>{},
    closeModal : ()=>{}
});

export const  ModalProvider = ({children} : {children : ReactNode}) => {
       const [isOpen,setIsOpen] = useState(false);

       const openModal = ()=> setIsOpen(true);
       const closeModal = ()=> setIsOpen(false);

       return (
        <ModalContext.Provider value={{isOpen,openModal,closeModal}}>
             {children}
        </ModalContext.Provider>
       )
}

export const useModal = () => useContext(ModalContext);