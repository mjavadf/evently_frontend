import Grid from "@mui/material/Grid";
import "./App.css";
import NavBar from "./components/NavBar";
import EventsList from "./components/EventsList";

function App() {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid
          item
          sx={{ display: { xs: "none", md: "block" } }}
          md={2}
        >
          categories
        </Grid>
        <Grid item xs={12} md={10}>
          <EventsList />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
