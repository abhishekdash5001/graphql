import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/formatters';
import { getJob } from '../lib/graphql';
import { useEffect, useState } from 'react';
import CreateJobPage from './CreateJobPage';


function JobPage() {
  const { jobId } = useParams();
  let [update,setUPdate]= useState(false)
  const [job ,setJob]= useState({});
  useEffect(()=>{
    fetchTheJob(jobId)
  },[jobId])

  async function fetchTheJob(id){
  let a = await getJob(id);
  console.log(a)
  setJob(a)
  }
 


  return (
    <div>
      <h1 className="title is-2">
        {job?.title}
      </h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job?.company?.id}`}>
          {job?.company?.name}
        </Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
       {job?.date?
       <>
        Posted: {formatDate(job?.date, 'long')}
       </>:null
      }  
        </div>
        <p className="block">
          {job?.description}
        </p>
      </div>
      <button onClick={()=>setUPdate(!update)}>
        updateJob
      </button>
      {update?<CreateJobPage type="update" titleC={job.title} descriptionC={job.description} idC={job.id}/>:null}
      
    </div>
  );

}

export default JobPage;
