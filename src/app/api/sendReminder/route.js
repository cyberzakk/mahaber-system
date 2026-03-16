import twilio from "twilio"

const client = twilio(
process.env.TWILIO_ACCOUNT_SID,
process.env.TWILIO_AUTH_TOKEN
)

export async function POST(request){

const body = await request.json()

const phone = body.phone
const message = body.message

try{

await client.messages.create({
body: message,
from: process.env.TWILIO_PHONE,
to: phone
})

return Response.json({success:true})

}catch(error){

return Response.json({error:error.message})

}

}