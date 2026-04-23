import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.AUTH_DB_URI;

if (!uri) {
  throw new Error("AUTH_DB_URI is not defined");
}

// ✅ global cache (Node/Next dev safe)
let client;
if (!global._mongoClientPromise) {
  const mongoClient = new MongoClient(uri);
  global._mongoClientPromise = mongoClient.connect();
}

client = await global._mongoClientPromise;

// ✅ URI থেকে DB name নেবে (mismatch এড়াবে)
const db = client.db();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  database: mongodbAdapter(db),
});