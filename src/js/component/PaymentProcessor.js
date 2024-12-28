import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import useProcessPayement from "../hooks/useProcessPayement";
import useBuyingContext from "../hooks/useContext/useBuyingContext";
import { useEffect, useRef } from "react";
import InfoText from "./InfoText";


// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function PaymentProcessor({condition, setPaymentData, checkoutBtnRef, setIsLoading}) {

  const { createOrder, handleApproved, message, free } = useProcessPayement(setPaymentData, setIsLoading)
  const PAYPAL_CLIENT_ID="AcDv4ATahQE0hH8M4a4VxmCWnVNXHzLVsS9HZoc-VSxvC15k6ceH5TquvSDjOH2NWtp_Z3dQIPUqZaid"

  const initialOptions = {
    "client-id": PAYPAL_CLIENT_ID,
    "enable-funding": "venmo",
    // "buyer-country": "US",
    currency: "USD",
    components: "buttons",
  };

  const { selectedPackage } = useBuyingContext();
  const selectedPackageRef = useRef(selectedPackage);

  useEffect(() => {
    selectedPackageRef.current = selectedPackage;
  }, [selectedPackage]);
  

  return (
    <div className={condition && !free ? "paypal-button-container" : "hide"} ref={checkoutBtnRef}>
      <InfoText
        condition={condition}
        h4={'Proceed To Payment.'}
        p={'pick a payment option on the pop-up screen.'}
        style={{marginTop: 0, marginBottom: 25, color: "rgba(var(--clr-60))"}}
      />

      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder={createOrder}
          onApprove={handleApproved}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default PaymentProcessor;
