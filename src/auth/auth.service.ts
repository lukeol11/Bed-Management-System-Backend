// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const reqAuthentication =
    process.env.REQUIRE_AUTHENTICATION === 'true' || false;

if (reqAuthentication && !firebase.apps.length) {
    firebase.initializeApp({
        credential: firebase.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        })
    });
}

@Injectable()
export class AuthService {
    async verifyFirebaseToken(idToken: string): Promise<any> {
        if (!reqAuthentication) return null;

        try {
            console.log('Verifying Firebase ID token...', idToken);
            const decodedToken = await firebase.auth().verifyIdToken(idToken);

            return decodedToken;
        } catch (err) {
            console.error('Error while verifying Firebase ID token:', err);
            throw new UnauthorizedException('Invalid Firebase token');
        }
    }
}
