import React from 'react';
import { useNavigate } from 'react-router-dom';
//import CardMedia from "@mui/material/CardMedia";
import { /*CardActions,*/ CardContent, Card, Typography, Rating } from '@mui/material';
import "./Card.css";
//import { useSelector } from 'react-redux';
//import CardVideo from '../CardVideo/CardVideo';
import ReactPlayer from 'react-player';
// import Button from '../Buttons/Buttons';

const video = 'https://www.youtube.com/watch?v=QrDJ9zv0Pwg&ab_channel=ENTERTAIMENTNOW'//para mostrar solamente!
<<<<<<< HEAD

const MaterialCard = ({ id, name, image, price, teacher, rating, isLoggedIn }) => {
	// console.log(id);

	let navigate = useNavigate();

	const handleClickCard = () => {
		navigate(`/courses/${id}`)
	}

	return (
		<Card sx={{ width: 270 }} onClick={handleClickCard}>
			{/* <CardMedia
=======


const MaterialCard = ({ id, name, image, price, teacher, rating , description,onClick}) => {

	// console.log(id);

	let navigate = useNavigate();

	const handleClickCard = () => {
		navigate(`/courses/${id}`)
	}


              return (
						<Card sx={{ width: 270 }} onClick={ onClick? onClick : handleClickCard}>
								{/* <CardMedia

>>>>>>> 56dc094e07215cc905c1364c5d27f0b148dec86d
									component="img"
									height="140"
									image={image}
									alt={name}
								/> */}
<<<<<<< HEAD
			<ReactPlayer
				url={video} //{image} seria la url que esta guardada en la bd
				width='100%'
				height='auto'
				controls
				volume={0.5} />
			<CardContent>
				<Typography gutterBottom variant="body2" component="div" sx={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>
					{name}
				</Typography>
				{isLoggedIn !== 'teacher'
					&& (
						<Typography gutterBottom variant="body2" color="text.secondary" >
							{teacher}
						</Typography>
					)}
				<Rating name="read-only" value={rating} readOnly />
				<Typography variant="body1" color="text.secondary" >
					$ {price}
				</Typography>
			</CardContent>
=======

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
        {rating? <Rating name="read-only" value={rating} readOnly />: null}          
									<Typography variant="body1" color="text.secondary" >
										$ {price? price : description}
									</Typography>
								</CardContent>
					
			
>>>>>>> 56dc094e07215cc905c1364c5d27f0b148dec86d
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
	)
<<<<<<< HEAD
=======

>>>>>>> 56dc094e07215cc905c1364c5d27f0b148dec86d
};

export default MaterialCard;