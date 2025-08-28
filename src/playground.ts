import { db } from "./server/db";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
await db.user.create({
    data: {
        emailAddress: "test@gmail.com",
        firstName: "Vaibhav",
        lastName: "Mahajan"
    }
})

console.log("done");
