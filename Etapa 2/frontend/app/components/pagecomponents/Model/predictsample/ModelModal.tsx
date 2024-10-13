import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModelTable from "./ModelTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "85vw",
    sm: "85vw",
    md: "85vw",
    lg: "85vw",
    xl: "85vw",
  },

  p: { xs: 2, sm: 3, md: 4 },
};

export default function ModelModal({
  open,
  handleClose,
  data,
}: ModelModalProps) {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <Box sx={style}>{data && <ModelTable data={data} />}</Box>
    </Modal>
  );
}
