import { Link } from 'react-router-dom';
import { formatDate } from '../lib/formatters';
import { deleteJob as deleteJobRe } from '../lib/graphQl/graphql';

function JobList({ jobs }) {
  return (
    <ul className="box">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </ul>
  );
}

function JobItem({ job }) {

  const deleteJob=async(job)=>{
    try{
      let {title} = await deleteJobRe(job?.id)
      alert("job deleted " +title )
    }
    catch(err){
    
      alert(err.message)
    }
  
  }

  const title = job.company
    ? `${job.title} at ${job.company.name}`
    : job.title;
  return (
    <li className="media">
      <div className="media-left has-text-grey">
        {formatDate(job.date)}
      </div>
      <div className="media-content">
        <Link to={`/jobs/${job.id}`}>
          {title}
        </Link>
      </div>
      <div onClick={()=>deleteJob(job)}>
        Delete
      </div>
    </li>
  );
}

export default JobList;
