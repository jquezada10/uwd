-- CreateTable
CREATE TABLE "BackorderFile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "scheduleId" TEXT NOT NULL,
    "unitId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "reasonId" INTEGER NOT NULL,
    "noteUser" TEXT,
    "expectedDate" DATETIME,
    "newDateClient" DATETIME
);
