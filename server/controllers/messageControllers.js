import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient;

export const getMessages = async (req,res) => {
    try {
        const user1 = req.userId;
        const user2 = req.body.id;

        if(!user1 || !user2){
            return response.status(400).send("Both user ID's are required")
        }

        const messages = await prisma.message.findMany({
            where : {
                OR : [
                    {
                        sender : user1,
                        recipient : user2
                    },
                    {
                        sender : user2,
                        recipient : user1
                    }
                ]
            },
            orderBy : {
                timestamp : 'asc'
            }
        });

        res.status(200).json(messages)

    } catch (error) {
        console.log('Error getting messages',error)
        res.status(400).json(error)
    }
}