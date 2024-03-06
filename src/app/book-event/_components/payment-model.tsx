import { EventType } from "@/interfaces/events";
import { Button, Modal, ModalContent } from "@nextui-org/react";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface PaymentModalProps {
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  event: EventType;
  ticketType: string;
  ticketsCount: number;
  totalAmount: number;
}

const PaymentModal = ({
  showPaymentModal,
  setShowPaymentModal,
  ticketsCount,
  ticketType,
  totalAmount,
  event,
}: PaymentModalProps) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_DOMAIN!}`,
        },
        redirect: "if_required",
      });

      if (result.error) {
        toast.error(result.error.message!);
        console.log(result.error.message);
      } else {
        const reqBody = {
          event: event._id,
          ticketsCount,
          ticketType,
          totalAmount,
          paymentId: result.paymentIntent?.id,
        };
        await axios.post("/api/bookings", reqBody);
        toast.success("Event booked successfully");
        router.push("/bookings");
      }
    } catch (error: any) {
      toast.error(
        "Something went wrong, if you have been charged, please contact us"
      );
    } finally {
      setShowPaymentModal(false);
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={showPaymentModal}
      onClose={() => setShowPaymentModal(false)}
      size="2xl"
    >
      <ModalContent>
        <form className="p-5 mt-3" onSubmit={handleSubmit}>
          <PaymentElement />
          {/* <AddressElement
            options={{
              allowedCountries: ["US"],
              mode: "shipping",
            }}
          /> */}
          <div className="flex justify-end gap-5 mt-5">
            <Button type="button" onClick={() => setShowPaymentModal(false)}>
              Cancel
            </Button>
            <Button color="primary" type="submit" isLoading={loading}>
              Pay
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
