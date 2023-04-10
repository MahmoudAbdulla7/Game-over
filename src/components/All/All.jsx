import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MediaItem from '../MediaItem/MediaItem'
import { Helmet } from 'react-helmet';
export default function All() {

  const [allGms, setallGms] = useState([])
  const [seeMore, setseeMore] = useState(20)
  function seemore(){
    setseeMore(seeMore +20);
  }

  async function ApiGames() {
    let {data} = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/games" ,
    { headers:  {'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
     'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
    })
    // console.log(data);
    setallGms(data)
  }
  useEffect(()=>{
    ApiGames()
  },[])


  return (
  <>
        <Helmet>
        <title>All Games</title>
        <meta name="description" content="My page description" />
      </Helmet>

  <div className="container my-5">
  <div className="row gy-3">
        {allGms.slice(0,seeMore).map((el,idx) => <MediaItem key={idx} el={el}/>

 )}

      </div>
      <div className="butn m-auto w-100 d-flex justify-content-center">
      <button onClick={seemore} className='btn btn-outline-info m-auto my-4 w-25'> See more <i className="fas fa-arrow-right"></i></button>
      </div>
  </div>


  </>)
}
