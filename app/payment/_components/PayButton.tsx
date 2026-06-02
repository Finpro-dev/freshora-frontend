"use client";

import { useEffect } from "react";

function PayButton() {
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handlePayment = () => {
    window.snap.pay("8bb13c2b-3a79-4d00-8859-4664809cb103", {
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
