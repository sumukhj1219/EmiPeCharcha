"use client"
import React, { useState } from "react";
import data from "@/data/data.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useBankContext } from "@/contexts/context";
import loanData from "@/data/loanData";
const BankCards = () => {
  const [visibleCards, setVisibleCards] = useState(3);
  const { setFirstBank, setSecondBank, firstBank, secondBank } = useBankContext()

  function handleClick(bankId: number) {
    const selectedBank = loanData.find(bank => bank.id === bankId);
    if (!selectedBank) return;
  
    if (!firstBank) {
      setFirstBank(selectedBank);
    } else if (!secondBank && firstBank.id !== bankId) {
      setSecondBank(selectedBank);
    } else if (firstBank.id !== bankId && secondBank.id !== bankId) {
      setFirstBank(secondBank);
      setSecondBank(selectedBank);
    }
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Loan Comparison and Recommendation</h1>
      <Separator className="mt-4 mb-4 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.slice(0, visibleCards).map((bank) => (
          <Card key={bank.id} className="shadow-lg rounded-2xl p-4 border border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold">{bank.bank}</CardTitle>
              <CardDescription className="text-sm text-gray-500">Processing Fee: {bank.fee}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-center gap-2">
                {bank.tag_1 && <Badge variant="outline" className="bg-blue-100 text-blue-700">{bank.tag_1}</Badge>}
                {bank.tag_2 && <Badge variant="outline" className="bg-green-100 text-green-700">{bank.tag_2}</Badge>}
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">Loan Amount: <span className="font-semibold">{bank.principal}</span></p>
                <p className="text-sm font-medium">Interest Rate: <span className="font-semibold">{bank.roi}</span></p>
                <p className="text-sm font-medium">Tenure: <span className="font-semibold">{bank.tenure}</span></p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="default" onClick={() => handleClick(bank.id)}>Add to comparison</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {visibleCards < data.length ? (
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={() => setVisibleCards(visibleCards + 7)}>Show More</Button>
        </div>
      ) : (<div className="flex justify-center mt-4">
        <Button variant="outline" onClick={() => setVisibleCards(visibleCards - 7)}>Show Less</Button>
      </div>)}
    </div>
  );
};

export default BankCards;
