import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PhotoIcon from "@mui/icons-material/Photo";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const ChatInfo = ({ selectedCons }) => {
  const renderMembers = () => {
    if (selectedCons !== null) {
      return selectedCons.participants.map((p) => {
        return (
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={"10px"}
            key={p.id}
          >
            <Avatar>{p.nickName.slice(0, 1)}</Avatar>
            <Typography>{p.nickName}</Typography>
            {/* <Typography variant="caption">{p.nickName}</Typography> */}
          </Stack>
        );
      });
    }
  };
  return (
    <>
      <Typography variant="h5" marginBottom={"20px"}>
        <b>Chat Info</b>
      </Typography>
      <Typography variant="h6">
        <b>Files</b>
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <PhotoIcon />
          <Typography className="accordion-header">Photo (256)</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ height: "300px" }}>
          <img
            className="accordion-img"
            src="https://images.unsplash.com/photo-1604998103924-89e012e5265a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <img
            className="accordion-img"
            src="https://images.unsplash.com/photo-1604998103924-89e012e5265a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <img
            className="accordion-img"
            src="https://images.unsplash.com/photo-1604998103924-89e012e5265a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <img
            className="accordion-img"
            src="https://images.unsplash.com/photo-1604998103924-89e012e5265a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Button variant="contained">See all</Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <AudiotrackIcon />
          <Typography className="accordion-header">Audio (23)</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ height: "100px" }}></AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <InsertDriveFileIcon />
          <Typography className="accordion-header">File (100)</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ height: "100px" }}></AccordionDetails>
      </Accordion>

      <Typography variant="h6" margin={"10px 0"}>
        <b>
          Members (
          {selectedCons !== null ? selectedCons.participants.length : 0})
        </b>
      </Typography>
      <Stack gap={"10px"}>{renderMembers()}</Stack>
    </>
  );
};

export default ChatInfo;
