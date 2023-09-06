import React from "react";
import HMSidenav from "./HMSidenav";

interface HumanResourcesProps {
  setAuth: (value: boolean) => void;
}


const HumanResources: React.FC<HumanResourcesProps>=({setAuth}) =>{
  return (
    <div>
      <HMSidenav />
    </div>
  );
}

export default HumanResources;
