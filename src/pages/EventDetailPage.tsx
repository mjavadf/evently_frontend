import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FaceIcon from "@mui/icons-material/Face";
import { Avatar, Box, Chip, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import useEvent from "../hooks/useEvent";

function EventDetailPage() {
  const params = useParams();
  const eventId = params.id || "-1";

  const { data: event, error, isLoading } = useEvent(parseInt(eventId));

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={9} paddingY={2}>
        <Box
          component={"img"}
          borderRadius={2}
          border={"0.5px solid #c4c4c4"}
          src={event?.cover || "https://source.unsplash.com/random?event"}
          height={"360px"}
          width={"100%"}
          sx={{
            objectFit: "cover",
            objectPosition: "50% 10%",
          }}
          display={"block"}
          margin={"auto"}
        />
      </Grid>
      <Grid xs={9}>
        <Typography variant="h4" gutterBottom>
          {event?.title}
        </Typography>
      </Grid>
      <Grid xs={9}>
        <Stack spacing={1} direction={"row"}>
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
      <Grid item xs={9} marginTop={3}>
        <Typography variant="body1" gutterBottom>
          {event?.description}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default EventDetailPage;
