
import cors from 'cors';
import express from 'express';
import { authMiddleware, handleLogin } from './auth.js';
import { ApolloServer } from '@apollo/server'; 

import { expressMiddleware as apolloMiddleWare } from '@apollo/server/express4'; 
import { readFile } from 'fs/promises';
import { resolvers } from './resolver.js';
const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);



app.post('/login', handleLogin);

async function startApolloServer() {
  const typeDefs = await   readFile("./schema.graphql","utf8");

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })
  await apolloServer.start();
  app.use('/graphql',apolloMiddleWare(apolloServer))
}


startApolloServer()
app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
