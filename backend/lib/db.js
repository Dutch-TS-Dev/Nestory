import mongoose from "mongoose";
import dotenv from "dotenv";
//import colors from "colors";
dotenv.config();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;
const mongoDatabase = process.env.MONGO_DATABASE;

async function connect() {
    const uri = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}/${mongoDatabase}?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(uri);
        console.log(
            `Connected to MongoDB with Mongoose to database ${mongoose.connection.name}`
                .cyan.underline.bold
        );
    } catch (error) {
        console.error("Error connecting to database", error);
    }
}

export default connect;
