import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import FaceIcon from "@mui/icons-material/Face";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import EventTicket from "../components/EventTicket";
import useEvent from "../hooks/useEvent";
import { getCurrentUser } from "../services/authService";
import { useState } from "react";
import EventTicketForm from "../components/EventTicketForm";

function EventDetailPage() {
  const params = useParams();
  const eventId = params.id || "-1";
  const currentUserId = getCurrentUser()?.user_id;

  const { data: event, error, isLoading } = useEvent(parseInt(eventId));

  const [newTicketForm, setNewTicketForm] = useState(false);

  const navigate = useNavigate();

  return (
    <Container>
      <Grid container paddingY={2}>
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
        <Grid
          item
          container
          xs={12}
          sm={9}
          paddingRight={2}
          alignContent={"flex-start"}
        >
          {/* Title */}
          <Grid item xs={12}>
            {currentUserId === event?.organizer.id && (
              <Button
                startIcon={<EditIcon />}
                color="info"
                variant="outlined"
                sx={{ marginBottom: 1 }}
              >
                Edit Event
              </Button>
            )}
            <Typography variant="h4" gutterBottom>
              {event?.title}{" "}
            </Typography>
          </Grid>
          {/* Date and organizer */}
          <Grid item xs={12}>
            <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
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
              <EventTicket ticket={ticket} key={ticket.id} organizerId={event.organizer.id} eventId={event.id}/>
            ))}
            {currentUserId === event?.organizer.id && !newTicketForm && (
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setNewTicketForm(true)}
              >
                Add new ticket
              </Button>
            )}
            {newTicketForm && (
              <EventTicketForm
                eventId={event?.id || -1}
                onCancel={() => setNewTicketForm(false)}
                onSuccessfulSubmit={() => navigate(0)}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default EventDetailPage;
