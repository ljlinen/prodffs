import React from 'react'

export default function PaymentSummary({ condition, data }) {

   // eslint-disable-next-line no-unused-vars
   const dataFake = {
      "id": "04H82513P8083961L",
      "status": "COMPLETED",
      "payment_source": {
          "paypal": {
              "email_address": "sb-3skoh33585392@personal.example.com",
              "account_id": "MKJPJ4NEBF3HS",
              "account_status": "VERIFIED",
              "name": {
                  "given_name": "John",
                  "surname": "Doe"
              },
              "address": {
                  "country_code": "ZA"
              }
          }
      },
      "purchase_units": [
          {
              "reference_id": "default",
              "shipping": {
                  "name": {
                      "full_name": "John Doe"
                  },
                  "address": {
                      "address_line_1": "Free Trade Zone",
                      "admin_area_2": "Johannesburg",
                      "admin_area_1": "CA",
                      "postal_code": "2038",
                      "country_code": "ZA"
                  }
              },
              "payments": {
                  "captures": [
                      {
                          "id": "3H959137TH050691F",
                          "status": "COMPLETED",
                          "amount": {
                              "currency_code": "USD",
                              "value": "100.00"
                          },
                          "final_capture": true,
                          "disbursement_mode": "INSTANT",
                          "seller_protection": {
                              "status": "ELIGIBLE",
                              "dispute_categories": [
                                  "ITEM_NOT_RECEIVED",
                                  "UNAUTHORIZED_TRANSACTION"
                              ]
                          },
                          "seller_receivable_breakdown": {
                              "gross_amount": {
                                  "currency_code": "USD",
                                  "value": "100.00"
                              },
                              "paypal_fee": {
                                  "currency_code": "USD",
                                  "value": "5.48"
                              },
                              "net_amount": {
                                  "currency_code": "USD",
                                  "value": "94.52"
                              }
                          },
                          "links": [
                              {
                                  "href": "https://api.sandbox.paypal.com/v2/payments/captures/3H959137TH050691F",
                                  "rel": "self",
                                  "method": "GET"
                              },
                              {
                                  "href": "https://api.sandbox.paypal.com/v2/payments/captures/3H959137TH050691F/refund",
                                  "rel": "refund",
                                  "method": "POST"
                              },
                              {
                                  "href": "https://api.sandbox.paypal.com/v2/checkout/orders/04H82513P8083961L",
                                  "rel": "up",
                                  "method": "GET"
                              }
                          ],
                          "create_time": "2024-12-26T04:49:03Z",
                          "update_time": "2024-12-26T04:49:03Z"
                      }
                  ]
              }
          }
      ],
      "payer": {
          "name": {
              "given_name": "John",
              "surname": "Doe"
          },
          "email_address": "sb-3skoh33585392@personal.example.com",
          "payer_id": "MKJPJ4NEBF3HS",
          "address": {
              "country_code": "ZA"
          }
      },
      "links": [
          {
              "href": "https://api.sandbox.paypal.com/v2/checkout/orders/04H82513P8083961L",
              "rel": "self",
              "method": "GET"
          }
      ],
      "downloadLink": "http://localhost:8787/purchased/download?beat=b-1732922545150&package=free&expires=1735189443&token=3715a0f48dde25c549cad9c5a8f280c1782bc81aba07b4b72e0b73323ec34ff4"
  }
   
  
  return (
    <div className={condition ? 'payment-summary info-text hide-anim-height-trans' : 'payment-summary info-text hide-height'}>
      <h4>Payment Summary</h4>
      <div className="summary">
         <div>
            <h5>Title:</h5>
            <p>Price</p>
         </div>
         <div>
            <h5>Title:</h5>
            <p>Price</p>
         </div>
         <div>
            <h5>Title:</h5>
            <p>Price</p>
         </div>
         <div>
            <h5>Title:</h5>
            <p>Price</p>
         </div>
      </div>
    </div>
  )
}
