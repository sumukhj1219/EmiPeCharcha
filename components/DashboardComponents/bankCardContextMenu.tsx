import React from 'react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import BankCards from '@/components/DashboardComponents/bankCards'

const BankCardContextMenu = () => {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <BankCards />
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>Add to Comparison</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default BankCardContextMenu