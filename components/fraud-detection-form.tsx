"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  step: z.coerce.number().min(1, "Step must be at least 1"),
  type: z.enum(["PAYMENT", "CASH_IN", "DEBIT", "CASH_OUT", "TRANSFER"]),
  amount: z.coerce.number().min(0, "Amount must be positive"),
  oldbalanceOrg: z.coerce.number().min(0, "Balance must be positive"),
  oldbalanceDest: z.coerce.number().min(0, "Balance must be positive"),
});

type PredictionResponse = {
  fraud_prediction: boolean;
  success: boolean;
  message: string;
};

export function FraudDetectionForm() {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      step: 1,
      type: "TRANSFER",
      amount: 0,
      oldbalanceOrg: 0,
      oldbalanceDest: 0,
    } as const,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      setPrediction(null);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            step: values.step,
            type: values.type,
            amount: values.amount,
            oldbalanceOrg: values.oldbalanceOrg,
            oldbalanceDest: values.oldbalanceDest,
          }),
        }
      );

      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="step"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">
                    Time Step (hours)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1"
                      type="number"
                      min="1"
                      {...field}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">
                    Transaction Type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PAYMENT">Payment</SelectItem>
                      <SelectItem value="CASH_IN">Cash In</SelectItem>
                      <SelectItem value="DEBIT">Debit</SelectItem>
                      <SelectItem value="CASH_OUT">Cash Out</SelectItem>
                      <SelectItem value="TRANSFER">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="oldbalanceOrg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">
                    Initial Balance (Sender)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="oldbalanceDest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">
                    Initial Balance (Recipient)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Check Transaction"
            )}
          </Button>
        </form>
      </Form>

      {prediction && (
        <Alert
          className={`mt-6 ${
            prediction.fraud_prediction
              ? "bg-red-900/50 text-red-200"
              : "bg-green-900/50 text-green-200"
          }`}
        >
          {prediction.fraud_prediction ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          <AlertTitle>
            {prediction.fraud_prediction
              ? "Fraud Detected!"
              : "Transaction Safe"}
          </AlertTitle>
          <AlertDescription>{prediction.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
