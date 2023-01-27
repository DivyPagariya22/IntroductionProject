import { PrismaClient } from "@prisma/client";
import Purchase, { Sales } from "./helper";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    medicines: async () => {
      const meds = await prisma.medicine.findMany();
      return meds;
    },
    purchases: async () => {
      const purchases = await prisma.purchase.findMany();
      return purchases;
    },
    sales: async () => {
      const sales = await prisma.saleBill.findMany();
      console.log(sales);
      return sales;
    },
  },
  Mutation: {
    createPurchase: async (parent, args) => {
      await Purchase(args.id, args.input);
      const allPurchase = await prisma.purchase.findMany();
      return allPurchase;
    },
    createSales: async (parent, args) => {
      await Sales(args.id, args.input);
      const allSales = await prisma.saleBill.findMany();
      return allSales;
    },
  },
};
