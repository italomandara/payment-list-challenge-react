export type Nullable<T extends object> = T | null;

export type PaymentStatus = "completed" | "pending" | "failed";

export interface Payment {
  amount: number;
  currency: string;
  customerAddress: string;
  customerName: string;
  date: string;
  description: string;
  id: string;
  status: PaymentStatus;
}

export type Payments = Payment[];

interface Response {
  page: number;
  pageSize: number;
  total: number;
}

export interface PaymentSearchResponse extends Response {
  payments: Payments;
}

export interface Query {
  search?: string;
  currency?: string;
  page?: number;
  pageSize?: number;
}
