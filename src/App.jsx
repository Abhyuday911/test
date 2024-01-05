import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Container } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    editable: true,
  },
  {
    field: "width",
    headerName: "Width",
    width: 150,
    editable: true,
  },
  {
    field: "height",
    headerName: "Height",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "url",
    headerName: "url",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 360,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function App() {
  const [rows, setRows] = useState([]);
  const getData = async () => {
    try {
      const { data } = await axios.get(
        "https://picsum.photos/v2/list?page=2&limit=100"
      );
      const structuredData = data.map((elem, id) => {
        elem.id = id + 1;
      });
      console.log(structuredData);
      setRows(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container sx={{pt:10}}>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}
