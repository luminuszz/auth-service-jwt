-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emai" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "createtd_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.emai_unique" ON "users"("emai");
