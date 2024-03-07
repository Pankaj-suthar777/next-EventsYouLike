import { connectDB } from "@/config/dbConfig";
import { EventType } from "@/interfaces/events";
import BookingModel from "@/models/booking-model";
import EventModel from "@/models/event-model";
import React from "react";
connectDB();

interface Props {
  params: {
    eventid: string;
  };
}

const EventReportPage = async ({ params }: Props) => {
  const event: EventType = (await EventModel.findById(params.eventid)) as any;
  const eventBookings = await BookingModel.find({
    event: params.eventid,
    status: "booked",
  });
  return (
    <div>
      <div className="bg-gray-700 p-5 text-white flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">{event.name} - Reports</h1>
        <div className="text-sm text-gray-200 flex gap-10">
          <h1>
            <i className="ri-map-pin-line pr-2"></i> {event.location}
          </h1>
          <h1>
            <i className="ri-calendar-line pr-2"></i> {event.date} at{" "}
            {event.time}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EventReportPage;
