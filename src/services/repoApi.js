import axios from "axios";
import store from "../redux/store";
import { getRepo, getadData, getcommitData, getcontributorData, setLoading } from '../redux/repoSlices';

let reqInstance = axios.create({
  baseURL: `https://api.github.com`,
  headers: {
    authorization: "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"
  }
})

export const fetchMoreData = async (props) => {
  const { page, setPage, fromDate, toDate } = props
  try {
    const response = await reqInstance.get(`/search/repositories?q=created:${fromDate}..${toDate}&sort=stars&order=desc&page=${page}`);
    setPage(page + 1);
    store.dispatch(getRepo(response.data.items))
  } catch (error) {
    console.error(error)
  }
}

export const fetchChartData = async (props) => {
  const { item } = props;

  try {
    const [commitResponse, contributorResponse, adResponse] = await Promise.all([
      reqInstance.get(`/repos/${item.full_name}/stats/commit_activity`),
      reqInstance.get(`/repos/${item.full_name}/stats/contributors`),
      reqInstance.get(`/repos/${item.full_name}/stats/code_frequency`)
    ]);

    store.dispatch(getcommitData(commitResponse.data));
    store.dispatch(getcontributorData(contributorResponse.data));
    store.dispatch(getadData(adResponse.data));
  } catch (error) {
    console.error(error)
  } finally {
    store.dispatch(setLoading())
  }
}
