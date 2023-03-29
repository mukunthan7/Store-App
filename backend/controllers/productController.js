import {PrismaClient} from "@prisma/client"
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

const getProducts = async(req,res) => {
    try{
        const response = await prisma.product.findMany({
            include: {
                supplierName: true
            }
        });
        res.status(200).json(response);
    }catch(error){
        console.log(error);
    }
}

const postProduct = async(req,res) => {
    try{
        const { productName, productDescription, supplierName } = req.body;
        const response = await prisma.product.create({
            data: {
                productName,
                productDescription,
                supplierName : {
                    connect: {
                        supplierName
                    }
                }
            }
        });
        res.status(200).json(response);
    }catch(error){
        console.log(error);
    }
}

const getProduct = async(req,res) => {
    try{
        const { productName } = req.params;
        const response = await prisma.product.findUnique({
            where: {
                productName
            },
            include: {
                supplierName: true
            }
        });
        res.status(200).json([response]);
    }catch(error){
        console.log(error);
    }
}


router.get("/", getProducts);
router.post("/", postProduct);
router.get("/:productName", getProduct);

export default router;