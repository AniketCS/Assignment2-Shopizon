"use server";

import { prisma as db } from "@/lib/db/prisma";


  export async function getProducts() {
    try {
      const products = await db.product.findMany({
        include: {
          business: true,
          brand: true,
        },
      });
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }


  export async function createProduct(
    name: string,
    description: string | null,
    price: number,
    stock: number,
    businessId: string,
    brandId: string
  ) {
    try {
      const product = await db.product.create({
        data: {
          name,
          description,
          price,
          stock,
          businessId,
          brandId,
        },
        include: {
          business: true,
          brand: true,
        },
      });
      return product;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
    }
  }


  export async function updateProduct(
    id: string,
    name?: string,
    description?: string | null,
    price?: number,
    stock?: number,
    businessId?: string,
    brandId?: string
  ) {
    try {
      const updateData: {
        name?: string;
        description?: string | null;
        price?: number;
        stock?: number;
        businessId?: string;
        brandId?: string;
      } = {};

      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (price !== undefined) updateData.price = price;
      if (stock !== undefined) updateData.stock = stock;
      if (businessId !== undefined) updateData.businessId = businessId;
      if (brandId !== undefined) updateData.brandId = brandId;

      const product = await db.product.update({
        where: { id },
        data: updateData,
        include: {
          business: true,
          brand: true,
        },
      });
      return product;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product");
    }
  }


  export async function deleteProduct(id: string) {
    try {
      const product = await db.product.delete({
        where: { id },
      });
      return product;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product");
    }
  }


  export async function getProductById(id: string) {
    try {
      const product = await db.product.findUnique({
        where: { id },
        include: {
          business: true,
          brand: true,
          images: true,
          categories: {
            include: {
              category: true,
            },
          },
          orderItems: true,
        },
      });
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw new Error("Failed to fetch product by ID");
    }
  }


  export async function getProductsByName(name: string) {
    try {
      const products = await db.product.findMany({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
        include: {
          business: true,
          brand: true,
        },
      });
      return products;
    } catch (error) {
      console.error("Error fetching products by name:", error);
      throw new Error("Failed to fetch products by name");
    }
  }

  export async function getProductsWithBusiness() {
    try {
      const products = await db.product.findMany({
        include: {
          business: true,
          brand: true,
        },
      });
      return products;
    } catch (error) {
      console.error("Error fetching products with business:", error);
      throw new Error("Failed to fetch products with business");
    }
  }


  export async function getProductsByBusiness(businessId: string) {
    try {
      const products = await db.product.findMany({
        where: {
          businessId,
        },
        include: {
          business: true,
          brand: true,
          images: true,
        },
      });
      return products;
    } catch (error) {
      console.error("Error fetching products by business:", error);
      throw new Error("Failed to fetch products by business");
    }
  }


  export async function getProductsByBrand(brandId: string) {
    try {
      const products = await db.product.findMany({
        where: {
          brandId,
        },
        include: {
          business: true,
          brand: true,
        },
      });
      return products;
    } catch (error) {
      console.error("Error fetching products by brand:", error);
      throw new Error("Failed to fetch products by brand");
    }
  }


  export async function getProductsByPriceRange(minPrice: number, maxPrice: number) {
    try {
      const products = await db.product.findMany({
        where: {
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
        include: {
          business: true,
          brand: true,
        },
      });
      return products;
    } catch (error) {
      console.error("Error fetching products by price range:", error);
      throw new Error("Failed to fetch products by price range");
    }
  }


  export async function getLowStockProducts(threshold: number = 10) {
    try {
      const products = await db.product.findMany({
        where: {
          stock: {
            lte: threshold,
          },
        },
        include: {
          business: true,
          brand: true,
        },
        orderBy: {
          stock: 'asc',
        },
      });
      return products;
    } catch (error) {
      console.error("Error fetching low stock products:", error);
      throw new Error("Failed to fetch low stock products");
    }
  }
