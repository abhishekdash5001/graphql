import { GraphQLClient,gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');


export const getJobs = async() => {
    const query = gql`
              query  {
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

  const {jobs} = await   client.request(query);
  return  jobs
}

export const getJob= async(id)=>{


   const query=gql`
   query Job($id:ID!){

job(id: $id) {
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
let {job}=  await   client.request(query,{id});
return job
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
 let {company}= await   client.request(query,{id});
 return company
}

export const createJob= async(title,description)=>{
  const query = gql`
  mutation createJob($title:String!,$description: String )
{
createJob(description: $description,title: $title) {
  
 id
}
} 
  `
  let {createJob} = await client.request(query,title,description);
  return createJob
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

  let {deleteJob} = await client.request(query,{id});
  return deleteJob

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
  debugger
  let {job}= await client.request(query,{id,title,description});
  return job

}