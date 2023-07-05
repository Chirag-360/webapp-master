import { useDispatch } from 'react-redux';
import { getChartVal, getRepo } from '../redux/repoSlices';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const SelectChart = (props) => {
    const dispatch = useDispatch()
    const handleChange = (e) =>{
       dispatch(getChartVal(e.target.value))
    }

    return (
        <>
            <FormControl className='selectMenu'>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="category"
                    onChange={handleChange}> 

                    <MenuItem value={'commits'}>Commits</MenuItem>
                    <MenuItem value={'additions'}>Additions</MenuItem>
                    <MenuItem value={'deletions'}>Deletions</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default SelectChart;