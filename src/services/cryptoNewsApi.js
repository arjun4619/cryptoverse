import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '02de041b94mshf18d943249a7e32p1b92c7jsnebf308995dd8',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;