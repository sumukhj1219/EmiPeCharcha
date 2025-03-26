
export interface BankContextProps{
    firstBank: BankProps
    secondBank: BankProps 
    setFirstBank:(firstBank:BankProps)=>void;
    setSecondBank:(secondBank:BankProps)=>void;
}

export interface BankProps {
    id: number;
    bank: string;
    principal: number;
    minInterest: any;  
    maxInterest: any;  
    tenure: number;
    fee: string;
    tag_1: string;
    tag_2: string | undefined | null;
}
