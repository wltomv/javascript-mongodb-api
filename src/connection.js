import { MONGO_URL, MONGO_OPTIONS } from "./db";
import mongoose from "mongoose";
(async () => {
    const db = await mongoose.connect(MONGO_URL, MONGO_OPTIONS).catch(() => undefined);
    if (!db) console.log(`Database connection error`);
    //else console.log("Database connection error")
})();