export interface CheckoutState {
  status: "idle" | "success" | "error";
  message: string;
  orderId?: string;
}
