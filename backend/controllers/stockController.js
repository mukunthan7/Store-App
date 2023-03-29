import {PrismaClient} from "@prisma/client"
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();


const getStock = async (req, res) => {
    try {
        const transaction = await prisma.transaction.findMany({
            include: {
                productName: true,
            },
        });
        const distribution = await prisma.distribution.findMany({
            include: {
                productName: true,
            },
        });
        const stock = transaction.map((item) => {   
            const { productName, productId, quantity } = item;
            const distributionQuantity = distribution.filter((item) => item.TransactionId === productId).reduce((acc, item) => acc + parseInt(item.quantity), 0);
            return {
                productName: productName.productName,
                quantity: parseInt(quantity) - distributionQuantity,
            };
        });
        res.status(200).json(stock);
    } catch (error) {
        console.log(error);
    }
  };

router.get("/", getStock);

export default router;
