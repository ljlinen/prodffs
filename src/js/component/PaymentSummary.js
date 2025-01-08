import React from 'react'

export default function PaymentSummary({ condition, data, price }) {
   
  
  return (
    <div className={condition ? 'payment-summary info-text hide-anim-height-trans' : 'payment-summary info-text hide-height'} style={{marginTop: 0}}>
      <h4>{(price === '0') ? 'Thank You For Downloading!' : 'Thank You For Your Purchase!'}</h4>
      <div className="summary">
         <div>
            <h5>Payment:</h5>
            <p>{(price === '0') ? 'None' : data?.status}</p>
         </div>
         <div>
            <h5>Amount:</h5>
            <p>
                {
                    price === '0' ? 
                    'free' :
                    data?.purchase_units[0]?.payments?.captures[0]?.amount?.currency_code +': ' + data?.purchase_units[0]?.payments?.captures[0]?.amount.value
                }
            </p>
         </div>
         <div>
            <h5>From:</h5>
            <p>{price === '0' ? 'anonymous' : data?.payer?.name.given_name}</p>
         </div>
         <div>
            <h5>email:</h5>
            <p>{price === '0' ? 'none' : data?.payer?.email_address}</p>
         </div>
      </div>
    </div>
  )
}
