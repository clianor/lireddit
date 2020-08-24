import "reflect-metadata";
import {MikroORM} from "@mikro-orm/core";
// import {Post} from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers/hello";
import {PostResolver} from "./resolvers/post";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const port = 8000;

  const app = express();

  const apolloSever = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em })
  });

  apolloSever.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`server started on localhost:${port}`);
  })
}

main().catch((err) => {
  console.error(err);
});
