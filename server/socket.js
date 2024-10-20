import { Server as SocketIOServer } from "socket.io";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient;

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ['GET', 'POST'],
            credentials: true
        }
    })

    const userSocketMap = new Map()

    const disconnect = (socket) => {
        console.log(`Disconnected Client ${socket.id}`)

        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId)
                break;
            }
        }
    }

    const sendMessage = async (message) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        // Create the message
        const createdMessage = await prisma.message.create({
            data: {
                ...message, // Assuming `message` contains the appropriate fields for the message creation
                sender: { connect: { id: message.senderId } },
                recipient: { connect: { id: message.recipientId } },
            }
        });

        // Find the created message with related sender and recipient populated
        const messageData = await prisma.message.findUnique({
            where: {
                id: createdMessage.id,  // Find the message by the created ID
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        phone_number: true,
                    }
                },
                recipient: {
                    select: {
                        id: true,
                        email: true,
                        phone_number: true,
                    }
                }
            }
        });

        if(recipientSocketId){
            io.to(recipientSocketId).emit("recieveMessage",messageData);
        }

        if(senderSocketId){
            io.to(senderSocketId).emit("recieveMessage",messageData);
        }
    }

    io.on("connection",(socket) => {
        const userId = socket.handshake.query.userId;

        if(userId){
            userSocketMap.set(userId,socket.id);
            console.log(`User connected : ${userId} with socket id ${socket.id}`)
        } 
        else{
            console.log('User id not provided during connection')
        }

        socket.on("sendMessage",sendMessage);

        socket.on("disconnect",() => disconnect(socket))
    })
}

export default setupSocket;