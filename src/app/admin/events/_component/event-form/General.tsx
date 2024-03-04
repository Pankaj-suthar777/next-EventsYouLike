import { Button, Chip, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export interface EventFormStepsProps {
  event: any;
  setEvent: React.Dispatch<React.SetStateAction<any>>;
  activeSteps: number;
  setActiveSteps: React.Dispatch<React.SetStateAction<number>>;
  newlySelectedImages: any[];
  setNewlySelectedImages: React.Dispatch<React.SetStateAction<any[]>>;
}

const General = ({
  event,
  activeSteps,
  setActiveSteps,
  setEvent,
}: EventFormStepsProps) => {
  const router = useRouter();
  const [guest, setGuest] = useState<string>("");
  const commonInputProps = (name: string) => {
    return {
      labelPlacement: "outside" as any,
      value: event?.[name],
      onChange: (e: any) =>
        setEvent({ ...event, [name]: e.target.value }) as any,
      isRequired: true,
    };
  };

  const onGuestAdd = () => {
    const newGuests = [];
    const commaSeparatedGuests = guest.split(",");

    // if there are more than one guest in the input , use them
    if (commaSeparatedGuests.length > 1) {
      newGuests.push(...commaSeparatedGuests);
    } else {
      // add the single guest
      newGuests.push(guest);
    }

    // check if there are already guests in the event
    if (event?.guests) {
      newGuests.push(...event.guests);
    }

    setEvent({ ...event, guests: newGuests });
    setGuest("");
  };

  const onGuestRemove = (guestIndexToRemove: number) => {
    const newGuests = event?.guests?.filter(
      (gusetName: string, index: number) => index !== guestIndexToRemove
    );
    setEvent({ ...event, guests: newGuests });
  };

  return (
    <div className="flex flex-col gap-5">
      <Input
        label="Event Name"
        placeholder="Enter event name"
        {...commonInputProps("name")}
      />
      <Input
        label="Organizer"
        placeholder="Enter organizer name"
        {...commonInputProps("organizer")}
      />
      <Textarea
        label="Description"
        placeholder="Enter description"
        {...commonInputProps("description")}
      />
      <div className="flex gap-5 items-end">
        <Input
          labelPlacement="outside"
          label="Guest"
          value={guest}
          onChange={(e) => setGuest(e.target.value)}
        />
        <Button onClick={onGuestAdd}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-5">
        {event?.guests?.map((guest: string, index: number) => (
          <Chip onClose={() => onGuestRemove(index)}>{guest}</Chip>
        ))}
      </div>
      <div className="flex justify-center gap-5">
        <Button onClick={() => router.back()}>Cancel</Button>
        <Button
          color="primary"
          onClick={() => setActiveSteps(activeSteps + 1)}
          isDisabled={!event?.name || !event?.organizer || !event?.description}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default General;
