import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import authHeader from "../services/auth-header";
import EventCard from "./EventCard";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { Link, useNavigate, useNavigation } from "react-router-dom";

export interface Event {
  id: number;
  title: string;
  date: string;
  price: string;
  images: Image[] | [];
}

interface Image {
  id: string;
  image: string;
}

export interface FetchResponse {
  count: number;
  results: Event[];
}

function EventsList() {
  const navigate = useNavigate();

  const fetchEvents = () =>
    axios
      .get<FetchResponse>("http://127.0.0.1:8000/events/", {
        headers: authHeader(),
      })
      .then((res) => res.data.results);

  const {
    data: events,
    error,
    isLoading,
  } = useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (error?.message.includes("401"))
    return (
      <Box padding={3}>
        <Typography>
          Authorization failed, Please <Link to={"/login"}>Login</Link>
        </Typography>
      </Box>
    );

  if (isLoading)
    return (
      <Box padding={3}>
        <CircularProgress />
      </Box>
    );

  return (
    <Grid container spacing={2} padding={3}>
      {events?.map((e) => (
        <Grid item xs={3}>
          {" "}
          <EventCard event={e} />{" "}
        </Grid>
      ))}
    </Grid>
  );
}

export default EventsList;
