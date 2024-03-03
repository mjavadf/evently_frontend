import Grid from "@mui/material/Grid";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item sx={{display: {xs: "none" , md: "block"}}} md={3} bgcolor={"yellowgreen"}>SideBar</Grid>
        <Grid item  xs={12} md={9} bgcolor={"orangered"}>Main</Grid>
      </Grid>
    </>
  );
}

export default App;
