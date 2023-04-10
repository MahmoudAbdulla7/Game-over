import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

export default function MediaItem({el}) {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true);
    }, 500);})


  return <>
{isLoading ? 
<div  className="col-lg-4 col-6 col-sm-6 col-xl-3  scl">
  <Link to={`/itemDetails/${el.id}`}>
 <div className="rgstr mb-3 shadow-lg h-100">
 <img className='w-100' src={el.thumbnail} alt="" />
 <div className="d-flex justify-content-between pt-2">
 <h4 className=' mx-3 font fs-5 fw-bold '> {el.title.split(' ').slice(0,3).join(' ').split(':').slice(0,1).join(' ')}</h4>
 <p className=' free mx-3 rounded-2 px-1  py-0'>Free</p>

 </div>
 <p className=' mx-3 font p-0 m-0 text-muted'> {el.short_description.split(' ').slice(0,3).join(' ')}...</p>

<div className="win d-flex justify-content-between">
<i className="far fa-plus-square mx-3 my-2 mb-3 fw-bold"></i>

 <div className="genre">
  <small className='me-1 bg-dark p-1 rounded-3 font'>{el.genre}</small>
 <i className="fab fa-windows my-2 mb-3 me-3"></i>
 </div>
</div>


 </div>
 </Link>
</div> : <div className="col-lg-4 col-6 col-sm-6 col-xl-3 my-2"> <Loading/></div>  }
  
  </>
}
