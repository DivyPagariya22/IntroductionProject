import { makeExecutableSchema } from "@graphql-tools/schema";

export const typeDefs = `
  scalar DateTime
  type medicine {
    id: ID
    name: String
    MRP: Int
    GST: Int
    ExpiryDate: DateTime
    InStock: Int
  }

  type purchase {
    id: ID
    date: DateTime
    total: Int
    
  }

  type sale {
    id: ID
    total: Int
    date: DateTime
    
  }

  type Query {
    medicines: [medicine]!
    purchases: [purchase]
    sales: [sale]
  }

  input PurchaseItemInput {
    name: String
    MRP: Int
    Quantity: Int
  }

  input SalesItemInput {
    name: String
    Quantity: Int
  }

  type Mutation {
    createPurchase(id: Int, input: [PurchaseItemInput]): [purchase]
    createSales(id: Int, input: [SalesItemInput]): [sale]
  }
`;
