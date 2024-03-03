import Grid from "@mui/material/Grid";
import "./App.css";

function App() {
  return (
    <>
      <Grid container>
        <Grid item xs={12} bgcolor={"gold"}>Header</Grid>
        <Grid item sx={{display: {xs: "none" , md: "block"}}} md={3} bgcolor={"blueviolet"}>SideBar</Grid>
        <Grid item  xs={12} md={9} bgcolor={"royalblue"}>Main</Grid>
      </Grid>
    </>
  );
}

export default App;
