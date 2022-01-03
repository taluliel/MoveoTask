import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  FormLabel,
  Input,
  Divider,
  TextField,
} from "@mui/material";
import emailjs from "@emailjs/browser";
import CheckIcon from "@mui/icons-material/Check";
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

export default function EmailModal(props) {
  const form = useRef();
  const [open, setOpen] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState({ sent: false, text: "" });
  const handleClose = () => {
    setOpen(false);
    props.closeModal(false);
  };

  useEffect(() => {
    console.log(props);
    setOpen(props.open);
    setConfirmMsg("");
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_nrcs3pu",
        "template_vxq9m4q",
        form.current,
        "user_LcYrNBEpLjYk2LWeoGuQu"
      )
      .then(
        (result) => {
          console.log(result.text);
          if (result.status === 200) {
            setConfirmMsg({ sent: true, text: "Email sent" });
          }
        },
        (error) => {
          console.log(error.text);
          setConfirmMsg({ sent: false, text: "Email not sent" });
        }
      );
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form className="form" ref={form} onSubmit={sendEmail}>
            <Typography variant="h6">Sending A New Email</Typography>
            <Divider />
            <br />
            <FormLabel>Name:</FormLabel>
            <br />
            <Input required className="input" type="text" name="to_name" />{" "}
            <br />
            <br />
            <FormLabel>Email:</FormLabel>
            <br />
            <Input
              className="input"
              type="email"
              name="user_email"
              value={props.email}
            />
            <br /> <br />
            <FormLabel>Message:</FormLabel>
            <br />
            <TextField className="input" multiline name="message" />
            <br /> <br />
            <FormLabel>From:</FormLabel>
            <br />
            <Input className="input" type="text" name="from_name" />
            <br />
            <br />
            <Button
              style={{ margin: "5px" }}
              variant="outlined"
              color="success"
              onClick={sendEmail}
            >
              Send
            </Button>
            <Button
              style={{ margin: "5px" }}
              variant="outlined"
              onClick={() => handleClose()}
            >
              Close
            </Button>
            <Typography
              variant="h6"
              style={{
                color: confirmMsg.sent === true ? "green" : "red",
              }}
            >
              {confirmMsg.text}
            </Typography>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
