import React from "react";
import { Event } from "../hooks/useEvents";
import { Card, CardContent, CardMedia, Paper, Typography } from "@mui/material";

interface Props {
  event: Event;
}

function EventCard({ event }: Props) {
  return (
    <Card key={event.id} variant="outlined">
      <CardMedia
        sx={{ height: 140 }}
        image={event.cover != null ? event.cover : "https://source.unsplash.com/random?event"}
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
