const BASE_URL = 'http://localhost:4000'

export const getData = async (endPoint) => {
    let res = await fetch(BASE_URL + endPoint);
    let data = await res.json();
    return data;
}

export const postData = async (endPoint) => {
    
}