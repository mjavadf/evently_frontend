import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FaceIcon from "@mui/icons-material/Face";
import { Avatar, Box, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import useEvent from "../hooks/useEvent";
import EventTicket from "../components/EventTicket";

function EventDetailPage() {
  const params = useParams();
  const eventId = params.id || "-1";

  const { data: event, error, isLoading } = useEvent(parseInt(eventId));

  return (
    <Container>
      <Grid
      container
      paddingY={2}
    >
      {/* Cover */}
      <Grid item xs={12}>
        <Box
          component={"img"}
          borderRadius={2}
          border={"0.5px solid #c4c4c4"}
          src={event?.cover || "https://source.unsplash.com/random?event"}
          height={"60vh"}
          width={"100%"}
          sx={{
            objectFit: "cover",
          }}
          display={"block"}
          marginX={"auto"}
          marginBottom={2}
        />
      </Grid>
      <Grid item container xs={12} sm={9} paddingRight={2}>
        {/* Title */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {event?.title}
          </Typography>
        </Grid>
        {/* Date and organizer */}
        <Grid item xs={12}>
          <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
            <Chip
              icon={<CalendarMonthIcon />}
              label={
                dayjs(event?.date).format("DD/MM/YYYY | HH:mm") +
                " - " +
                dayjs(event?.endDate).format("DD/MM/YYYY | HH:mm")
              }
              color="primary"
            />
            <Chip icon={<FaceIcon />} label={event?.organizer.username} />
          </Stack>
        </Grid>
        {/* Description */}
        <Grid item xs={12} marginTop={3}>
          <Typography variant="body1" gutterBottom>
            {event?.description}
          </Typography>
        </Grid>
      </Grid>
      {/* Tickets */}
      <Grid item xs={12} sm={3}>
        <Typography variant="h6" gutterBottom>
          Tickets
        </Typography>
        <Stack spacing={2}>
          {event?.tickets.map((ticket) => (
            <EventTicket ticket={ticket} key={ticket.id} />
          ))}
        </Stack>
      </Grid>
    </Grid>
    </Container>
  );
}

export default EventDetailPage;
