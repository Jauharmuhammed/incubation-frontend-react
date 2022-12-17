import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { AuthContext } from "../../context/AuthContext";

import ProgressBar from '../status/ProgressBar'

const columns = [
  { id: "id", label: "Sl.No", minWidth: 70 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "company_name",
    label: "Company Name",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 270,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

export default function StickyHeadTable() {
  const { authTokens } = useContext(AuthContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allApplication, setAllApplication] = useState([]);


  useEffect(() => {
    getAllApplications();
  });

  const getAllApplications = () => {
    axiosInstance
      .get("/incubations/all/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      })
      .then((response) => {
        setAllApplication(response.data);
      });
  };


  

  const rows= allApplication.reverse();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <h4 className="ps-2 py-3 text-center border-bottom fw-bold">
          New Applications
        </h4>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell align="left">
                        <p>{index + 1}</p>
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id !== "status" && column.id !== "action" && column.id !== "id") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                        return null
                      })}
                      <TableCell align="center">
                        <ProgressBar id={row.id}/>
                      </TableCell>
                      
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
  );
}
