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

const BookingAdminPage = async () => {
  const mongoUserId = await getMongoDBUserIdOfLoggedInUser();
  const bookedEvents: BookingType[] = (await BookingModel.find({})
    .populate("event")
    .populate("user")) as any;
  return (
    <div>
      <PageTitle title="All Bookings" />
      <div className="flex flex-col gap-5 mt-5">
        {bookedEvents.map((booking) => (
          <div
            key={booking._id}
            className="border border-gray-300 bg-gray-100 flex flex-col gap-5"
          >
            <div className="bg-gray-700 p-3 text-white">
              <h1 className="text-2xl font-semibold">{booking.event.name}</h1>
              <div className="text-sm text-gray-200 flex gap-10 mt-3">
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
            <div className="grid grid-cols-3 gap-5 p-3">
              {getProperty({
                key: "Booking Id",
                value: booking._id,
              })}
              {getProperty({
                key: "User Id",
                value: booking.user._id,
              })}
              {getProperty({
                key: "User Name",
                value: booking.user.userName,
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingAdminPage;
