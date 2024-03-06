"use client";
import { BookingType, EventType } from "@/interfaces/events";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import PaymentModal from "./payment-model";
const stripePromise = loadStripe(
  "pk_test_51OhvW7Gr7paNn0fxbC8fWbjyifJHhT5vKdT8IR2oz8X8bAbz0oiJaqHMg8B9bUjNaEwBffNgspnjAR0QlISGQPel00EN3uyBLK"
);

interface Props {
  event: EventType;
  eventBookings: any;
}

const TicketSelection = ({ event, eventBookings }: Props) => {
  const [ticketsCount, setTicketsCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedTicketType, setSelectedTicketType] = useState(
    event.ticketTypes[0].name
  );
  const [clientSecret, setClientSecret] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ticketType = event.ticketTypes.find(
      (ticketType) => ticketType.name === selectedTicketType
    );
    if (ticketType) {
      setTotalAmount(ticketType.price * ticketsCount);
    }
  }, [ticketsCount, selectedTicketType]);

  const limits: any = {};

  // calculating remaining limit of tickets
  event.ticketTypes.forEach((ticketType) => {
    let bookedTickets = 0;
    eventBookings.forEach((booking: any) => {
      if (booking.ticketType === ticketType.name) {
        bookedTickets += booking.ticketsCount;
      }
    });

    limits[ticketType.name] = ticketType.limit - bookedTickets;
  });

  const getClientSecret = async () => {
    try {
      // check if the limit is reached
      if (limits[selectedTicketType] === 0) {
        setShowPaymentModal(false);
        toast.error("Tickets limit reached");
        return;
      }

      if (limits[selectedTicketType] < ticketsCount) {
        setShowPaymentModal(false);
        toast.error(`Only ${limits[selectedTicketType]} tickets left`);
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/stripe/client-secret", {
        amount: totalAmount,
      });
      setClientSecret(response.data.clientSecret);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showPaymentModal) {
      getClientSecret();
    }
  }, [showPaymentModal]);

  return (
    <div className="mt-7">
      <div>
        <h1 className="text-xl font-semibold mb-2 text-gray-700">
          Select Ticket Type
        </h1>
        <div className="grid grid-cols-4 gap-10">
          {event.ticketTypes.map((ticketType) => (
            <div
              key={ticketType.name}
              className={`bg-gray-100 border p-3 rounded-md cursor-pointer ${
                selectedTicketType === ticketType.name
                  ? "border-blue-800"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedTicketType(ticketType.name)}
            >
              <h1 className="font-semibold">{ticketType.name}</h1>
              <h1 className="text-gray-600 text-sm flex justify-between">
                $ {ticketType.price}{" "}
                <span>{limits[ticketType.name]} tickets left</span>
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-7">
        <h1 className="text-xl font-semibold text-gray-700 mb-2">
          Select Tickets Count
        </h1>
        <div className="flex flex-wrap gap-2">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className={`bg-gray-100 border flex justify-center cursor-pointer items-center h-12 w-14 ${
                ticketsCount === index + 1
                  ? "border-blue-800"
                  : "border-gray-200"
              }`}
              onClick={() => setTicketsCount(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-7 bg-gray-100 border border-gray-200 p-3 flex justify-between items-center">
        <h1 className="font-semibold text-2xl uppercase">
          Total Amount : &#8377; {totalAmount}
        </h1>
        <Button
          color="primary"
          isLoading={loading}
          onClick={() => setShowPaymentModal(true)}
        >
          Book Now
        </Button>
      </div>
      {clientSecret && showPaymentModal && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentModal
            setShowPaymentModal={setShowPaymentModal}
            showPaymentModal={showPaymentModal}
            totalAmount={totalAmount}
            ticketsCount={ticketsCount}
            ticketType={selectedTicketType}
            event={event}
          />
        </Elements>
      )}
    </div>
  );
};

export default TicketSelection;
