import { ConnectionOptions } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { Updoot } from "./entities/Updoot";

export default {
  type: "postgres",
  host: "postgres",
  database: "lireddit",
  username: "postgres",
  password: "postgres",
  logging: true,
  synchronize: true,
  entities: [Post, User, Updoot],
} as ConnectionOptions;
