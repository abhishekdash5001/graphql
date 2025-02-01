import { ApolloServer } from '@apollo/server' ;// creates the server
import { startStandaloneServer } from '@apollo/server/standalone' ; // to start the server


const typeDefinition =`#graphql
  schema{
    query:Query
  }
  type Query{
  greeting:String 
  }
`;
//valid gql schema it tells any client calling or api can query of 
//greating and return string


//next we have implement a code that returns a greeting value

//Resolver function
const resolver={
    Query:{
        greeting:()=>'Hello world'
    }
}

async function startServer() {
    const server = new ApolloServer({
      typeDefs: typeDefinition, 
      resolvers: resolver, 
    }); // new instance of appollo server

  
    const info = await startStandaloneServer(server, {
      listen: { port: 9000 },
    }); //info object contains info about server like its url;
  
    console.log(`Server is running at ${info.url}`);
  }
  startServer();

