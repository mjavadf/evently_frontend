import { Card, CardActions, CardContent, CardMedia, Skeleton, Stack } from "@mui/material";
import React from "react";

function SkeletonCard() {
  return (
    <Card variant="outlined">
      <CardMedia sx={{ height: 140 }}>
        <Skeleton variant="rectangular" width={"100%"} height={"100%"} animation="wave" />
      </CardMedia>
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Skeleton variant="rounded" sx={{ width: "100%" }} />
          <Skeleton variant="rounded" sx={{ width: "100%" }} />
        </Stack>
      </CardContent>
      <CardActions>
      <Skeleton variant="rounded" height={40} sx={{ width: "100%" }}/>
      </CardActions>
    </Card>
  );
}

export default SkeletonCard;
