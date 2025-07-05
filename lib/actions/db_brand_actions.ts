"use server";

import { prisma as db } from "@/lib/db/prisma";


  export async function getBrands() {
    try {
      const brands = await db.brand.findMany({
        include: {
          products: {
            include: {
              business: true,
            },
          },
        },
      });
      return brands;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw new Error("Failed to fetch brands");
    }
  }


  export async function createBrand(
    name: string,
    description?: string,
    logo?: string,
    website?: string
  ) {
    try {
      const brand = await db.brand.create({
        data: {
          name,
          description,
          logo,
          website,
        },
      });
      return brand;
    } catch (error) {
      console.error("Error creating brand:", error);
      throw new Error("Failed to create brand");
    }
  }


  export async function updateBrand(
    id: string,
    name?: string,
    description?: string | null,
    logo?: string | null,
    website?: string | null
  ) {
    try {
      const updateData: {
        name?: string;
        description?: string | null;
        logo?: string | null;
        website?: string | null;
      } = {};

      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (logo !== undefined) updateData.logo = logo;
      if (website !== undefined) updateData.website = website;

      const brand = await db.brand.update({
        where: { id },
        data: updateData,
      });
      return brand;
    } catch (error) {
      console.error("Error updating brand:", error);
      throw new Error("Failed to update brand");
    }
  }


  export async function deleteBrand(id: string) {
    try {
      const brand = await db.brand.delete({
        where: { id },
      });
      return brand;
    } catch (error) {
      console.error("Error deleting brand:", error);
      throw new Error("Failed to delete brand");
    }
  }


  export async function getBrandById(id: string) {
    try {
      const brand = await db.brand.findUnique({
        where: { id },
        include: {
          products: {
            include: {
              business: true,
            },
          },
        },
      });
      if (!brand) {
        throw new Error("Brand not found");
      }
      return brand;
    } catch (error) {
      console.error("Error fetching brand by ID:", error);
      throw new Error("Failed to fetch brand by ID");
    }
  }


  export async function getBrandByName(name: string) {
    try {
      const brand = await db.brand.findUnique({
        where: { name },
        include: {
          products: {
            include: {
              business: true,
            },
          },
        },
      });
      if (!brand) {
        throw new Error("Brand not found");
      }
      return brand;
    } catch (error) {
      console.error("Error fetching brand by name:", error);
      throw new Error("Failed to fetch brand by name");
    }
  }


  export async function searchBrandsByName(searchTerm: string) {
    try {
      const brands = await db.brand.findMany({
        where: {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        include: {
          products: {
            include: {
              business: true,
            },
          },
        },
      });
      return brands;
    } catch (error) {
      console.error("Error searching brands by name:", error);
      throw new Error("Failed to search brands by name");
    }
  }


  export async function getBrandsWithProductCount() {
    try {
      const brands = await db.brand.findMany({
        include: {
          _count: {
            select: { products: true },
          },
        },
      });
      return brands;
    } catch (error) {
      console.error("Error fetching brands with product count:", error);
      throw new Error("Failed to fetch brands with product count");
    }
  }

