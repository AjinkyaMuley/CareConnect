const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

async function main(){
    const newUser = await prisma.user.create({
        data: {
            email : "abc@gmail.com",
            phone_number : 123456789
        }
    })

    console.log("New User created: ",newUser)
}

main()
.catch(e => {
    throw e;
})
.finally(async () => {
    await prisma.$disconnect()
})