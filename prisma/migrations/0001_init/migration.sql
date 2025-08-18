CREATE TABLE "Album" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "artist" TEXT,
  "year" INTEGER,
  "coverUrl" TEXT
);
CREATE TABLE "Track" (
  "id" TEXT PRIMARY KEY,
  "albumId" TEXT,
  "name" TEXT,
  "durationMs" INTEGER,
  "trackNumber" INTEGER,
  FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE "Rating" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "trackId" TEXT UNIQUE,
  "score" INTEGER,
  "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
