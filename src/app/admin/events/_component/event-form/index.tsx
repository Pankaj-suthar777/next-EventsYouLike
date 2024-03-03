"use client";
import Steps from "@/components/Steps";
import React, { useState } from "react";
import General from "./General";
import LocationAndDate from "./LocationAndDate";
import Media from "./Media";
import Tickets from "./Tickets";

const EventForm = () => {
  const [activeSteps, setActiveSteps] = useState(0);
  const [event, setEvent] = useState<any>(null);
  async function onSubmit(e: any) {
    e.preventDefault();
  }

  const commonProps = {
    activeSteps,
    setActiveSteps,
    event,
    setEvent,
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Steps
          stepNames={["General", "Location & Date", "Media", "Tickets"]}
          stepContent={[
            <General {...commonProps} />,
            <LocationAndDate {...commonProps} />,
            <Media {...commonProps} />,
            <Tickets {...commonProps} />,
          ]}
          activeStep={activeSteps}
        />
      </form>
    </div>
  );
};

export default EventForm;
