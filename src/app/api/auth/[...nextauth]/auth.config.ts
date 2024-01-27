
import { NextAuthConfig } from 'next-auth';
////import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';

export const authConfig = {
	  ////providers: [Google]
	  providers: [GitHub]
} satisfies NextAuthConfig;
