import React from 'react';
import { Link } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./Card.css";

const MaterialCard = ({ id, name, image, price, description }) => {
  return (
    <div className='card'>
      <Link to={`/courses/${id}`}>
						<Card sx={{ maxWidth: 345 }} className="">
							<CardActionArea>
								<CardMedia
									component="img"
									height="140"
									image={image}
									alt={name}
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{description}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Link>
    </div>
  ) 
};

export default MaterialCard;
