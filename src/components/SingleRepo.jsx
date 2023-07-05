import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/repoSlices';
import { fetchChartData } from '../services/repoApi';
import AllChangesChart from './AllChangesChart';
import SingleChangesChart from './SingleChangesChart';
import SelectChart from './SelctChart';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LazyLoad from 'react-lazyload';


const SingleRepo = (props) => {
    const item = props.data
    const { expanded, handleChange}  = props
    const [showCharts, setShowCharts] = useState(false);

    const dispatch = useDispatch()

    const handleChart = () => {
        dispatch(setLoading())
        fetchChartData({ item: item })
        setShowCharts(true)
    }
    return (
        <Accordion className='accordion'
        expanded={expanded} onChange={handleChange(`${item.name}`)}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={handleChart}
                className='backColor fullWidth'>
                <Typography className='fullWidth'>
                    <div className='flex flexGap'>
                        <div className='flex imgDiv'>
                            <LazyLoad height={150} once>
                                <img className='avtarImg' src={item.owner.avatar_url} />
                            </LazyLoad>
                        </div>
                        <div className='flex contentDiv'>
                            <h1>{item.name}</h1>
                            <h5>{item.description}</h5>
                            <div className='flex starIssueDiv'>
                                <ul className='flex starUl'>
                                    <li>Stars: {item.stargazers_count}</li>
                                    <li>Issues: {item.open_issues_count}</li>
                                </ul>
                                <p>Last Pushed {item.has_wiki} by {item.owner.login}</p>
                            </div>
                        </div>
                    </div>
                </Typography>
            </AccordionSummary>
            { showCharts &&
            <AccordionDetails>
                <Typography>
                    <SelectChart />
                    <AllChangesChart />
                    <SingleChangesChart />
                </Typography>
            </AccordionDetails>
            }
        </Accordion>
    )
}

export default SingleRepo;