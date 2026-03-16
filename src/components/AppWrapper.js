"use client"

import PaymentNotifications from "./PaymentNotifications"

export default function AppWrapper({children}){

return(

<>
<PaymentNotifications/>
{children}
</>

)

}