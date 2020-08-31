import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__, COOKIE_NAME, DEV_URL } from "./constants";
import { MyContext } from "./types";
import cors from "cors";
import { createConnection } from "typeorm";
import typeormConfig from "./typeorm.config";

const main = async () => {
  const conn = await createConnection(typeormConfig);

  const port = 8000;

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis({
    host: "redis",
    port: 6379,
    password: "redis",
  });

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 days
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "ujkfshjkahsdfjkhasukfhlkasdfhks",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => <MyContext>{ req, res, redis, conn },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    if (__prod__) console.log(`server started on localhost:${port}`);
    else console.log(`server started on ${DEV_URL}:${port}`);
  });
};

main().catch((err) => {
  console.error(err);
});
