import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import  Ticket  from "../entities/Ticket" ;
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { getCurrentUser } from "../services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  ticket: Ticket;
  organizerId: number;
  eventId: number;
}

function EventTicket({ ticket, organizerId, eventId }: Readonly<Props>) {
  let avilability = ticket.available;
  const currentUserId = getCurrentUser()?.user_id;

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/events/${eventId}/tickets/${ticket.id}/`)
      .then(() => {
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
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
            label={`Available seats: ${ticket.capacity - (ticket.purchased ?? 0)}`}
          />

          {ticket.needs_approval && (
            <Chip
              color="warning"
              label="Approval needed"
              size="small"
              variant="outlined"
              sx={{ marginTop: 1 }}
              icon={<PriorityHighIcon />}
            />
          )}
        </CardContent>
        <CardActions>
          <Button startIcon={<ShoppingCartIcon />}>Reserve</Button>
          {currentUserId === organizerId && (
            <Button color="error" onClick={handleClickOpen}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete the ticket?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>
              <Typography component={"b"} color={"error"}>
                Warning!
              </Typography>{" "}
              Deleting this ticket is permanent.
              <br />
              Are you absolutely sure you want to proceed?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="outlined" color="error">
            Delete
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EventTicket;
