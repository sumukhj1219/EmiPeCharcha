"use client";

import { useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useBankContext } from "@/contexts/context";

export default function LoanComparison() {
  const { firstBank, secondBank } = useBankContext();

  const filteredBank = useMemo(() => [firstBank, secondBank].filter(Boolean), [firstBank, secondBank]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4">
      <Card>
        <CardHeader>
          <CardTitle>Loan Amount & Tenure</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredBank} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="bank" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="principal" fill="#8884d8" name="Loan Amount (L)" />
              <Bar dataKey="tenure" fill="#82ca9d" name="Tenure (Years)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interest Rate Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredBank} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="bank" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="minInterest" stroke="#ff7300" name="Min Interest (%)" />
              <Line type="monotone" dataKey="maxInterest" stroke="#007bff" name="Max Interest (%)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Processing Fee & Special Features</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bank</TableHead>
                <TableHead>Processing Fee</TableHead>
                <TableHead>Special Features</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBank.map((loan) => (
                <TableRow key={loan?.id}>
                  <TableCell>{loan?.bank}</TableCell>
                  <TableCell>{loan?.fee}</TableCell>
                  <TableCell>
                    {loan?.tag_1}
                    {loan?.tag_2 && `, ${loan.tag_2}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
