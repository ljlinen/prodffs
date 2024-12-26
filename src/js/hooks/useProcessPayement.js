import { useCallback, useEffect, useRef, useState } from 'react';
import { baseUrl } from '../..';
import useBuyingContext from './useContext/useBuyingContext';

export default function useProcessPayment(setPaymentData) {
   const { selectedBeat, selectedPackage } = useBuyingContext();
   const selectedPackageRef = useRef(selectedPackage);
   const selectedBeatRef = useRef(selectedPackage);
   const [message, setMessage] = useState("");


  useEffect(() => {
   selectedPackageRef.current = selectedPackage;
   selectedBeatRef.current = selectedBeat;
 }, [selectedBeat, selectedPackage]);

  const createOrder = useCallback(async() => {
   
    if (!selectedBeatRef.current?.id || !selectedPackageRef.current?.package || !selectedPackageRef.current?.price) {
      console.log("Missing required fields:", {
        beatId: selectedBeatRef.current?.id,
        packageName: selectedPackageRef.current?.package,
        price: selectedPackageRef.current?.price,
      });
      return null;
    }

    try {
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: {
            beatid: selectedBeatRef.current.id,
            packageName: selectedPackageRef.current.package,
            price: parseFloat(selectedPackageRef.current.price).toFixed(2),
          },
        }),
      });

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setMessage(`Could not initiate payment. ${error.message}`);
    }
  }, []);


  const handleApproved = async (data, actions) => {
    console.log(data, actions);
    
    try {
      const response = await fetch(`${baseUrl}/api/orders/${data?.orderID}/capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: {
            orderid: data.orderID,
            beatid: selectedBeatRef.current?.id,
            packageName: selectedPackageRef.current?.package,
          },
        }),
      });

      const orderData = await response.json();
      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart(); // Recoverable issue
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage(`Transaction ${transaction.status}: ${transaction.id}`);
        console.log("Capture result", JSON.stringify(orderData, null, 2));
        console.log(orderData?.downloadLink);
        setPaymentData(orderData)
      }
    } catch (error) {
      console.error(error);
      setMessage(`Transaction failed. ${error.message}`);
    }
  };

  return { createOrder, handleApproved, message };
}
