import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { Ticket } from "../hooks/useEvent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import EventSeatIcon from '@mui/icons-material/EventSeat';

interface Props {
  ticket: Ticket;
}

function EventTicket({ ticket }: Readonly<Props>) {
  let avilability = ticket.available;
  return (
    <Card
      variant="outlined"
      sx={{
        opacity: avilability ? 1 : 0.5,
        pointerEvents: avilability ? "auto" : "none",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {ticket.title}
        </Typography>
        <Typography variant="body1" gutterBottom noWrap>
          {ticket.description}
        </Typography>
        <Chip
          color="info"
          size="small"
          icon={<EventSeatIcon />}
          label={`Available seats: ${ticket.capacity - ticket.purchased}`}
        />

        {ticket.needs_approval && (
          <Chip
            color="warning"
            label="Approval needed"
            size="small"
            variant="outlined"
            sx={{ marginTop: 1}}
            icon={<PriorityHighIcon />}
          />
        )}
      </CardContent>
      <CardActions>
        <Button startIcon={<ShoppingCartIcon />}>
          Reserve
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventTicket;
