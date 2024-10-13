import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import ModelDetail from "./ModelDetail";

import { useState } from "react";
import { Button } from "@mui/material";

export default function ModelContainer({ data }: ModelContainerProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataModel, setDataModel] = useState<PredictionInterface | null>(null);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const selectedModel = (row: PredictionInterface) => {
    setDataModel(row);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Texto</TableCell>
                <TableCell>Detalles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData?.map((row) => (
                <TableRow key={row.Texto}>
                  <TableCell>{row.Texto}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => selectedModel(row)}
                      variant="contained"
                      color="primary"
                      sx={{
                        color: "white",
                      }}
                    >
                      {" "}
                      Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={data?.length || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
      {dataModel && <ModelDetail data={dataModel} />}
    </>
  );
}
