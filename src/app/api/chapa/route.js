import { NextResponse } from "next/server"

export async function POST(req){

const body = await req.json()

const response = await fetch(
"https://api.chapa.co/v1/transaction/initialize",
{
method:"POST",
headers:{
Authorization:"Bearer YOUR_CHAPA_SECRET",
"Content-Type":"application/json"
},
body:JSON.stringify({
amount:body.amount,
currency:"ETB",
email:body.email,
first_name:body.name,
tx_ref:Date.now().toString(),
callback_url:"http://localhost:3000/payments",
return_url:"http://localhost:3000/payments"
})
}
)

const data = await response.json()

return NextResponse.json(data)

}