import { getMongoDBUserIdOfLoggedInUser } from "@/actions/users";
import { connectDB } from "@/config/dbConfig";
import { BookingType } from "@/interfaces/events";
import BookingModel from "@/models/booking-model";
import React from "react";
import dayjs from "dayjs";
import PageTitle from "@/components/PageTitle";
connectDB();

const getProperty = ({ key, value }: { key: string; value: any }) => {
  return (
    <div>
      <h1 className="font-semibold">{key}</h1>
      <h1 className="text-gray-700 text-sm">{value}</h1>
    </div>
  );
};

const BookingsPage = async () => {
  const mongoUserId = await getMongoDBUserIdOfLoggedInUser();
  const bookedEvents: BookingType[] = (await BookingModel.find({
    user: mongoUserId,
  }).populate("event")) as any;
  return (
    <div>
      <PageTitle title="My Bookings" />
      <div className="flex flex-col gap-5 mt-5">
        {bookedEvents.map((booking) => (
          <div
            key={booking._id}
            className="border border-gray-300 bg-gray-100 flex flex-col gap-5"
          >
            <div className="bg-gray-700 p-3 text-white">
              <h1 className="md:text-2xl font-semibold">
                {booking.event.name}
              </h1>
              <div className="text-sm text-gray-200 flex flex-col md:flex-row md:gap-10 gap-3 mt-3">
                <h1>
                  <i className="ri-map-pin-line pr-2"></i>{" "}
                  {booking.event.location}
                </h1>
                <h1>
                  <i className="ri-calendar-line pr-2"></i> {booking.event.date}{" "}
                  at {booking.event.time}
                </h1>
              </div>
            </div>
            <div className="grid md:grid-cols-3 md:gap-5 gap-3 p-3">
              {getProperty({
                key: "Booking Id",
                value: booking._id,
              })}
              {getProperty({
                key: "Ticket Type",
                value: booking.ticketType,
              })}
              {getProperty({
                key: "Tickets Count",
                value: booking.ticketsCount,
              })}
              {getProperty({
                key: "Total Price",
                value: booking.totalAmount,
              })}
              {getProperty({
                key: "Payment Id",
                value: booking.paymentId,
              })}
              {getProperty({
                key: "Booked on",
                value: dayjs(booking.createdAt).format("DD/MM/YYYY hh/mm A"),
              })}
              {getProperty({
                key: "Status",
                value: booking.status,
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
