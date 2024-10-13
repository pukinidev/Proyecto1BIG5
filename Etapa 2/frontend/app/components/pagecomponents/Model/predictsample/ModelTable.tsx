import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import {
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

interface ModelTableProps {
  data: { Textos_espanol: string }[];
}

export default function ModelTable({ data }: ModelTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Frases</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {row.Textos_espanol}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5]}
        sx={{
          "@media (max-width: 600px)": {
            ".MuiTablePagination-toolbar": {
              flexWrap: "wrap",
            },
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
              {
                display: "none",
              },
          },
        }}
      />
    </Paper>
  );
}
