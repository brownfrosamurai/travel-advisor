import axios from "axios";

const getPlacesData = async (type, sw, ne) => {
  try {
    const options = {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,

      },
      headers: {
        // 'X-RapidAPI-Key': '4c1671a46fmsh8d53cd119b780dbp19d6e6jsnb12ed9d2ac40', original key
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY, //backup key
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    };

    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, options)

    return data
  } catch (error) {
    console.log(error)
  }
}

const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios
      .get(`https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lng}`, {
        headers: {
          'X-RapidAPI-Key':  process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
      })

    return data

  } catch (error) {
    console.log(error)
  }
}

export {
  getPlacesData,
  getWeatherData
}