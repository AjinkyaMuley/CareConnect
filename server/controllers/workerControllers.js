import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export const allWorkers = async (req,res) => {
    const workers = await prisma.worker.findMany({
        include : {
            pastWork : true,
            reviews : true,
        }
    })

    res.send(workers)
}