
import axios from "axios";

const options = {
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};

export const shazamData = async (url)=> {
    const data = await axios.get(`https://shazam.p.rapidapi.com/${url}`,options)
    return data;
};


const options1 = {
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY1,
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};

export const shazamData1 = async (url)=> {
    const data = await axios.get(`https://shazam.p.rapidapi.com/${url}`,options1)
    return data;
};


const options2 = {
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY2,
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};

export const shazamData2 = async (url)=> {
    const data = await axios.get(`https://shazam.p.rapidapi.com/${url}`,options2)
    return data;
};


const options3 = {
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY3,
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};

export const shazamData3 = async (url)=> {
    const data = await axios.get(`https://shazam.p.rapidapi.com/${url}`,options3)
    return data;
};

const options4 = {
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY4,
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};

export const shazamData4 = async (url)=> {
    const data = await axios.get(`https://shazam.p.rapidapi.com/${url}`,options4)
    return data;
};


const options5 = {
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY5,
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};

export const shazamData5 = async (url)=> {
    const data = await axios.get(`https://shazam.p.rapidapi.com/${url}`,options5)
    return data;
};
