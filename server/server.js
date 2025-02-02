
import cors from 'cors';
import express from 'express';
import { authMiddleware, handleLogin } from './auth.js';
import { ApolloServer } from '@apollo/server'; 

import { expressMiddleware as apolloMiddleWare } from '@apollo/server/express4'; 
import { readFile } from 'fs/promises';
import { resolvers } from './resolver.js';
import { getUser } from './db/users.js';
const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);



app.post('/login', handleLogin);

async function getContext({req,res}){
  console.log(req.auth);

  if(req.auth){
    let user = await getUser(req.auth.sub);
    return {user}
  }else{
    return null
  }
  
  
 
}
async function startApolloServer() {
  const typeDefs = await   readFile("./schema.graphql","utf8");

  

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })
  await apolloServer.start();
  app.use('/graphql',apolloMiddleWare(apolloServer,{context:getContext}))
}


startApolloServer()
app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
