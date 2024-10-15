-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "familyBackground" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastWork" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "workerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PastWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "workerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_email_key" ON "Worker"("email");

-- AddForeignKey
ALTER TABLE "PastWork" ADD CONSTRAINT "PastWork_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
