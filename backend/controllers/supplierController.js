import {PrismaClient} from "@prisma/client"
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

const getSupplier = async(req,res) => {
    try{
        const response = await prisma.supplier.findMany();
        res.status(200).json(response);
    }catch(error){
        console.log(error);
    }
}

const postSupplier = async(req,res) => {
    try{
        const { supplierName, supplierAddress } = req.body;
        const response = await prisma.supplier.create({
            data: {
                supplierName,
                supplierAddress
            }
        });
        res.status(200).json(response);
    }catch(error){
        console.log(error);
    }
}

router.get("/", getSupplier);
router.post("/", postSupplier);

export default router;