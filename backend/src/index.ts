import "reflect-metadata";
import {MikroORM} from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers/hello";
import {PostResolver} from "./resolvers/post";
import {UserResolver} from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import {__prod__, COOKIE_NAME} from "./constants";
import {MyContext} from "./types";
import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const port = 8000;

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    host: "redis",
    port: 6379,
    password: "redis",
  });

  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }))

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 days
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__ // cookie only works in https
      },
      saveUninitialized: false,
      secret: "ujkfshjkahsdfjkhasukfhlkasdfhks",
      resave: false
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => <MyContext>({em: orm.em, req, res}),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    console.log(`server started on localhost:${port}`);
  })
}

main().catch((err) => {
  console.error(err);
});
