import {z} from 'zod';

export const formCadastroSchema = z.object({
   
    firstName: z.string().min(2, "O nome deve ter no mínimo 2 caracteres").max(50, "O nome deve ter no máximo 50 caracteres"),
    lastName: z.string().min(2, "O sobrenome deve ter no mínimo 2 caracteres").max(50, "o sobrenome deve ter no máximo 50 caracteres"),
    email: z.string().email("Email invalido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").max(100, "A senha deve ter no máximo 100 caracteres"),
    confirmPassword: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").max(100, "A senha deve ter no máximo 100 caracteres"),

})
.refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem", 
    path: ["confirmPassword"],
});


export type FormCadastroSchema = z.infer<typeof formCadastroSchema>;
