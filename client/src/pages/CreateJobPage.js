import { useEffect, useState } from 'react';
import { createJob,updateJob } from '../lib/graphql';


function CreateJobPage({type="create",titleC='',descriptionC='',idC}) {

  const [title, setTitle] = useState(titleC);
  const [description, setDescription] = useState(descriptionC);

  useEffect(()=>{
 console.log(titleC)
  },[titleC,descriptionC])
  const handleSubmit = async (event) => {

    event.preventDefault();
    if(type === "create"){
      let {id}=  await  createJob( { title, description });

      alert("job created with id " +id)
    }else{
      let {id}=  await  updateJob( idC,title, description );
      alert("job updated with id " +id)
    }

    
  };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
