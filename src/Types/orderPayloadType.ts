import { PaymentMethod } from "../../generated/prisma/enums";

type OrderItemInput = {
  mealId: number;
  quantity: number;
};

export type OrderPayload = {
    items: OrderItemInput[];
    deliveryAddress: string;
    phone: string;
    paymentMethod : PaymentMethod;
    userId: string;
}

export type OrderItemData = {
   mealId: number;
   quantity: number;
   unitPrice: number;
};