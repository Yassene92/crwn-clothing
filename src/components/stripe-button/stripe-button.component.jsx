import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishablekey =
    "pk_test_51JmZ9YDsbeW3bSp7RaNpnHZIFnIQEL0BPofKaxseIhvbMVIitJdEljr02FOfhae7MbyiMvemBu8VjwgECaHB864P00DzC5U9wy";

  const onToken = (token) => {
    console.log(token);
    alert("Payement Successful");
  };

  return (
    <StripeCheckout
      label="PAY NOW"
      name="CRWN CLOTHING"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishablekey}
    />
  );
};
export default StripeCheckoutButton;
