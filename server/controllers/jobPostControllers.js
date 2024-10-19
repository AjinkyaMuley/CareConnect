import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export const getAllJobs = async (req,res) => {
    try {
        const jobs = await prisma.jobPost.findMany({
            select : {
                id : true,
                title : true,
                salary : true,
                category : true,
                location : true,
                timing : true,
                createdAt : true,
                user : true
            },
        })        

        res.status(200).json(jobs)
    } catch (error) {
        console.log('Error finding all jobs ',error)
        res.status(400).json(error)
    }
}

export const postJob = async (req, res) => {
    try {

        const { jobDetails, userId } = req.body

        const job = await prisma.jobPost.create({
            data: {
                ...jobDetails,
                salary : parseInt(jobDetails.salary),
                availability : { set: jobDetails.availability },
                userId: parseInt(userId)
            },
            include : {
                user : true
            }
        });

        res.status(200).json(job)
    } catch (error) {
        console.log('Error posting a job', error)
        res.status(400).json(error)
    }
}

export const jobDetails = async (req,res) => {
    try {
        const {id} = req.params;
        const job = await prisma.jobPost.findUnique({
            where : {id : parseInt(id)},
            include : {
                user : true
            }
        })

        res.status(200).json(job)
    } catch (error) {
        console.log('error finding job details',error);
        res.status(400).json(error)
    }
}