import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchMoreData } from '../services/repoApi'
import Container from '@material-ui/core/Container';
import InfiniteScroll from 'react-infinite-scroll-component';
import SingleRepo from './SingleRepo';
import moment from 'moment';
import SelectRepoMenu from './SelectRepoMenu';
import { DATE_FORMAT, DAYS, FROM_DATE } from '../constant/constants';


const Repository = () => {
    const [page, setPage] = useState(1);
    const [date, setDate] = useState({
        fromDate: FROM_DATE,
        toDate: moment().subtract(1, DAYS).format(DATE_FORMAT),
    })
    const [expanded, setExpanded] = React.useState(false);

    const repo = useSelector(state => state.repoReducer.repo)

    const handleChange = (panel) => (_event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const fetchData = () => {
        fetchMoreData({ page: page, setPage: setPage, fromDate: date.fromDate, toDate: date.toDate });
    };

    const handleNextPage = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <>
            {
                repo &&
                <>
                    <SelectRepoMenu setDate={setDate} setPage={setPage} />

                    <Container maxWidth="lg" className='container'>
                        <InfiniteScroll
                            dataLength={repo.length}
                            hasMore={true}
                            next={handleNextPage} 
                            loader={<h4>Loading...</h4>}>
                            {
                                repo?.map((item) => {
                                    return (
                                        <SingleRepo data={item} expanded={expanded === `${item.name}`} handleChange={handleChange} />
                                    )
                                })
                            }
                        </InfiniteScroll>
                    </Container>
                </>
            }
        </>
    )
}

export default Repository;