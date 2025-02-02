import { getCompany } from './db/companies.js'
import { getJobs, getJob ,createJob,deleteJob, updateJob} from './db/jobs.js'
import { GraphQLError } from "graphql" 

export const resolvers = {
    Query: {
        jobs: async () => await getJobs(),
        job: async (root, args) => {
            console.log("getting jobs")
            let a = await getJob(args.id)
            return a


        },
        company: async (_, args) => {
            let company = await getCompany(args.id);
            if(!company){
              throw new   GraphQLError("Company not found"+args.id,{
                    extensions:{
                        code:"NOT FOUND"
                    }
                })
            }
            return company
        }



    },
    Job: {

        date: (job) => toIsoDate(job.createdAt),
        company: async (job) => {

            let company = await fetchCompanyName(job.companyId);
            return company
        }

    },

    Company:{
   jobs:async(company)=>{
 let jobs = await getJobs();
 return jobs.filter((job)=>job.companyId === company.id);

          
   }
    },
    Mutation: {
        createJob: async (_,{title,description},{user}) => {  

           if(!user){
            HandleError("User not authorised")
           }else{

            try {
                let job = await createJob({ companyId:user.companyId, title, description });
                return job
            }
            catch (e) {
                HandleError(e)
            }
           }
            


        },
        deleteJob:async(_,{id},{user})=>{
            if(user){
                try{
                    let job = await deleteJob(id);
                    return job
                }catch(e){
                    HandleError(e)
                }
            }else{
                HandleError("User not authorised") 
            }
           
    

        },

        updateThisJob:async(_,{id,title,description})=>{
     try{
   let a = await updateJob({id,title,description});
   return a;
     }
     catch(err){
        HandleError(err)
     }
        }
    }



}

function toIsoDate(isoDate) {

    return isoDate.slice(0, 'yyyy-mm-dd'.length)
}

async function fetchCompanyName(companyId) {
    let a = await getCompany(companyId);
    return a
}

function HandleError(message){
 throw new GraphQLError(message,{
    extensions:{
        code:"Something went wrong"
    }
 })

}