import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import useCategories from "../hooks/useCategories";
import useLocations from "../hooks/useLocations";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  const { data: categories } = useCategories();
  const { data: locations } = useLocations();

  return (
    <Grid container spacing={3} padding={3}>
      <FormGrid item xs={12}>
        <TextField label="Title" id="title" name="title" required />
      </FormGrid>
      <FormGrid item xs={12}>
        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
          required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <DateTimePicker label={"Start Date"} ampm={false} />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <DateTimePicker label={"End Date"} ampm={false} />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <TextField id="category" label="Category" required select>
          {categories?.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          sx={{height:'100%'}}
          startIcon={<CloudUploadIcon />}
        >
          Upload Event Image
          <VisuallyHiddenInput type="file" />
        </Button>
      </FormGrid>
      <FormGrid item xs={6}>
        <TextField id="location" label="Location" required select>
          {locations?.map((l) => (
            <MenuItem key={l.id} value={l.id}>
              {l.name}
            </MenuItem>
          ))}
        </TextField>
      </FormGrid>
      <FormGrid item xs={6}>
        <Button sx={{ height: "100%" }} variant="outlined" disabled>
          Create new Location (Temporarily unavailable)
        </Button>
      </FormGrid>
      <FormGrid item xs={12} sm={2}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </FormGrid>
    </Grid>
  );
}

export default EventCreatePage;
