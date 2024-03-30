import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import useCategories from "../hooks/useCategories";

interface Category {
  id: number;
  name: string;
}

export interface FetchResponse {
  count: number;
  results: Category[];
}

function CategoryList() {
  

  const { data: categories } = useCategories()

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
          {categories?.results.map((cat) => (
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
