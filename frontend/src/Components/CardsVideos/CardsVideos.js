import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

import getVideosCurses from '../../Actions/videos.actions'

import MaterialCard from '../Card/Card';



const CardsVideos=({id})=>{
	const {videos_curses} = useSelector((state) => state.videosCursos);

    const dispatch=useDispatch();

    useEffect(() => {
		dispatch(getVideosCurses(id));
		// getData();
	}, [dispatch, id]);
    
    let navigate = useNavigate();
  
    const handleClickCardVideo = ()=> {
        navigate(`/video/detail/${id}`)
      }


 return(
     <section style={{"display": "flex" , "marginLeft" : "45px"}}>
            {videos_curses?
            
                videos_curses.map(v=> {
                    return(
                        <MaterialCard
                        key={v.id}
                        id={v.id}
                        name={v.title}
                        description={v.description}
                        image={v.url}// seria la url del video 
                        cursoId={v.cursoId}
                        onClick={handleClickCardVideo}
                      
                                    
                />)
            })
         
              :null
         
         
         }

     </section>

 )
}

export default CardsVideos;