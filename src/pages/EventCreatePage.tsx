import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Alert,
  Box,
  Button,
  Grid,
  LinearProgress,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Controller, FieldValues, useForm } from "react-hook-form";
import useCategories from "../hooks/useCategories";
import useLocations from "../hooks/useLocations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import authHeader from "../services/auth-header";
import { useState } from "react";

export interface Event {
  title: string;
  description: string;
  date: Dayjs | null;
  end_date: Dayjs | null;
  category?: number;
  location?: number;
}

interface FormData {
  title: string;
  description: string;
  date: Dayjs | null;
  endDate: Dayjs | null;
  category: number;
  location: number;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

function EventCreatePage() {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);

  const createEvent = useMutation({
    mutationFn: (event: Event) => {
      return axios
        .post<Event>("http://127.0.0.1:8000/events/", event, {
          headers: authHeader(),
        })
        .then((res) => res.data);
    },
    onSuccess: (data, newData) => {
      setSuccess(true);
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      date: null as Dayjs | null,
      endDate: null as Dayjs | null,
    },
  });

  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: locations, isLoading: loadingLocations } = useLocations();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    createEvent.mutate({
      title: data.title,
      description: data.description,
      date: data.date,
      end_date: data.endDate,
      category: data.category,
      location: data.location,
    });
  };

  if (loadingCategories || loadingLocations) return <LinearProgress />;

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={3} padding={3} onSubmit={handleSubmit(onSubmit)}>
        {/* Success message */}
        {success && (
          <FormGrid item xs={12}>
            <Alert variant="outlined" severity="success">
              Event created successfully
            </Alert>
          </FormGrid>
        )}
        <FormGrid item xs={12}>
          {/* Title */}
          <TextField
            label="Title"
            id="title"
            required
            {...register("title", { required: true, minLength: 3 })}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          {/* Description */}
          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            required
            {...register("description", { required: true })}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          {/* Date */}
          <Controller
            control={control}
            name="date"
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <DateTimePicker
                  label="Start Date *"
                  value={field.value}
                  inputRef={field.ref}
                  ampm={false}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                />
              );
            }}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          {/* End Date */}
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => {
              return (
                <DateTimePicker
                  label="End Date"
                  value={field.value}
                  inputRef={field.ref}
                  ampm={false}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                />
              );
            }}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          {/* Category */}
          <TextField
            id="category"
            label="Category"
            select
            defaultValue={""}
            {...register("category")}
          >
            <MenuItem>1</MenuItem>
            {categories?.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          {/* Image Upload Button */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            sx={{ height: "100%" }}
            startIcon={<CloudUploadIcon />}
          >
            Upload Event Image
            <VisuallyHiddenInput type="file" />
          </Button>
        </FormGrid>
        <FormGrid item xs={6}>
          {/* Location */}
          <TextField
            id="location"
            label="Location"
            select
            defaultValue={""}
            {...register("location")}
          >
            {locations?.map((l) => (
              <MenuItem key={l.id} value={l.id}>
                {l.name}
              </MenuItem>
            ))}
          </TextField>
        </FormGrid>
        <FormGrid item xs={6}>
          {/* Add Location Button */}
          <Button sx={{ height: "100%" }} variant="outlined" disabled>
            Create new Location (Temporarily unavailable)
          </Button>
        </FormGrid>
        <FormGrid item xs={12} sm={2}>
          {/* Submit Button */}
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </FormGrid>
      </Grid>
    </Box>
  );
}

export default EventCreatePage;
