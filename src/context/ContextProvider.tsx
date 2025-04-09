import { ReactNode } from "react";
import { ProfileBoxContextProvider } from "./ProfileBoxContextProvider";

export default function ContextProvider({children}: {children: ReactNode}) {
    return (
        <ProfileBoxContextProvider>
            {children}
        </ProfileBoxContextProvider>
    ) 
}
