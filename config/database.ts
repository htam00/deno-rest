import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

class DB {
    public client: MongoClient;
    constructor(public dbname: string, public url: string) {
        this.dbname = dbname;
        this.url = url;
        this.client = {} as MongoClient;
    }

    connect() {
        const client = new MongoClient();
        client.connectWithUri(this.url);
        this.client = client;
    }

    get gDatabase() {
        return this.client.database(this.dbname)
    }
}

const dbname = Deno.env.get("DB_NAME") || "test";
const url = Deno.env.get("DB_HOST_URL") || "mongodb://localhost:27017";
const db = new DB(dbname, url);
db.connect();

export default db;