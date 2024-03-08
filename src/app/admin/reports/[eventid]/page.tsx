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

  let ticketTypesAndTheirRevenue: any = {};

  eventBookings.forEach((booking) => {
    ticketTypesAndTheirRevenue[booking.ticketType] = {
      ticketSold: ticketTypesAndTheirRevenue[booking.ticketType]
        ? ticketTypesAndTheirRevenue[booking.ticketType].ticketSold +
          booking.ticketsCount
        : booking.ticketsCount,
      revenue: ticketTypesAndTheirRevenue[booking.ticketType]
        ? ticketTypesAndTheirRevenue[booking.ticketType].revenue +
          booking.totalAmount
        : booking.totalAmount,
    };
  });

  const totalRevenue = Object.keys(ticketTypesAndTheirRevenue).reduce(
    (total, ticketType) => {
      return total + ticketTypesAndTheirRevenue[ticketType].revenue;
    },
    0
  );

  return (
    <div>
      <div className="bg-gray-700 md:p-5 p-3 text-white flex flex-col gap-3">
        <h1 className="md:text-3xl font-semibold">{event.name} - Reports</h1>
        <div className="text-sm text-gray-200 flex md:flex-row flex-col md:gap-10 gap-3">
          <h1>
            <i className="ri-map-pin-line pr-2"></i> {event.location}
          </h1>
          <h1>
            <i className="ri-calendar-line pr-2"></i> {event.date} at{" "}
            {event.time}
          </h1>
        </div>
      </div>
      <h1 className="md:text-2xl text-xl  font-semibold mt-5">
        Ticket Types and Their Revenues
      </h1>
      <div className="grid md:grid-cols-4 mt-5 gap-5">
        {Object.keys(ticketTypesAndTheirRevenue).map((ticketType) => (
          <div className="p-3 bg-white rounded-sm shadow border">
            <h1 className="font-semibold text-lg">{ticketType}</h1>
            <div className="flex flex-col gap-1 mt-2 font-semibold">
              <span className="text-sm flex text-gray-600 justify-between items-center">
                Tickets Sold
                <b>{ticketTypesAndTheirRevenue[ticketType].ticketSold}</b>
              </span>
              <span className="text-sm flex text-gray-600 justify-between items-center">
                Revenue
                <b>&#8377;{ticketTypesAndTheirRevenue[ticketType].revenue}</b>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 bg-white rounded-md flex justify-between items-center p-5">
        <h1 className="md:text-3xl   text-xl font-semibold">Total Revenue</h1>
        <h1 className="text-2xl font-semibold">&#8377;{totalRevenue}</h1>
      </div>
    </div>
  );
};

export default EventReportPage;
