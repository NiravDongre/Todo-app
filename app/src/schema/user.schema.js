const { z } = require('zod');

const protection = z.object({
    username: z
    .string()
    .max(10)
    .min(4),

    email: z
    .email()
    .max(100,{message:"Email must be no longer than 100 characters."}),

    password: z
    .string()
    .max(10, {message: "password must be or under 10 characters"})
    .min(3,{message: "password must be or longer than 3 letters"})
    .uppercase(1),

    name: z
    .string()
    .max(30, {message: "Name should be under 30 characters"}),

    bio: z
    .string()
    .max(300, {message: "bio should be under this"})
})

module.exports = {
    protection
}