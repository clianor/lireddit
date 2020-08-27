import {Post} from "./entities/Post";
import {__prod__} from "./constants";
import {MikroORM} from "@mikro-orm/core"
import path from "path";
import {User} from "./entities/User";

export default {
  migrations: {
    path: path.resolve(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.ts$/,
  },
  entities: [Post, User],
  dbName: "lireddit",
  host: "postgres",
  port: 5432,
  user: "postgres",
  password: "postgres",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];