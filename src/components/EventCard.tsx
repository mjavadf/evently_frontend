import React from "react";
import { Event } from "../hooks/useEvents";
import { Card, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MaterialRouterLink from "./MaterialRouterLink";

interface Props {
  event: Event;
}

function EventCard({ event }: Props) {
  return (
    <Card key={event.id} variant="outlined">
      <Link to={`/events/${event.id}`}><CardMedia
        sx={{ height: 140 }}
        image={
          event.cover != null
            ? event.cover
            : "https://source.unsplash.com/random?event"
        }
      /></Link>
      <CardContent>
        <Typography gutterBottom noWrap>
          <MaterialRouterLink
            to={`/events/${event.id}`}
            underline="none"
            color="white"
            variant="h5"
          >
            {event.title}
          </MaterialRouterLink>
        </Typography>
        <Typography>{event.date} </Typography>
        <Typography>{event.price}</Typography>
      </CardContent>
    </Card>
  );
}

export default EventCard;
