"use client";

import { useEffect } from "react";

function PayButton() {
  useEffect(() => {
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    // Optional: set script attribute, for example snap.js have data-client-key attribute
    // (change the value according to your client-key)
    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handlePayment = () => {
    window.snap.pay("b2d8a2e9-baa1-462d-8438-a64d39280d44", {
      onSuccess: function (result: any) {
        alert("payment success!");
        console.log(result);
      },
      onPending: function (result: any) {
        alert("wating your payment!");
        console.log(result);
      },
      onError: function (result: any) {
        alert("payment failed!");
        console.log(result);
      },
      onClose: function () {
        alert("you closed the popup without finishing the payment");
      },
    });
  };
  return (
    <div>
      <button onClick={handlePayment}>PAY TEST</button>
    </div>
  );
}

export default PayButton;
