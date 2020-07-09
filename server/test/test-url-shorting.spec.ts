/**
 * A user needs to be able to enter a URL and they will get an 8 character (lowercase-alphanumeric) shortened version of the URL.
 * URLs are shortened and persisted into MongoDB via a REST API.
 * The frontend app will display a list of previously shortened URLs.
 * New URLs will be generated and added to the frontend list.
 * The same 8-characters cannot be used twice i.e. each shortened URL needs to be unique.
 * The URLs need to be shortened with the following domain 'pbid.io' e.g. https://pbid.io/f3x2ab1c
 * The shortened URL do not need to actually redirect/work as the domain doesn’t exist.
 * The entire system needs to be runnable using Docker, a simple compose file will do.
 * Appropriate tests should be added to the code, using the jest framework.
 * The app layout should be responsive.
 * Add a root README.md describing what the application is, and how to run it.
 */

import axios from 'axios';
import * as config from 'config';

const port = config.get('port');

const axiosInstance = axios.create({
  baseURL: `http://localhost:${port}`
});

test('Valid URL', async () => {
  const { data: before } = await axiosInstance.get(`/get-short-urls`);

  const { data: added } = await axiosInstance.post(`/add-short-url`, {
    url: 'https://google.com',
  });
  // Verify that shortened URL is of the correct format
  expect(added.shortUrl).toMatch(/^https:\/\/pbid.io\/[a-zA-Z0-9]{8,}$/);

  const { data: after } = await axiosInstance.get(`/get-short-urls`);

  // Verify URL count has incremented
  expect(after.length - before.length).toEqual(1);
});

test('Invalid URLs', async () => {
  await expect(axiosInstance.post('/add-short-url', {
    url: 'invalid',
  })).rejects.toThrowError();

  await expect(axiosInstance.post('/add-short-url', {
    url: null,
  })).rejects.toThrowError();

  await expect(axiosInstance.post('/add-short-url', {
    url: 1,
  })).rejects.toThrowError();

  await expect(axiosInstance.post('/add-short-url', {
    url: {},
  })).rejects.toThrowError();
});
