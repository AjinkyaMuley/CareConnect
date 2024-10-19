import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export const addReview = async (req,res) => {
    
    try {
        const {review,workerId} = req.body;

        const response = await prisma.review.create({
            data: {
                ...review,
                rating : parseFloat(review.rating),
                workerId : parseInt(workerId)
            },
            include :{
                worker : true
            }
        })

        res.status(200).json(response)

    } catch (error) {
        console.log('Error in adding review',error);
        res.status(400).json(error)
    }
}