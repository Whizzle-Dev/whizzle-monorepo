-- CreateTable
CREATE TABLE "PrivateBetaAccessRequest" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "copmany" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrivateBetaAccessRequest_pkey" PRIMARY KEY ("id")
);
