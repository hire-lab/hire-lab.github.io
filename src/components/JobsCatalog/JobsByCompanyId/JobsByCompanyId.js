import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import * as jobService from '../../../services/JobService';
import {useCompanyAuthContext} from '../../../contexts/AuthCompanyContext';
import JobListing from '../JobListing/JobListing'

export default function JobsByCompanyId(){
    let {companyId} = useParams()
    const [jobs, setJobs] = useState([])
    const {company} = useCompanyAuthContext();

    useEffect(() => {
        jobService.getByCompanyId(companyId)
            .then(result => {
                setJobs(result)
            })
    }, [companyId])

    const addJobButton = (
        <div className='addJobButtonWrapper'>
            <Link className='addJobButton' to='/jobs/create'> Add new job listing </Link>
        </div>
    )

    return (
        <section className="jobsPage">
            <div className="jobsPageTitle">
                <h1><span className="coloredText"> {company.name} Job</span> Listings</h1> 
                <span className="aboutPageTitleUnderline"></span>

                    {company.email
                        ? addJobButton
                        : null
                    }
            </div>         
            <div className="jobListings">

                {jobs.length > 0
                    ? jobs.map(j => <JobListing key={j._id} job={j} />)
                    : <h3>Loading...</h3>
                }

            </div>
        </section>
    )
}