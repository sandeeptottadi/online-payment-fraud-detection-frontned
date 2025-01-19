import { FraudDetectionForm } from "@/components/fraud-detection-form";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Online Fraud Detection
          </h1>
          <p className="text-gray-400">
            Enter transaction details to check for potential fraud
          </p>
        </div>
        <FraudDetectionForm />
      </div>
    </main>
  );
}
