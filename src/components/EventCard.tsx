import React from "react";
import { Event } from "./EventsList";
import { Card, CardContent, CardMedia, Paper, Typography } from "@mui/material";

interface Props {
  event: Event;
}

function EventCard({ event }: Props) {
  return (
    <Card key={event.id} variant="outlined">
      <CardMedia
        sx={{ height: 140 }}
        image={event.images.length != 0 ? event.images[0].image : "https://source.unsplash.com/random?event"}
      />
      <CardContent>
        <Typography>{event.title}</Typography>
        <Typography>{event.date} </Typography>
        <Typography>{event.price}</Typography>
      </CardContent>
    </Card>
  );
}

export default EventCard;
