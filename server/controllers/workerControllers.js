import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export const workerDetail = async (req, res) => {

    try {
        const { id } = req.params;

        const workers = await prisma.worker.findMany({
            where: { id: parseInt(id) }
        })

        res.send(workers);
    } catch (error) {
        console.error('Error retrieve worker:', error);
        res.status(400).json({ error: 'Failed to retrieve worker' });
    }
}

export const allWorkers = async (req, res) => {

    try {
        const workers = await prisma.worker.findMany({
            select: {
                id: true,
                name: true,
                profession: true,
                rating: true,
                avatarUrl: true,
                availability: true,
            },
        });

        res.send(workers);
    } catch (error) {
        console.error('Error retrieve worker:', error);
        res.status(400).json({ error: 'Failed to retrieve worker' });
    }
}

export const getAllWorkersByProfession = async (req, res) => {
    const { profession } = req.params;

    try {
        const workers = await prisma.worker.findMany({
            where: { profession: profession },
            select: {
                id: true,
                name: true,
                profession: true,
                rating: true,
                avatarUrl: true,
                availability: true,
            }
        })

        res.send(workers);
    } catch (error) {
        console.error('Error retrieve worker:', error);
        res.status(400).json({ error: 'Failed to retrieve worker by profession' });
    }
}

export const addWorker = async (req, res) => {
    const { worker, pastWork, reviews } = req.body;

    try {
        const result = await prisma.worker.create({
            data: {
                ...worker,
                skills: { set: worker.skills },
                pastWork: {
                    create: pastWork.map(work => ({
                        company: work.company,
                        duration: work.duration
                    }))
                },
                reviews: {
                    create: reviews.map(review => ({
                        author: review.author,
                        content: review.content,
                        rating: review.rating
                    }))
                }
            },
            include: {
                pastWork: true,
                reviews: true
            }
        })

        res.status(201).json(result)

    } catch (error) {
        console.log('Error creating worker: ', error)
        res.status(400).json({ error: 'Failed to create worker' });
    }
}


export const updateWorker = async (req, res) => {
    const { worker, pastWork, reviews } = req.body;
    const { id } = req.params;

    try {
        const result = await prisma.worker.update({
            where: { id: parseInt(id) },
            data: {
                ...worker,
                skills: {
                    set: worker.skills || [],
                },
                pastWork: {
                    deleteMany: {}, // Remove all existing pastWork entries
                    create: Array.isArray(pastWork) ? pastWork.map(work => ({
                        company: work.company,
                        duration: work.duration
                    })) : []
                },
                reviews: {
                    deleteMany: {}, // Remove all existing reviews
                    create: Array.isArray(reviews) ? reviews.map(review => ({
                        author: review.author,
                        content: review.content,
                        rating: review.rating
                    })) : []
                }
            },
            include: {
                pastWork: true,
                reviews: true
            }
        });
              
        res.status(201).json(result);

    } catch (error) {
        console.log('Error updating worker: ', error);
        res.status(400).json({ error: 'Failed to update worker' });
    }
};

export const deleteWorker = async (req,res) => {
    try {
        const {id} = req.params;

        await prisma.review.deleteMany({
            where: { workerId: parseInt(id) }
        })

        await prisma.pastWork.deleteMany({
            where: { workerId: parseInt(id) }
        })
    
        const result = await prisma.worker.delete({
            where: { id: parseInt(id) }
        })

        res.status(204).json(result)
    } catch (error) {
        console.log("Error deleting worker data",error)
        res.status(404).send(error)
    }
}