import { useEffect,useState } from 'react';
import JobList from '../components/JobList';
import { jobs } from '../lib/fake-data';
import { getJobs } from '../lib/graphql';

function HomePage() {
  let [jobs,setJobs]= useState([]);

  const fetchJobs=async()=>{
  let a =  await getJobs();
  setJobs(a)
  }
  useEffect(()=>{
      fetchJobs()
  },[])

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
