import React from "react";
import Event from "../entities/Event";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import MaterialRouterLink from "./MaterialRouterLink";
import NoImage from "../assets/NoImage.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import EuroIcon from "@mui/icons-material/Euro";
import { StaticRouter } from 'react-router-dom/server';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
} from 'react-router-dom';

interface Props {
  event: Event;
}

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

function EventCard({ event }: Props) {
  return (
    <Card key={event.id} variant="outlined">
      <Link to={`/events/${event.id}`}>
        <CardMedia
          sx={{ height: 140 }}
          image={event.cover != null ? event.cover : NoImage}
        />
      </Link>
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
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Chip
            icon={<CalendarMonthIcon />}
            label={dayjs(event?.date).format("DD/MM/YYYY | HH:mm")}
          />
          <Chip icon={<EuroIcon />} label={event.price} color="secondary" />
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth component={RouterLink} to={`/events/${event.id}`}>Details</Button>
      </CardActions>
    </Card>
  );
}

export default EventCard;
