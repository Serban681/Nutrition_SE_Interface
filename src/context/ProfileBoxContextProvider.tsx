import { createContext, ReactNode, useContext, useState } from "react"

interface ProfileBoxContextType {
    isOpen: boolean;
    toggleIsOpen: () => void
}

export const ProfileBoxContext = createContext<ProfileBoxContextType | undefined>(undefined)

export function ProfileBoxContextProvider({children} : {children: ReactNode}) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <ProfileBoxContext.Provider value={{isOpen, toggleIsOpen}}>
            {children}
        </ProfileBoxContext.Provider>
    )
}

export const useProfileBox = (): ProfileBoxContextType => {
    const context = useContext(ProfileBoxContext)
    
    if(!context)
        return {isOpen: false, toggleIsOpen: () => {}}

    return context
}
