import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

export interface FetchResponse {
  count: number;
  results: Category[];
}

function CategoryList() {
  const fetchTodos = () =>
    axios
      .get<FetchResponse>("http://127.0.0.1:8000/categories")
      .then((res) => res.data.results);

  const { data: categories } = useQuery<Category[], Error>({
    queryKey: ["categoeries"],
    queryFn: fetchTodos,
  });

  return (
    <Box>
      <nav aria-label="Categories">
        <List 
        dense={true}
        subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Categories
        </ListSubheader>
      }>
          {categories?.map((cat) => (
            <ListItem disablePadding key={cat.id}>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary={cat.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}

export default CategoryList;
