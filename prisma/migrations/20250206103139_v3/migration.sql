-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Offerts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "contactEmail" TEXT,
    "location" TEXT,
    "published" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "idCategory" INTEGER,
    "idUserCreator" INTEGER NOT NULL,
    CONSTRAINT "Offerts_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Offerts_idUserCreator_fkey" FOREIGN KEY ("idUserCreator") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Offerts" ("active", "contactEmail", "createdAt", "description", "expired", "id", "idCategory", "idUserCreator", "location", "published", "title", "updateAt") SELECT "active", "contactEmail", "createdAt", "description", "expired", "id", "idCategory", "idUserCreator", "location", "published", "title", "updateAt" FROM "Offerts";
DROP TABLE "Offerts";
ALTER TABLE "new_Offerts" RENAME TO "Offerts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
