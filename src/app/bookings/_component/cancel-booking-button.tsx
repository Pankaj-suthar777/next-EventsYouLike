"use client";
import { BookingType } from "@/interfaces/events";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CancelBookingButton = ({ booking }: { booking: BookingType }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cancelBooking = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/bookings/${booking._id}`, {
        status: "cancelled",
      });
      toast.success("Booking cancelled successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-3">
      <Button color="warning" isLoading={loading} onClick={cancelBooking}>
        Cancel Booking
      </Button>
    </div>
  );
};

export default CancelBookingButton;
