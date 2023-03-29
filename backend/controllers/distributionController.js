import {PrismaClient} from "@prisma/client"
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

const getDistribution = async(req,res) => {
    try{
        const response = await prisma.distribution.findMany({
            include: {
                productName: true
            }
        });
        res.status(200).json(response);
    }catch(error){
        console.log(error);
    }
}

const postDistribution = async(req,res) => {
    try{
        const { productName, quantity, Buyer, collegeName, Department, Purpose } = req.body;
        const response = await prisma.distribution.create({
            data: {
                productName : {
                    connect: {
                        productName
                    }
                },
                quantity,
                Buyer,
                collegeName,
                Department,
                Purpose
            }
        });
        res.status(200).json(response);
    }catch(error){
        console.log(error);
    }
}


router.get("/", getDistribution);
router.post("/", postDistribution);

export default router;