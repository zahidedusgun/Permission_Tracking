import React, { Fragment} from "react";

import Box from "@mui/material/Box";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button } from "@mui/material";




interface DashboardProps {
  setAuth: (value: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {
  

  return (
    <Fragment>

      <Box sx={{ marginTop: "auto", marginBottom: "25px" }}>
            <Button color="error">
              <ExitToAppIcon onClick={() => setAuth(false)} />
            </Button>
            {"Çıkış"}
          </Box>{" "}
    </Fragment>
  );
};

export default Dashboard;