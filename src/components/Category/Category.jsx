import React, { useEffect, useState } from 'react'
import { headers, url } from '../store/gamesSlice'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MediaItem from '../MediaItem/MediaItem';
import { Helmet } from 'react-helmet';

export default function Category() {
    const [ctgryGms, setctgryGms] = useState([])
    let {type} = useParams();
    const [seeMore, setseeMore] = useState(20)
    function seemore(){
      setseeMore(seeMore +20);
    }
    async function getCategories(type){
        let {data}= await axios.get(url ,{headers:headers ,params:{'category':type}});
        setctgryGms(data);
    }
    useEffect(()=>{
        getCategories();
    },[type])
  return (
    <>

<Helmet>
        <title>Category {type}</title>
        <meta name="description" content="My page description" />
      </Helmet>
  
    <div className="container my-5">
    <div className="row gy-3">
          {ctgryGms.slice(0,seeMore).map((el,idx) => <MediaItem key={idx} el={el}/>
  
   )}
  
        </div>
        <div className="butn m-auto w-100 d-flex justify-content-center">
        <button onClick={seemore} className='btn btn-outline-info m-auto my-4 w-25'> See more <i className="fas fa-arrow-right"></i></button>
        </div>
    </div>
  
  
    </>)
}
