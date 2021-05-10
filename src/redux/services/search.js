import axiosInstance from '../../utils/axios';

class Search {
  static userSearch(searchTerm) {
    return axiosInstance.get('/api/content/search/' + searchTerm);
  }
}
export default Search;
