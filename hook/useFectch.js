import { useState, useEffect } from 'react';
import axios from 'axios';

// const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;


const useFetch = (endpoint, query, page) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
            ...query
        },
        headers: {
            'X-RapidAPI-Key': '6c665bc15cmshdf394a43a6d5946p14fd13jsn3f5a0a04d960',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        setData([]);
        try {
            console.log('API Key:', options.headers);
            console.log('Request URL:', options.url);

            const response = await axios.request(options);
            setData(response.data.data);
        } catch (error) {
            console.error("Found error:", error);
            alert("API Fetching failed");
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [page]);

    console.log(page);


    const reFetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { reFetch, data, isLoading, error };
}

export default useFetch;