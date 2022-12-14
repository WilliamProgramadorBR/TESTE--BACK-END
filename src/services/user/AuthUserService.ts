import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import {sign} from 'jsonwebtoken';

interface AuthRequest{
    email:string;
    password:string;
}

class AuthUserService{
    async execute({email, password}:AuthRequest){
        // verificar o bendito do email se é existente ou não.
        const user = await prismaClient.user.findFirst({
          where:{
            email:email
        }
    });

    if(!user){
        throw new Error("Senha incorreta ou email, tente outra vez abençoado")
    }

    // Vamos verificar se o abençoado lembra da senha :( //

    const passwordMatch = await compare(password, user.password)
    if(!passwordMatch){
        throw new Error("Senha incorreta ou email, tente outra vez abençoado")
    }

      //gerando o token do abençoado// 

      const token = sign(
        {
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '30d'
        }
      )

     return{
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
     }

        
    }
}

export { AuthUserService };