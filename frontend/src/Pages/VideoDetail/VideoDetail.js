import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import Navbar from '../../Components/NavBars/Navbars';
import Loader from "../../Components/Loader/Loader";
import s from './VideoDetail.module.css'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideosDetail } from '../../Actions/videos.actions'




function VideoDetail({ isLoggedIn }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { videosdetail } = useSelector((state) => state.videosCursos);


    useEffect(() => {
        dispatch(getVideosDetail(id));

    }, [dispatch, id]);

    return (
        <div className={s.conteinerVideo} >
            <Navbar isLoggedIn={isLoggedIn} />

            {videosdetail ?
                (<div >
                    <div className={s.contenedor} >
                        {/* <ReactPlayer
                            className={s.video}
                            url={videosdetail.url} //{courseDetail?.img} ---->  url del video!!!
                            width="100%"
                            height="100%"
                            controls
                            volume={0.5}
                        /> */}
                        <iframe
                            className={s.video}
                            src={videosdetail.url} //{courseDetail?.img} ---->  url del video!!!
                            width="100%"
                            height="100%"
                            title={videosdetail?.title}
                        />
                        <div className={s.info}>
                            <header >
                                <h1 >{videosdetail?.title}</h1>
                            </header>
                            <p>{videosdetail?.description}</p>
                        </div>

                    </div>
                </div>) : (
                    <Loader />
                )}
            {/* <div>
                    <h1>
                        holaaaaaaa
                        {videosdetail.title}
                    </h1>
                </div> */}

        </div>
    )

}
export default VideoDetail;