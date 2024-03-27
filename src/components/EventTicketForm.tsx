import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";

function EventTicketForm() {
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
            // {...register("title", { required: true, minLength: 3 })}
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
            // {...register("price", { required: true })}
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
            // {...register("capacity", { required: true })}
          />
        </Grid>
        {/* Description */}
        <Grid item xs={12}>
          <TextField
            label="Description"
            id="description"
            variant="outlined"
            required
            fullWidth
            multiline
            rows={3}
            // {...register("description", { required: true })}
          />
        </Grid>
        {/* Needs approval */}
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox />} label="Needs approval" />
        </Grid>
        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            // onClick={handleSubmit(onSubmit)}
          >Submit</Button>
          </Grid>
      </Grid>
    </Card>
  );
}

export default EventTicketForm;
