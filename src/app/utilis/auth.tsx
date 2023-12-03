// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { NextAuthOptions, getServerSession } from "next-auth"
// import GoogleProvider from "next-auth/providers/google";
// import prisma from "src/lib/db";


// export const authOptions:NextAuthOptions = {
//   // Configure one or more authentication providers

//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID!,
//       clientSecret: process.env.GOOGLE_SECRET!,
//     }),
//     // ...add more providers here
//   ],
// }

//export const getAuthSession = () => getServerSession(authOptions)

//import NextAuth from "next-auth/next";

// declare module "next-auth" {
//   interface Session {
//     user: User & {
//       isAdmin: Boolean;
//     };
//   }
// }
// declare module "next-auth/jwt" {
//   interface JWT {
//     isAdmin: Boolean;
//   }
// }


import NextAuth from "next-auth/next";
import type { NextAuthOptions,User } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import prisma from "src/lib/db";
import bcrypt from "bcrypt"


// declare module 'next-auth'{
//     interface User {
//         id: number
//     }
// }

// declare module 'next-auth'{
//     interface Session{
//         user:{
//             id:string
//         } & DefaultSession['user']
//     }
// }



declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean;
  }
}



export const options:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{
                    label:'email',
                    type:'text',
                    placeholder:'your email'
                },
                password:{
                    label:'password',
                    type:'password',
                    placeholder:'your password'
                }
            },
            async authorize(credentials){
                
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credentials')
              }
                const user = await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                })

                if(!user || !user?.password){
                    throw new Error('Invalid credentials')
                } 

                const isCorrectedPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if(!isCorrectedPassword){
                    throw new Error('Invalid credentials')
                }

                return user;
            }
        })
    ],


    pages:{
        signIn:'/signin',
        error:'/signin'
    },


callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });
      token.isAdmin = userInDb?.isAdmin!;
      return token;
    },
    },
  
    session:{
        strategy:'jwt'
    },
   secret: process.env.NEXTAUTH_SECRET,
};




//     callbacks:{
//         session: async ({session, token, user}) => {
//             if(session?.user){
//                 session.user.id = token.uid;
//             }
//             return session
//         },
//         jwt: async ({user, token}) => {
//             if(user){
//                 token.uid = user.id
//             }
//             return token
//         }
//     },
//     session:{
//         strategy:'jwt'
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     debug:process.env.NODE_ENV === 'development' 
// }



// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { NextAuthOptions, User, getServerSession } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { prisma } from "./connect";

// declare module "next-auth" {
//   interface Session {
//     user: User & {
//       isAdmin: Boolean;
//     };
//   }
// }
// declare module "next-auth/jwt" {
//   interface JWT {
//     isAdmin: Boolean;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     GoogleProvider({
//       // clientId: process.env.GOOGLE_ID as string,
//       // clientSecret: process.env.GOOGLE_SECRET as string,
//       clientId: process.env.GOOGLE_ID!,
//       clientSecret: process.env.GOOGLE_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async session({ token, session }) {
//       if (token) {
//         session.user.isAdmin = token.isAdmin;
//       }
//       return session;
//     },
//     async jwt({ token }) {
//       const userInDb = await prisma.user.findUnique({
//         where: {
//           email: token.email!,
//         },
//       });
//       token.isAdmin = userInDb?.isAdmin!;
//       return token;
//     },
//   },
// };

//export const getAuthSession = () => getServerSession(authOptions);
