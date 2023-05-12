import { NextApiResponse, NextApiRequest } from 'next'
import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3'

export const cachePromptURI = (handler: (arg0: NextApiRequest, arg1: NextApiResponse) => any) => async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await open({
    filename: '../data/database.db',
    driver: sqlite3.cached.Database
  });

  // create the cache table if it doesn't exist
  await db.run(`
    CREATE TABLE IF NOT EXISTS cache (
      prompt TEXT PRIMARY KEY,
      uri TEXT
    )
  `);

  req.db = db;

  return handler(req, res);
}
