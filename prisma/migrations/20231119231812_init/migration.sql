-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videos" TEXT[],
    "images" TEXT[],
    "category" TEXT NOT NULL,
    "description" TEXT,
    "language" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Course_userId_idx" ON "Course"("userId");
