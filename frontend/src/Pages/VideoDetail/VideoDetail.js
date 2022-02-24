import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import Navbar from '../../Components/NavBars/Navbars';
import Loader from "../../Components/Loader/Loader";
import Button from '../../Components/Buttons/Buttons';
import s from './VideoDetail.module.css'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideosDetail } from '../../Actions/videos.actions'


function VideoDetail({ isLoggedIn }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { videosdetail } = useSelector((state) => state.videosCursos);


    useEffect(() => {
        dispatch(getVideosDetail(id));

    }, [dispatch, id]);

    return (
        <div className={s.conteinerVideo} >
            <Navbar isLoggedIn={isLoggedIn} />
            <Button
                    btnVariant={'raised'}
                    text={'Volver atras'}
                    link={``}
                    onClick={() => navigate(-1)}
                >
                </Button>
            {videosdetail ?
                (<div >
                    <div className={s.contenedor} >
                        <ReactPlayer
                            className={s.video}
                            url={videosdetail.url} //{courseDetail?.img} ---->  url del video!!!
                            width="100%"
                            height="100%"
                            controls
                            volume={0.5}
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