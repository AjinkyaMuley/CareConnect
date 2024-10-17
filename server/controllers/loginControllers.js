import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export const userLogin = async (req,res) => {
    try {
        const {phone_number} = req.body;

        const result = await prisma.user.findUnique({
            where: {phone_number : phone_number}
        })

        res.status(200).json(result)
    
    } catch (error) {
        console.log('error logging in ',error)
        res.status(404).json(error)
    }
}

export const workerLogin = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ error: "Phone number is required" });
        }
        
        const worker = await prisma.worker.findUnique({
            where: { phone : phone.toString() }
        });

        if (worker) {
            res.status(200).json(worker);
        } else {
            res.status(404).json({ error: "Worker not found" });
        }

    } catch (error) {
        console.error('Error logging in worker: ', error);
        res.status(500).json({ error: "Internal server error" });
    }
};