import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import {getCompany} from "../lib/graphQl/graphql";
import JobList from '../components/JobList';
function CompanyPage() {
  const { companyId } = useParams();
  let [company,setCompany]= useState({});
  useEffect(()=>{
  fetchCompany();
  },[companyId])

  async function fetchCompany(){
   let a = await  getCompany(companyId);
   console.log(a)
setCompany(a)
  }


  return (
    <div>
      <h1 className="title">
        {company?.name}
      </h1>
      <div className="box">
        {company?.description}
      </div>
      <h3>
        Jobs At {company?.name}
        
      </h3>
      <p>
        {company?.jobs ?   <JobList jobs={company?.jobs} />:null}
     
        
      </p>
    </div>
  );
}

export default CompanyPage;
