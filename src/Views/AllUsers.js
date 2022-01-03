import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/allUsers.css";
import EmailModal from "./EmailModal";
import UsersTable from "./Table";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        let resp = await axios.get(
          "https://randomuser.me/api/?page=3&results=100&seed=abc"
        );
        let allUsersData = [];
        resp.data.results.forEach((element) => {
          let obj = {
            name: (element.name.first + " " + element.name.last).toUpperCase(),
            email: element.email,
            age: element.dob.age,
            gender: element.gender,
            location: element.location,
            img: element.picture.medium,
            userName: element.login.username,
          };
          allUsersData.push(obj);
        });
        setUsers(allUsersData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <UsersTable
        users={users}
        openModal={(data) => {
          setOpen(data);
        }}
        userEmail={(data) => {
          setEmail(data);
        }}
      />

      {open && (
        <EmailModal
          email={email}
          open={open}
          closeModal={(data) => {
            setOpen(data);
          }}
        />
      )}
    </div>
  );
}
