"use client";
import Steps from "@/components/Steps";
import React, { useState } from "react";
import General from "./General";
import LocationAndDate from "./LocationAndDate";
import Media from "./Media";
import Tickets from "./Tickets";

const EventForm = () => {
  const [activeSteps, setActiveSteps] = useState(0);
  return (
    <div>
      <Steps
        stepNames={["General", "Location & Date", "Media", "Tickets"]}
        stepContent={[<General />, <LocationAndDate />, <Media />, <Tickets />]}
        activeStep={activeSteps}
      />
    </div>
  );
};

export default EventForm;
