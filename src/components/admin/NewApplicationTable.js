import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Button } from "@mui/material";
import { ApplicationViewContext } from "../../context/ApplicationViewContext";
import { Stack } from "@mui/system";

// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";

const columns = [
  { id: "id", label: "Sl.No", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "company_name",
    label: "Company Name",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function StickyHeadTable() {
  const { authTokens } = useContext(AuthContext);
  const { setApplicationDetails } = useContext(ApplicationViewContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newApplication, setNewApplication] = useState([]);
  const [pendingApplication, setPendingApplication] = useState([]);
  const [approvedButton, setApprovedButton] = useState([]);

  const [open, setOpen] = React.useState(false);
  console.log(open);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  console.log(open2);
  // const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const navigate = useNavigate();

  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  // };

  useEffect(() => {
    getNewApplications();
  });

  useEffect(() => {
    getPendingApplications();
  });

  const getNewApplications = () => {
    axiosInstance
      .get("/incubations/new/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      })
      .then((response) => {
        setNewApplication(response.data);
      });
  };

  const getPendingApplications = () => {
    axiosInstance
      .get("/incubations/pending/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      })
      .then((response) => {
        setPendingApplication(response.data);
      });
  };

  function handlePending (e){
    axiosInstance
      .get(`/incubations/pending/${e.target.id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setPendingApplication([response.data, ...pendingApplication]);
          setNewApplication(
            newApplication.filter((obj) => {
              if (obj.id !== response.data.id) {
                return obj;
              }
              return null
            })
          );
        }
      });
  };

  const handleApprove = (e) => {
    axiosInstance
      .get(`/incubations/approve/${e.target.id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setPendingApplication(
            pendingApplication.filter((obj) => {
              if (obj.id === e.target.id) {
                obj.is_approved = true;
                return obj;
              }
              return obj;
            })
          );
          setApprovedButton([...approvedButton, e.target.id]);
          handleClose2();
        }
      });
  };

  const handleDecline = (e) => {
    axiosInstance
      .get(`/incubations/decline/${e.target.id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setPendingApplication(
            pendingApplication.filter((obj) => {
              if (obj.id !== response.data.id) {
                return obj;
              }
              return null
            })
          );
          handleClose();
        }
      });
  };

  const rowsNew = newApplication;
  const rowsPending = pendingApplication;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <h4 className="ps-2 py-3 text-center border-bottom fw-bold">
          New Applications
        </h4>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table" >
            <TableHead >
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
              {rowsNew
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell align="left">
                        <p>{index + 1}</p>
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (
                          column.id !== "status" &&
                          column.id !== "action" &&
                          column.id !== "id"
                        ) {
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
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setApplicationDetails(row);
                            navigate("/admin/application/view");
                          }}
                        >
                          Open
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="warning"
                          id={row.id}
                          onClick={handlePending}
                        >
                          Pending
                        </Button>
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
          count={rowsNew.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Paper sx={{ width: "100%", overflow: "hidden" }} className="mt-4">
        <h4 className="ps-2 py-3 text-center border-bottom fw-bold">
          Pending Applications
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
              {rowsPending
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell align="left">
                        <p>{index + 1}</p>
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (
                          column.id !== "status" &&
                          column.id !== "action" &&
                          column.id !== "id"
                        ) {
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
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setApplicationDetails(row);
                            navigate("/admin/application/view");
                          }}
                        >
                          Open
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Stack spacing={2} direction="row">
                          {row.is_approved ? (
                            <Button variant="outlined" color="success">
                              Approved
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              color="success"
                              id={row.id}
                              onClick={handleApprove}
                            >
                              Approve
                            </Button>
                          )}

                          <Button
                            variant="outlined"
                            color="error"
                            id={row.id}
                            onClick={handleDecline}
                          >
                            Decline
                          </Button>
                        </Stack>
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
          count={rowsPending.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Fragment>
  );
}
