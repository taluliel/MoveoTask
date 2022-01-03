import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import EmailModal from "./EmailModal";
import { useJsApiLoader } from "@react-google-maps/api";
import Maps from "./Map";

export default function User() {
  const [user, setUsers] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    setUsers(state);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD97b1V--mTTGxvKW369X9idQ7hYk6J4og",
  });

  return (
    <div style={{ margin: 12 }}>
      <h2>User Details</h2>
      <div>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/");
          }}
        >
          Back To All Users
        </Button>
      </div>
      {Object.keys(user).length > 0 && (
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={<Avatar alt="userImage" src={user.img} />}
            title={"Name: " + user.name}
            subheader={
              <Button
                onClick={(e) => {
                  setOpen(true);
                }}
              >
                {user.email}
              </Button>
            }
          />
          <Divider textAlign="center" variant="fullWidth" />
          <CardContent style={{ padding: 5 }}>
            {" Gender: " + user.gender}

            {" | Age: " + user.age}
          </CardContent>
          <Divider textAlign="center" variant="fullWidth" />
          <CardContent>
            {isLoaded && (
              <Maps
                position={{
                  lat: parseInt(user.location.coordinates.latitude),
                  lng: parseInt(user.location.coordinates.longitude),
                }}
              />
            )}
          </CardContent>
        </Card>
      )}
      {open && (
        <EmailModal
          email={user.email}
          open={open}
          closeModal={(data) => {
            setOpen(data);
          }}
        />
      )}
    </div>
  );
}
