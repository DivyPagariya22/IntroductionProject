import { request, gql } from "graphql-request";

export const getAllInventory = async () => {
  const query = gql`
    {
      medicines {
        id
        name
        MRP
        InStock
        ExpiryDate
        GST
      }
    }
  `;

  const data = await request("http://localhost:4000/", query);
  console.log(data.medicines);
  return data.medicines;
};

export const getAllSales = async () => {
  const query = gql`
    {
      sales {
        id
        date
        total
      }
    }
  `;

  const data = await request("http://localhost:4000/", query);
  //console.log(data);
  return data.sales;
};

export const getAllPurchases = async () => {
  const query = gql`
    {
      purchases {
        id
        date
        total
      }
    }
  `;

  const data = await request("http://localhost:4000/", query);
  //console.log(data);
  return data.purchases;
};
