import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
//import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import "./Card.css";
//import { useSelector } from 'react-redux';
//import CardVideo from '../CardVideo/CardVideo';
import ReactPlayer from 'react-player';

const video= 'https://www.youtube.com/watch?v=QrDJ9zv0Pwg&ab_channel=ENTERTAIMENTNOW'//para mostrar solamente!

const MaterialCard = ({ id, name, image, price, teacher, rating }) => {
	// console.log(id);

  let navigate = useNavigate();

  const handleClickCard = () => {
    navigate(`/courses/${id}`)
  }

  return (
						<Card sx={{ width: 270 }} onClick={handleClickCard}>
								{/* <CardMedia
									component="img"
									height="140"
									image={image}
									alt={name}
								/> */}
								<ReactPlayer
								 url={video} //{image} seria la url que esta guardada en la bd
								 width='100%'
								 height='50%'
								 controls
								 volume='0.5'/>
								<CardContent>
									<Typography gutterBottom variant="body2" component="div" sx={{fontSize: 15, fontWeight: 700, lineHeight: 1.2}}>
										{name}
									</Typography>
									<Typography gutterBottom variant="body2" color="text.secondary" >
										{teacher}
									</Typography>
                  <Rating name="read-only" value={rating} readOnly />
									<Typography variant="body1" color="text.secondary" >
										$ {price}
									</Typography>
								</CardContent>
						</Card>
  ) 
};

export default MaterialCard;
