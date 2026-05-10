import { Order } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { OrderItemData, OrderPayload } from "../../Types/orderPayloadType";

const orderCreate = async (payload: OrderPayload) => {

    const { items, deliveryAddress, phone, paymentMethod } = payload;

    let totalAmount = 0;

    const orderItemsData: OrderItemData[] = [];

    let providerId: string | null = null;


  for(const item of items){

    // validate meal exist
    const mealData = await prisma.meal.findUnique({
        where: {
            id: item.mealId
        }
    })

    if(!mealData){
        throw new Error("Sorry , Can not find meal!")
    }

    if(!providerId){
        providerId = mealData.providerId
    }

    if(providerId !== mealData.providerId){
        throw new Error("You cannot order meals from different providers in one order")
    }


    // price adding 
    const subTotal = mealData.price.toNumber() * item.quantity;

    // accumulate subTotal
    totalAmount += subTotal;

    // adding data on orderItem array
    orderItemsData.push({
        mealId : item.mealId,
        quantity: item.quantity,
        unitPrice: mealData.price.toNumber()
    })

  };

//   creating order and orderItem
  const createdOrder = await prisma.$transaction(async(tx)=>{

        const addOrder = await tx.order.create({
            data: {
                totalAmount,
                deliveryAddress,
                phone,
                providerId: providerId!,
                paymentMethod
            }
        });

        await tx.orderItem.createMany({
            data: orderItemsData.map((item)=> ({
                orderId: addOrder.id,
                mealId: item.mealId,
                quantity: item.quantity,
                unitPrice: item.unitPrice

            }))
            
        });

        return addOrder;
  })


  const result = await prisma.order.findUnique({
    where: {
        id: createdOrder.id
    },
    include: {
        orderItems: {
            include: {
                meal: {
                    select : {
                        name : true
                    }
                }
            }
        }
    }
  })


  return result;
    
}

export const orderService = {
    orderCreate,
}