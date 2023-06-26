import axios from 'axios';
import queryString from 'query-string';
import { SportsAppInterface, SportsAppGetQueryInterface } from 'interfaces/sports-app';
import { GetQueryInterface } from '../../interfaces';

export const getSportsApps = async (query?: SportsAppGetQueryInterface) => {
  const response = await axios.get(`/api/sports-apps${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSportsApp = async (sportsApp: SportsAppInterface) => {
  const response = await axios.post('/api/sports-apps', sportsApp);
  return response.data;
};

export const updateSportsAppById = async (id: string, sportsApp: SportsAppInterface) => {
  const response = await axios.put(`/api/sports-apps/${id}`, sportsApp);
  return response.data;
};

export const getSportsAppById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sports-apps/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSportsAppById = async (id: string) => {
  const response = await axios.delete(`/api/sports-apps/${id}`);
  return response.data;
};
