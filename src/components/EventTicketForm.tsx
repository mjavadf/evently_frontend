import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Ticket } from "../hooks/useEvent";
import apiClient from "../services/api-client";

interface FormData {
  id: number;
  title: string;
  price: number;
  capacity: number;
  description: string;
  needs_approval: boolean;
}

interface Props {
  onCancel: () => void;
  onSuccessfulSubmit: () => void;
  eventId: number;
}

function EventTicketForm({ onCancel, eventId, onSuccessfulSubmit }: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    addTicket.mutate(data);
  };

  const addTicket = useMutation({
    mutationFn: (ticket: FormData) => {
      return apiClient
        .post<Ticket>(`/events/${eventId}/tickets/`, ticket)
        .then((res) => res.data);
    },
    onSuccess: () => onSuccessfulSubmit(),
  })

  return (
    <Card variant="outlined">
      <Grid padding={2} component="form" noValidate container spacing={1}>
        {/* Title */}
        <Grid item xs={12}>
          <TextField
            label="Title"
            id="title"
            variant="outlined"
            required
            fullWidth
            {...register("title", { required: true, minLength: 3 })}
          />
        </Grid>
        {/* Price */}
        <Grid item xs={12}>
          <TextField
            label="Price"
            id="price"
            variant="outlined"
            type="number"
            required
            fullWidth
            {...register("price", { required: true })}
          />
        </Grid>
        {/* Capacity */}
        <Grid item xs={12}>
          <TextField
            label="Capacity"
            id="capacity"
            variant="outlined"
            type="number"
            required
            fullWidth
            {...register("capacity", { required: true })}
          />
        </Grid>
        {/* Description */}
        <Grid item xs={12}>
          <TextField
            label="Description"
            id="description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            {...register("description")}
          />
        </Grid>
        {/* Needs approval */}
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Needs approval"
            {...register("needs_approval")}
          />
        </Grid>
        {/* ID */}
        <TextField
          label="id"
          id="id"
          variant="outlined"
          {...register("id")}
          value={eventId}
          sx={{ display: "none" }}
        />
        {/* Submit Button */}
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Grid>
        {/* Cancel Button */}
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default EventTicketForm;
