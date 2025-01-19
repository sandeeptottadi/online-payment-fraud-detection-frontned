# Online Payment Fraud Detection

## Introduction

Online payment is the most popular transaction method in the world today. However, with an increase in online payments also comes a rise in payment fraud. This project implements a machine learning-based system for **identifying fraudulent and non-fraudulent payments** with both API and user interface.

## Dataset Overview

The dataset consists of 10 variables:

- `step`: represents a unit of time where 1 step equals 1 hour
- `type`: type of online transaction
- `amount`: the amount of the transaction
- `nameOrig`: customer starting the transaction
- `oldbalanceOrg`: balance before the transaction
- `newbalanceOrig`: balance after the transaction
- `nameDest`: recipient of the transaction
- `oldbalanceDest`: initial balance of recipient before the transaction
- `newbalanceDest`: the new balance of recipient after the transaction
- `isFraud`: fraud transaction

## Technical Stack

### Backend

- FastAPI for REST API
- Scikit-learn for ML model
- Python 3.10+
- NumPy for numerical operations
- Pandas for data processing

### Frontend

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Hook Form with Zod validation

## Machine Learning Implementation

### Model Details

- Algorithm: Random Forest Classifier
- Training Accuracy: 99.9% (AUC Score)
- Feature Engineering: 5 key features selected
- Preprocessing: StandardScaler for numerical features

### Key Features Used

1. Time step (hourly intervals)
2. Transaction type (PAYMENT, CASH_IN, DEBIT, CASH_OUT, TRANSFER)
3. Transaction amount
4. Sender's initial balance
5. Recipient's initial balance

## API Documentation

### Base URL

### Python Libraries

pandas, numpy, seaborn, matplotlib, tabulate, sklearn

Random Forest and Naive Bayes were used to identify online payment fraud due to the large dataset.

![image](https://user-images.githubusercontent.com/118715799/210950017-e4d317e0-6bf4-4ecd-8313-9b8121e04e9f.png)

Read the complete Online Payment Fraud Detection project [here](https://github.com/seuwenfei/Online-payment-fraud-detection/blob/main/online-payment-fraud-detection.ipynb).

## Conclusion

The best performing model is **Random Forest** for identifying fraudulent and non-fraudulent payments.
