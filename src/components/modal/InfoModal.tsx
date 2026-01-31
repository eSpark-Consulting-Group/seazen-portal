import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InfoModal(props) {
  const { open, setOpen, infoText, actionButtonLabel, actionButtonOnClick } =
    props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidthnted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: 327,
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },

          "@media (max-width: 500px)": {
            width: "375px",
            margin: "30px",
          },

          "@media (max-width: 400px)": {
            width: "90%",
            margin: "25px",
          },
        }}
      >
        <InfoOutlinedIcon
          color="error"
          sx={{
            fontSize: 40,
          }}
        />
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            align="center"
            fontWeight={700}
            color="textSecondary"
          >
            {infoText}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
          }}
        >
          <Button
            size="small"
            variant="contained"
            onClick={actionButtonOnClick ? actionButtonOnClick : handleClose}
          >
            {actionButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
