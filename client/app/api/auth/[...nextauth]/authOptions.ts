import type {NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import jwt from 'jsonwebtoken'
const clientID=process.env.CLIENT_ID
const clientSecret=process.env.CLIENT_SECRET
const nextAuthSecret=process.env.NEXT_AUTH_SECRET
if(!clientID|| !clientSecret || !nextAuthSecret){
    throw Error("invalid cred")
}
declare module 'next-auth'{
    interface Session{
        accessToken?:string
        userId?:string
    }
}
const authOptions:NextAuthOptions={
    providers:[
        GitHubProvider({
            clientId:clientID,
            clientSecret:clientSecret,
        }),
        GoogleProvider({
            clientId:clientID,
            clientSecret:clientSecret,
        })
    ],
    secret:nextAuthSecret,
    callbacks:{
        async jwt({token,account,user}){
          
            if(account){
                token.accessToken=account.id_token
                token.id=user.id
                console.log("jwt token",token)
            }
           
            return token
        },
        async session({session,token}){
            session.accessToken=token.accessToken as string
            session.userId=token.sub
            return session
        },
     
    }
}
export {authOptions}