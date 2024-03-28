import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useEvents from "../hooks/useEvents";
import EventCard from "./EventCard";
import SkeletonCard from "./SkeletonCard";

function EventsList() {
  const navigate = useNavigate();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const { data: events, error, isLoading } = useEvents();

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
      <Grid container spacing={2} padding={3}>
      {skeletons?.map((e) => (
        <Grid item xs={12} sm={6} md={4} key={e}>
          <SkeletonCard />
        </Grid>
      ))}
    </Grid>
    );

  return (
    <Grid container spacing={2} padding={3}>
      {events?.map((e) => (
        <Grid item xs={12} sm={6} md={4} key={e.id}>
          <EventCard event={e} />
        </Grid>
      ))}
    </Grid>
  );
}

export default EventsList;
