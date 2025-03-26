"use client"
import { useContext, createContext, useState } from "react";
import { BankContextProps, BankProps } from "@/interfaces/interface";
import loanData from "@/data/loanData";

const BankContext = createContext<BankContextProps | undefined>(undefined)

export function BankContextProvider({ children }: { children: React.ReactNode }) {
    const [firstBank, setFirstBank] = useState<BankProps>(loanData[0])
    const [secondBank, setSecondBank] = useState<BankProps>(loanData[1])

    
    return <BankContext.Provider value=
        {{
            firstBank,
            secondBank,
            setFirstBank,
            setSecondBank,
        }}>
        {children}
    </BankContext.Provider>
}

export const useBankContext = () => {
    const context = useContext(BankContext)
    if(!context)
        throw new Error("Unable to create context")
    return context
}