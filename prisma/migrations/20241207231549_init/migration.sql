-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BackorderFile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "codeBckOrd" TEXT NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "reasonId" INTEGER,
    "noteUser" TEXT,
    "expectedDate" DATETIME,
    "newDateClient" DATETIME
);
INSERT INTO "new_BackorderFile" ("closed", "codeBckOrd", "createdAt", "expectedDate", "id", "newDateClient", "noteUser", "orderId", "reasonId", "scheduleId", "unitId", "updatedAt") SELECT "closed", "codeBckOrd", "createdAt", "expectedDate", "id", "newDateClient", "noteUser", "orderId", "reasonId", "scheduleId", "unitId", "updatedAt" FROM "BackorderFile";
DROP TABLE "BackorderFile";
ALTER TABLE "new_BackorderFile" RENAME TO "BackorderFile";
CREATE UNIQUE INDEX "BackorderFile_codeBckOrd_key" ON "BackorderFile"("codeBckOrd");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
