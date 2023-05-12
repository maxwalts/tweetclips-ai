import { Database } from 'sqlite';
import { NextApiRequest } from 'next';

declare module 'next' {
  export interface NextApiRequest {
    db: Database;
  }
}
