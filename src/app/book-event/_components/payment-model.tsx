import { Button, Modal, ModalContent } from "@nextui-org/react";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface PaymentModalProps {
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
}

const PaymentModal = ({
  showPaymentModal,
  setShowPaymentModal,
}: PaymentModalProps) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_DOMAIN!}/bookings`,
      },
    });
    setLoading(false);
    if (result.error) {
      toast.error(result.error.message!);
      console.log(result.error.message);
    } else {
      setShowPaymentModal(false);
      toast.success("Payment successfull");
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
            <Button type="button">Cancel</Button>
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
