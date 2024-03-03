import React from "react";
import { EventFormStepsProps } from "./General";
import { Button, Chip, Input } from "@nextui-org/react";

const LocationAndDate = ({
  event,
  activeSteps,
  setActiveSteps,
  setEvent,
}: EventFormStepsProps) => {
  return (
    <div className="flex flex-col gap-5">
      <Input
        label="Location"
        placeholder="Location"
        labelPlacement="outside"
        value={event.location}
        onChange={(e: any) => setEvent({ ...event, location: e.target.value })}
        isRequired={true}
      />

      <div className="flex gap-5">
        <Input
          label="Date"
          placeholder="Date"
          labelPlacement="outside"
          value={event.date}
          onChange={(e: any) => setEvent({ ...event, date: e.target.value })}
          isRequired={true}
          type="date"
        />
        <Input
          label="Time"
          placeholder="Time"
          labelPlacement="outside"
          value={event.time}
          onChange={(e: any) => setEvent({ ...event, time: e.target.value })}
          isRequired={true}
          type="time"
        />
      </div>

      <div className="flex justify-center gap-5">
        <Button onClick={() => setActiveSteps(activeSteps - 1)}>Cancel</Button>
        <Button
          color="primary"
          onClick={() => setActiveSteps(activeSteps + 1)}
          isDisabled={!event?.location || !event?.date || !event?.time}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default LocationAndDate;
