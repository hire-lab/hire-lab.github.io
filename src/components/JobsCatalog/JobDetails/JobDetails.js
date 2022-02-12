import { useState, useEffect } from "react";
import { Link, useParams, useHistory} from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import * as jobService from '../../../services/JobService';

import './JobDetails.css';

export default function JobDetails() {
    const history = useHistory();
    let {jobId} = useParams()
    const {user} = useAuthContext();
    const [job, setJob] = useState({});


    useEffect(() => {
        jobService.getOne(jobId)
            .then(result => {
                setJob(result)
            })
    }, [jobId])


    const deleteHandler = (e) => {
        e.preventDefault();

        jobService.del(jobId, user.accessToken)
            .then(() => {
                history.push('/jobs')
            })
    }

    const authButtons = (
        <div className="actions">
            <Link className="jobDetailsButton" to={`/jobs/edit/${job._id}`}>Edit</Link>
            <Link className="jobDetailsButton" to='#' onClick={deleteHandler}>Delete</Link>
                
            <Link className="jobDetailsButton" to={`/jobs/${job._id}/interviews`}>Interviews</Link>
            <Link className="jobDetailsButton" to={`/jobs/${job._id}/addInterview`}>Add New Candidate</Link>
        </div>
    )

    return (
        <section className="jobDetails">
        <div className="jobDetailsInformation">
            <h3>Title:</h3>
            <h1>{job.title}</h1>
            <div className="jobDescription">
                <h3>Description:</h3>
                <p>{job.description}</p>
            </div>

            {user.email
                ? authButtons
                : <Link className="loginBtn guestBtn" to="/login">Login to Apply</Link>
            }


        </div>
       
      </section>
    )
}