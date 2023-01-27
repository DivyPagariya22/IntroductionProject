import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function Purchase(id: number, items) {
  let amount = 0;

  console.log(items.length);
  for (let i = 0; i < items.length; i++) {
    // console.log(items[i]);
    let med = await prisma.medicine.findUnique({
      where: {
        name: items[i].name,
      },
    });

    if (!med) {
      med = await prisma.medicine.create({
        data: {
          MRP: items[i].MRP,
          GST: 13,
          ExpiryDate: new Date(),
          InStock: items[i].Quantity,
          name: items[i].name,
        },
      });
    } else {
      let newStock = items[i].Quantity + med.InStock;
      const updateMedicine = await prisma.medicine.update({
        where: {
          name: med.name,
        },
        data: {
          InStock: newStock,
        },
      });
    }

    let new_MRP: number;
    if (!items[i].MRP) new_MRP = med.MRP;
    else new_MRP = items[i].MRP;

    amount += items[i].Quantity * new_MRP;

    const newPurchaseIem = await prisma.purchaseBillItem.create({
      data: {
        bill_id: id,
        item_id: med.id,
        item_name: med.name,
        Quantity: items[i].Quantity,
        MRP: new_MRP,
        ExpiryDate: new Date(),
      },
    });
  }

  const newPurchaseIem = await prisma.purchase.create({
    data: {
      date: new Date(),
      id: id,
      total: amount,
    },
  });
  //console.log(id, amount);
}

export async function Sales(id: number, items) {
  let amount: number = 0;
  for (let i = 0; i < items.length; i++) {
    let med = await prisma.medicine.findUnique({
      where: {
        name: items[i].name,
      },
    });

    if (!med) {
      console.log("NO Medicines Presenter");
      return;
    } else {
      let newStock = med.InStock - items[i].Quantity;
      const updateMedicine = await prisma.medicine.update({
        where: {
          name: med.name,
        },
        data: {
          InStock: newStock,
        },
      });
    }

    amount += items[i].Quantity * med.MRP;
    const salesBillItem = await prisma.saleBillItem.create({
      data: {
        bill_id: id,
        item_id: med.id,
        item_name: med.name,
        Quantity: items[i].Quantity,
      },
    });
  }
  const newSale = await prisma.saleBill.create({
    data: {
      date: new Date(),
      id: id,
      total: amount,
    },
  });
}
