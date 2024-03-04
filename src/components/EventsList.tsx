import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Event {
  id: number;
  title: string;
}

interface FetchResponse {
  count: number;
  results: Event[];
}

function EventsList() {
  const fetchEvents = () =>
    axios.get<FetchResponse>("http://127.0.0.1:8000/events/").then((res) => res.data.results);

  const {data: events} = useQuery<Event[], Error>({
    queryKey: ['events'],
    queryFn: fetchEvents,
  })

  return (
    <ul>
      {events?.map((e) => (
        <li key={e.id}>{e.title}</li>
      ))}
    </ul>
  );
}

export default EventsList;
