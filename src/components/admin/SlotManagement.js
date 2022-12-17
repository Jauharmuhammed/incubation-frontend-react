import React, { useState } from "react";
import { Button, Divider, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axiosInstance from "../../utils/axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { Stack } from "@mui/system";

function SlotManagement() {
  const [slots, setSlots] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { authTokens } = useContext(AuthContext);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedApplication, setSelectedApplication] = useState("");
  const [waitingApplications, setWaitingApplications] = useState([]);
  const [companyName, setCompanyName] = useState([]);

  useEffect(() => {
    getWaitingApplications();
    getSlots();
    getCompany();
  });

  const handleOpen = (id) => {
    setSelectedSlot(id);
    if (!slots[id - 1].company) {
      return setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setSelectedApplication(event.target.value);
  };

  const handleAllocation = () => {
    console.log(selectedApplication);
    console.log(selectedSlot);
    if (selectedApplication) {
      axiosInstance
        .get(`/slot-allocate/${selectedApplication}/${selectedSlot}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens?.access),
          },
        })
        .then((response) => {
          setSlots(
            slots.filter((obj) => {
              if (obj.id === slots[selectedSlot].id-1) {
                obj.company = response.data.company;
                getCompany(response.data.company)
                return obj;
              }
              return obj;
            })
            
          );
          setWaitingApplications(
            waitingApplications.filter((obj)=>{
              if (obj.id !== selectedApplication){
                return obj
              }
              return null
            })
          )
          handleClose();
        });
    }
  };

  const getWaitingApplications = () => {
    axiosInstance
      .get("/incubations/waiting/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      })
      .then((response) => {
        setWaitingApplications(response.data);
      });
  };


  const getCompany = () => {
    axiosInstance
      .get('/incubations/all/', {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      })
      .then((response) => {
        
        setCompanyName(
          response.data.map(({id, company_name})=> {
            return(
              {id, company_name}
            )
          })
        )
      });
  };

  function SlotBox(props) {
    // if (props.text) {
    //   getCompany(props.text);
    // }

    let name = companyName.map((obj)=>{
      if (obj.id === props.text) {
        return(
          obj.company_name
        )
      }
      return null
    })

    return (
      <div className="slotBox">
        <h6 className="slotText">{props.text && name}</h6>
      </div>
    );
  }

  const getSlots = () => {
    axiosInstance
      .get("/slots/all/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens?.access),
        },
      })
      .then((response) => {
        setSlots(response.data);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <h4 className="ps-2 pt-3 pb-5 text-center  fw-bold">Slot Management</h4>
      <Grid container spacing={5}>
        {slots.map((slot, index) => {
          return (
            <Grid
              key={index}
              item
              xs={4}
              md={2}
              onClick={() => handleOpen(slot.id)}
            >
              <SlotBox text={slot.company} />
            </Grid>
          );
        })}
      </Grid>
      <Divider />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Choose an Applicant
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Company</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedApplication}
              label="Company"
              onChange={handleChange}
            >
              {waitingApplications.map((obj) => {
                return (
                  <MenuItem key={obj.id} value={obj.id}>
                    {obj.company_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Stack spacing={12.4} direction="row" paddingTop={3}>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleAllocation}
            >
              Allocate Slot
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default SlotManagement;
