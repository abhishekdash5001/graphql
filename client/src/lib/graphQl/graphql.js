import {ApolloClient, gql,createHttpLink,concat,InMemoryCache,ApolloLink} from "@apollo/client"

import { getAccessToken } from '../auth';


const httplink = createHttpLink({uri:'http://localhost:9000/graphql'});
const authLink = new  ApolloLink((operation,forward)=>{
  let token =   getAccessToken();
  if(token){
  
      operation.setContext({
headers:{
    'Authorization':`Bearer ${token}`
}
      })
    
  }
 
  return forward(operation)
})

const  apolloClient = new ApolloClient({
link:concat(authLink,httplink),
cache: new InMemoryCache(),
defaultOptions:{
  query:{
    fetchPolicy:"network-only"
  }
}

});

const getJobQuery=gql`

fragment JobDetail on Job{
 id
  date
  title
  description
  company {
    id
    name
  }
}
query Job($id:ID!){

job(id: $id) {
...JobDetail
}

}
`
export const getJobs = async() => {
    const query = gql`
              query  Jobs{
            jobs {
            id
            title
            date
            company {
               name
               
            }
            }
            }
     `


  const results =  await  apolloClient.query({query,
    fetchPolicy:"network-only"
  })
  return  results.data.jobs
}

export const getJob= async(id)=>{




let {data}= await apolloClient.query({
  query:getJobQuery,
  variables:{id},
  fetchPolicy:'cache-first'
})
return data.job
}

export const getCompany=async(id)=>{

 const query=gql`
 query company($id:ID!){
   company(id: $id) {
      name
    description
    jobs {
      title
      id
      date
      description
    }
   
   }
}
 
 `
 
 let {data}= await apolloClient.query({
  query,
  variables:{id}
})
return data.company

}

export const createJob= async(title,description)=>{
  console.log(title,description)
  const query = gql`
  mutation createJob($title:String!,$description:String)
{
job:createJob(title:$title,description:$description) {
  
 id
 date
  title
  description
  company {
    id
    name
    description
  }
}
} 
  `

  let {data}= await apolloClient.mutate ({
    mutation:query,
    variables:{title,description},
    update:(cache,{data})=>{
      console.log("createJob stoping hetJobID and wrting cache",data)
      cache.writeQuery({
         query:getJobQuery,
         variables:data.job.id,
        data
      })

    }
  })

  return data.job
 
}

export const deleteJob= async(id)=>{
  let query=gql`
  mutation deleteJob($id:ID){
  deleteJob (id:$id){
    id
    title
  }
}
  `

  
  let {data}= await apolloClient.mutate ({
    mutation:query,
    variables:{id}
  })

  return data.deleteJob

}

export const updateJob=async(id,title,description)=>{
  debugger
  let query = gql`
  mutation updateJob($id:ID!,$title:String!,$description:String!){
 job: updateThisJob(id:$id,description: $description,title: $title) {
    id
  }
}
  `

  let {data}= await apolloClient.mutate ({
    mutation:query,
    variables:{id,title,description}
  })
  return data.job

}