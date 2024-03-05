import React from "react";
import { EventFormStepsProps } from "./General";
import { Button, Input } from "@nextui-org/react";
import toast from "react-hot-toast";

function Tickets({
  activeSteps,
  setActiveSteps,
  event,
  setEvent,
  loading,
}: EventFormStepsProps) {
  function onAddTicket() {
    try {
      const tempEvent = { ...event };
      if (event.ticketTypes) {
        tempEvent.ticketTypes.push({
          name: "",
          price: null,
          limit: null,
        });
      } else {
        tempEvent.ticketTypes = [{ name: "", price: null, limit: null }];
      }
      setEvent(tempEvent);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  }

  const onTicketPropertyChange = ({
    index,
    property,
    value,
  }: {
    index: number;
    property: string;
    value: any;
  }) => {
    const tempEvent = { ...event };
    tempEvent.ticketTypes[index][property] = value;
    setEvent(tempEvent);
  };

  const onTicketTypeDelete = (index: number) => {
    const tempEvent = { ...event };
    tempEvent.ticketTypes.splice(index, 1);
    setEvent(tempEvent);
  };
  return (
    <div>
      {event.ticketTypes && event.ticketTypes.length > 0 && (
        <div className=" flex flex-col gap-5">
          <div className="grid grid-cols-4 font-semibold rounded justify-between p-2 gap-5">
            {["Name", "Price", "Limit", ""].map((item, index) => (
              <h1 className="font-semibold" key={index}>
                {item}
              </h1>
            ))}
          </div>
          {event.ticketTypes.map((ticketType: any, index: number) => (
            <div className="grid grid-cols-4 gap-5" key={index}>
              <Input
                placeholder="Name"
                onChange={(e) =>
                  onTicketPropertyChange({
                    index,
                    property: "name",
                    value: e.target.value,
                  })
                }
                value={ticketType?.name || ""}
              />
              <Input
                type="number"
                placeholder="Price"
                onChange={(e) =>
                  onTicketPropertyChange({
                    index,
                    property: "price",
                    value: Number(e.target.value),
                  })
                }
                value={ticketType?.price || 0}
              />
              <Input
                type="number"
                placeholder="Limit"
                onChange={(e) =>
                  onTicketPropertyChange({
                    index,
                    property: "limit",
                    value: Number(e.target.value),
                  })
                }
                value={ticketType?.limit || 0}
              />
              <Button isIconOnly onClick={() => onTicketTypeDelete(index)}>
                <i className="ri-delete-bin-line"></i>
              </Button>
            </div>
          ))}
        </div>
      )}
      <Button className="mt-6" onClick={onAddTicket}>
        Add Ticket Type
      </Button>
      <div className="flex justify-center gap-5">
        <Button onClick={() => setActiveSteps(activeSteps - 1)}>Back</Button>
        <Button
          type="submit"
          color="primary"
          isDisabled={event?.ticketTypes?.length === 0}
          isLoading={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Tickets;
