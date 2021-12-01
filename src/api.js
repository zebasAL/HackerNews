import axios from 'axios';

const baseUrl = 'https://hacker-news.firebaseio.com/v0/';

const api = {
  getTopPosts: () => axios.get(`${baseUrl}topstories.json?print=pretty`),
  getPostById: (id) => axios.get(`${baseUrl}item/${id}.json?print=pretty`),
};

export default api;
