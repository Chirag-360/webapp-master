import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMoreData } from '../services/repoApi'
import { getRepo } from '../redux/repoSlices';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DATE_FORMAT, DAYS } from '../constant/constants';


const SelectRepoMenu = (props) => {
    const { setDate, setPage, } = props 

    const [totalday, setTotalDay] = useState()

    const dispatch = useDispatch();

    const getDate = (days) => {
        const date = moment().subtract(days, DAYS).format(DATE_FORMAT);
        return date
    }

    const handleChange = async (event) => {
        setTotalDay(event.target.value);
        const toDate = getDate(1);
        const fromDate = getDate(event.target.value);
        setDate({
            fromDate,
            toDate
        })
        setPage(1)
        dispatch(getRepo())
        if(fromDate){
            fetchMoreData({ page: 1, setPage: setPage, fromDate: fromDate, toDate: toDate })
        }
    };

    return (
        <>
            <FormControl className='selectMenu'>
                <InputLabel id="demo-simple-select-label">Period Of Time</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={totalday}
                    label="period of time2"
                    onChange={(e) => handleChange(e)}> 

                    <MenuItem value={7}>1 Week</MenuItem>
                    <MenuItem value={14}>2 Week</MenuItem>
                    <MenuItem value={30}>1 Month</MenuItem>
                    <MenuItem value={2017-10-22}>All Time</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default SelectRepoMenu;