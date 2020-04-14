import { openDB } from "idb";

import { App } from "../types/App";

const dbPromise = openDB("Wrangl", 1, {
  upgrade(db) {
    db.createObjectStore("applications", {
      keyPath: "id",
    });
  },
});

export const Applications = {
  async create(app: App) {
    const db = await dbPromise;

    console.log("Creating app");

    const tx = db.transaction("applications", "readwrite");

    await tx.objectStore("applications").add(app);
  },
  async getAllApplications() {
    const db = await dbPromise;

    console.log("Fetching all apps");

    const tx = db.transaction("applications", "readonly");

    let cursor = await tx.objectStore("applications").openCursor();

    let applications = [];

    while (cursor) {
      applications.push(cursor.value);
      cursor = await cursor.continue();
    }

    return applications as ReadonlyArray<App>;
  },
};
