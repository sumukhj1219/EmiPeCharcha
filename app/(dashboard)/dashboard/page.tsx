import LoanComparisonChart from '@/components/ComparisonComponents/comparison'
import BankCardContextMenu from '@/components/DashboardComponents/bankCardContextMenu'
import React from 'react'


const DashboardPage = () => {
  return (
    <div>
      <BankCardContextMenu />
      <LoanComparisonChart />
    </div>
  )
}

export default DashboardPage