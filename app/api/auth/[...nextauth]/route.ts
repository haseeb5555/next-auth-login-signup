import { fetchUser } from '@/lib/actions/UserAction'

import NextAuth,{NextAuthOptions} from 'next-auth'
import  CredentialsProvider  from 'next-auth/providers/credentials'


const AuthOptions:NextAuthOptions= {
    pages:{
        signIn:"/sign-in"
   },
    providers:[
      
        CredentialsProvider({
            
             name:'NextJs',
             credentials:{
            
                email:{label:"Email",type:"email",placeholder:"enter email"},
                password:{label:"Password",type:"password",placeholder:"enter password"},
             },
             async authorize(credentials){
               if(!credentials || !credentials.email || !credentials.password) return null
               const user = await fetchUser({email:credentials.email})
                if(user.email===credentials.email && user.password === credentials.password)
                return user;
                console.log(user)
            
             }
             
        })
    ]
}


const handler = NextAuth(AuthOptions)

export {handler as GET,handler as POST}