import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import YandexProvider from 'next-auth/providers/yandex';
import CredentialsProvider from 'next-auth/providers/credentials';
const handler=NextAuth({providers:[GoogleProvider({clientId:process.env.GOOGLE_CLIENT_ID||'missing',clientSecret:process.env.GOOGLE_CLIENT_SECRET||'missing'}),LinkedInProvider({clientId:process.env.LINKEDIN_CLIENT_ID||'missing',clientSecret:process.env.LINKEDIN_CLIENT_SECRET||'missing'}),YandexProvider({clientId:process.env.YANDEX_CLIENT_ID||'missing',clientSecret:process.env.YANDEX_CLIENT_SECRET||'missing'}),CredentialsProvider({id:'hh',name:'hh.ru demo login',credentials:{email:{label:'Email',type:'email'}},async authorize(c){return {id:'hh-demo',name:'hh User',email:c?.email as string||'hh@example.com'}}})],secret:process.env.NEXTAUTH_SECRET,session:{strategy:'jwt'}});
export {handler as GET,handler as POST};
