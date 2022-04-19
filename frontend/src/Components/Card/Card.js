import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import {
  /*CardActions,*/ CardContent,
  Card,
  Typography,
  Rating,
} from "@mui/material";
import "./Card.css";
//import { useSelector } from 'react-redux';
//import CardVideo from '../CardVideo/CardVideo';
import ReactPlayer from "react-player";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { getUserCredentials } from "../../Actions/login.actions";
import { getProfileStudent } from "../../Actions/profile.action.js";
import { getCourseDetail } from "../../Actions/courses.actions";
// import Button from '../Buttons/Buttons';

// const video = "https://www.youtube.com/watch?v=QrDJ9zv0Pwg&ab_channel=ENTERTAIMENTNOW"; //para mostrar solamente!

const MaterialCard = ({
  id,
  name,
  image,
  price,
  teacher,
  rating,
  description,
  cursoId,
  onClick,
}) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataUser } = useSelector((state) => state?.student);
  const { userCredentials } = useSelector((state) => state?.login);
  const { courseDetail } = useSelector((state) => state.courses);
  const MySwal = withReactContent(Swal);

  const handleClickCard = () => {
    navigate(`/courses/${id}`);
  };

  const handleClickCardVideo = () => {
    if (userCredentials.role === "alumno") {
      if (dataUser.courses.includes(courseDetail.id)) {
        navigate(`/video/detail/${id}`);
      } else {
        MySwal.fire({
          position: "center",
          icon: "error",
          title: "Debes comprar el curso para ver este video",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } else {
      navigate(`/video/detail/${id}`);
    }
  };

  useEffect(() => {
    dispatch(getUserCredentials());
  }, []);

  useEffect(() => {
    dispatch(getProfileStudent(userCredentials?.id));
    dispatch(getCourseDetail());
  }, [dispatch]);

  return (
    <Card
      sx={{ width: 270 }}
      onClick={onClick ? handleClickCardVideo : handleClickCard}
    >
      <CardMedia component="img" height="140" image={image} alt={name} />

      {/* <ReactPlayer
        url={video} //{image} seria la url que esta guardada en la bd
        width="100%"
        height="50%"
        controls
        volume="0.5"
      /> */}
      <CardContent>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          sx={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}
        >
          {name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {teacher}
        </Typography>
        {rating ? <Rating name="read-only" value={rating} readOnly /> : null}
        <Typography variant="body1" color="text.secondary">
          $ {price ? price : description}
        </Typography>
      </CardContent>

      {/* {isLoggedIn === 'teacher'
				&& (
					<CardActions>
						<Button
							type={'raised-icon'}
							icon={'ci:edit'}
							text={'Editar'}
							link={''}
							onClick={(e) => alert('Edit course')}
						></Button>
						<Button
							type={'raised-icon'}
							icon={'ic:baseline-delete-forever'}
							text={'Eliminar'}
							link={''}
							onClick={(e) => alert('Edit course')}
						></Button>
					</CardActions>
				)} */}
    </Card>
  );
};

export default MaterialCard;
