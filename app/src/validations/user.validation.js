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

})

const loginSchema = z.object({
    username: z
    .string()
    .max(10)
    .min(4),

    password: z
    .string()
    .max(10, {message: "password must be or under 10 characters"})
    .min(3,{message: "password must be or longer than 3 letters"})
    .regex(/[A-Z]/, {message: "password must contain at least one uppercase letter"})
})

module.exports = {
    protection,
    loginSchema
}