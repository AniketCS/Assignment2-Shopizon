"use server";

import { prisma as db } from "@/lib/db/prisma";


  export async function createOrderItem(
    orderId: string,
    productId: string,
    quantity: number,
    price: number
  ) {
    try {
      const orderItem = await db.orderItem.create({
        data: {
          orderId,
          productId,
          quantity,
          price,
        },
        include: {
          order: {
            include: {
              user: true,
              business: true,
            },
          },
          product: {
            include: {
              business: true,
              brand: true,
            },
          },
        },
      });
      return orderItem;
    } catch (error) {
      console.error("Error creating order item:", error);
      throw new Error("Failed to create order item");
    }
  }


  export async function updateOrderItem(
    id: string,
    quantity?: number,
    price?: number
  ) {
    try {
      const updateData: {
        quantity?: number;
        price?: number;
      } = {};

      if (quantity !== undefined) updateData.quantity = quantity;
      if (price !== undefined) updateData.price = price;

      const orderItem = await db.orderItem.update({
        where: { id },
        data: updateData,
        include: {
          order: {
            include: {
              user: true,
              business: true,
            },
          },
          product: {
            include: {
              business: true,
              brand: true,
            },
          },
        },
      });
      return orderItem;
    } catch (error) {
      console.error("Error updating order item:", error);
      throw new Error("Failed to update order item");
    }
  }


  export async function deleteOrderItem(id: string) {
    try {
      const orderItem = await db.orderItem.delete({
        where: { id },
      });
      return orderItem;
    } catch (error) {
      console.error("Error deleting order item:", error);
      throw new Error("Failed to delete order item");
    }
  }


  export async function getOrderItemById(id: string) {
    try {
      const orderItem = await db.orderItem.findUnique({
        where: { id },
        include: {
          order: {
            include: {
              user: true,
              business: true,
            },
          },
          product: {
            include: {
              business: true,
              brand: true,
            },
          },
        },
      });
      if (!orderItem) {
        throw new Error("Order item not found");
      }
      return orderItem;
    } catch (error) {
      console.error("Error fetching order item by ID:", error);
      throw new Error("Failed to fetch order item by ID");
    }
  }


  export async function getOrderItemsByOrder(orderId: string) {
    try {
      const orderItems = await db.orderItem.findMany({
        where: { orderId },
        include: {
          product: {
            include: {
              business: true,
              brand: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      return orderItems;
    } catch (error) {
      console.error("Error fetching order items by order:", error);
      throw new Error("Failed to fetch order items by order");
    }
  }


  export async function getOrderItemsByProduct(productId: string) {
    try {
      const orderItems = await db.orderItem.findMany({
        where: { productId },
        include: {
          order: {
            include: {
              user: true,
              business: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return orderItems;
    } catch (error) {
      console.error("Error fetching order items by product:", error);
      throw new Error("Failed to fetch order items by product");
    }
  }


  export async function getAllOrderItems() {
    try {
      const orderItems = await db.orderItem.findMany({
        include: {
          order: {
            include: {
              user: true,
              business: true,
            },
          },
          product: {
            include: {
              business: true,
              brand: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return orderItems;
    } catch (error) {
      console.error("Error fetching all order items:", error);
      throw new Error("Failed to fetch all order items");
    }
  }


  export async function getOrderItemsByBusiness(businessId: string) {
    try {
      const orderItems = await db.orderItem.findMany({
        where: {
          product: {
            businessId,
          },
        },
        include: {
          order: {
            include: {
              user: true,
              business: true,
            },
          },
          product: {
            include: {
              business: true,
              brand: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return orderItems;
    } catch (error) {
      console.error("Error fetching order items by business:", error);
      throw new Error("Failed to fetch order items by business");
    }
  }


  export async function calculateOrderTotal(orderId: string) {
    try {
      const orderItems = await db.orderItem.findMany({
        where: { orderId },
        select: {
          quantity: true,
          price: true,
        },
      });

      const total = orderItems.reduce((sum, item) => {
        return sum + (item.quantity * item.price);
      }, 0);

      return total;
    } catch (error) {
      console.error("Error calculating order total:", error);
      throw new Error("Failed to calculate order total");
    }
  }


  export async function updateQuantityAndRecalculateTotal(
    id: string,
    quantity: number
  ) {
    try {
      // Update the order item
      const updatedOrderItem = await db.orderItem.update({
        where: { id },
        data: { quantity },
        include: {
          order: true,
        },
      });

      // Recalculate the order total
      const newTotal = await calculateOrderTotal(updatedOrderItem.orderId);

      // Update the order total
      await db.order.update({
        where: { id: updatedOrderItem.orderId },
        data: { total: newTotal },
      });

      return updatedOrderItem;
    } catch (error) {
      console.error("Error updating quantity and recalculating total:", error);
      throw new Error("Failed to update quantity and recalculate total");
    }
  }
