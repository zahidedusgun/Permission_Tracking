import React, { Fragment, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button } from "@mui/material";
import Sidenav from "./Sidenav";

interface DashboardProps {
  setAuth: (value: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {
  const [username, setUsername] = useState("");

  // async function getName() {
  //   try {
  //     const response = await fetch("http://localhost:8000/dashboard", {
  //       method: "GET",
  //       headers: { token: localStorage.token },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Sunucudan geçerli bir yanıt alınamadı.");
  //     }

  //     const parseRes = await response.json();
  //     console.log(parseRes);
  //     setUsername(parseRes.username);
  //   } catch (err) {
  //     console.error((err as Error).message);
  //   }
  // }

  // useEffect(() => {
  //   getName();
  // }, []);

  return (
    <Fragment>
      <Box
        sx={{ marginTop: "150px", marginBottom: "25px", marginLeft: "100px" }}
      >
        <Button color="error">
          <ExitToAppIcon onClick={() => setAuth(false)} />
        </Button>
        {username}
      </Box>{" "}
      <Sidenav />
    </Fragment>
  );
};

export default Dashboard;
