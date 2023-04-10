import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getKindOfgame } from '../store/gamesSlice'
import { useParams } from 'react-router-dom'
import MediaItem from '../MediaItem/MediaItem'
import { Helmet } from 'react-helmet'

export default function Platform() {
    let dispatch =useDispatch()
    let {type} = useParams();
    const [seeMore, setseeMore] = useState(20)
    function seemore(){
      setseeMore(seeMore +20);
    }

    useEffect(()=>{
      dispatch (getKindOfgame(`${type}`) )
        
    },[type])

    let {gms}= useSelector(stt=>stt.gtgms);
    // console.log(gms);
    return (
      <>

<Helmet>
        <title>Platform {type}</title>
        <meta name="description" content="My page description" />
      </Helmet>



    
      <div className="container my-5">
      <div className="row gy-3">
            {gms.slice(0,seeMore).map((el,idx) => <MediaItem key={idx} el={el}/>
    
     )}
    
          </div>
          <div className="butn m-auto w-100 d-flex justify-content-center">
          <button onClick={seemore} className='btn btn-outline-info m-auto my-4 w-25'> See more <i className="fas fa-arrow-right"></i></button>
          </div>
      </div>
    
    
      </>)
}
