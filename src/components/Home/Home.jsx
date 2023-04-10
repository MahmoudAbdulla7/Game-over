import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Loading from '../Loading/Loading'
import LoadingDtls from '../LoadingDtls/LoadingDtls';
import { Helmet } from 'react-helmet';

export default function Home() {
  const [homeMovies, sethomeMovies] = useState([])

  async function ApiGames() {
    let {data} = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/games" ,
    { headers:  {'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
     'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
    })
    // console.log(data.reverse().slice(0,3));
    sethomeMovies(data.reverse().slice(0,3))
  }
  useEffect(()=>{
    ApiGames()
  },[])

  return <>
          <Helmet>
        <title>Home</title>
        <meta name="description" content="My page description" />
      </Helmet>


  {homeMovies ? <>
    <div className="container-fluid bg-home text-center border-1">
      <div className="content py-5 ">
      <h1 className='my-2'>Find & track the best <span className='text-info'>free-to-play</span> games!</h1>
      <p className='my-4'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
      <button className='btn btn-outline-secondary my-2 '><Link to={'/all'}>Browse games</Link></button>
      </div>
    </div>
    <div className="container pb-5">
        <h3 className='my-5'><i className="fas fa-robot"></i> Personalized Recommendations</h3>
        <div className="row">
          {homeMovies.map((el,idx) =>       
  
   
   <div key={idx} className="col-lg-4 scl">
    {el?  <Link to={`/itemDetails/${el.id}`}>
   <div className="rgstr my-3  shadow-lg">
   <img className='w-100' src={el.thumbnail} alt="" />
   <div className="d-flex align-items-center justify-content-between py-3">
   <h4 className=' mx-3  fw-bold'> {el.title.split(' ').slice(0,2).join(' ')}</h4>
   <p className=' free mx-3 rounded-2 px-1 py-0'>Free</p>
   </div>
   </div>
   </Link>:<Loading/>}
  </div>
  
   )}
        </div>
      </div>
    </>:<LoadingDtls/>}
  
  </>
  
}
