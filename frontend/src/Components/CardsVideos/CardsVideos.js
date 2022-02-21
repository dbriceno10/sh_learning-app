import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

import {getVideosCurses} from '../../Actions/videos.actions'
import c from './Cards.module.css'
import MaterialCard from '../Card/Card';



const CardsVideos=({id})=>{
	const {videos_curses} = useSelector((state) => state.videosCursos);

    const dispatch=useDispatch();

    useEffect(() => {
		dispatch(getVideosCurses(id));
		// getData();
	}, [dispatch, id]);
    
    


 return(
     <section className={c.cards}>
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
                        onClick={true}
                      
                                    
                />)
            })
         
              :null
         
         
         }

     </section>

 )
}

export default CardsVideos;