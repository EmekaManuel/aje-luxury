import axios from "axios"

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const dataFetching = async (url) => {
    const {data} = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '44106eef3bmshc7e57332cb5d688p1a7e58jsn7f7fc847b049',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    });
    return data;
}