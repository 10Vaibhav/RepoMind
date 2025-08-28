// api/clerk/webhook

import { db } from "@/server/db";

export const POST = async (req: Request) => {
    const {data} = await req.json();
    console.log("Clerk webhook data", data);
    const emailAddress = data.email_addresses && data.email_addresses.length > 0 
    ? data.email_addresses[0].email_address 
    : "exa@gmail.com";
    const firstName = data.first_name;
    const lastName = data.last_name;
    const imageUrl = data.image_url;
    const id = data.id;

    await db.user.create({
        data: {
            id: id,
            emailAddress: emailAddress,
            firstName: firstName,
            lastName: lastName,
            imageUrl: imageUrl
        }
    })

    console.log("user Created!");
    return new Response("Webhook Received", {status: 200});
}
