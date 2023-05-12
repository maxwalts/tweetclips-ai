import { Midjourney } from "midjourney";
import { NextApiRequest, NextApiResponse } from 'next'
import { cachePromptURI } from '../middleware/database'

const channelID = process.env.CHANNEL_ID;
const serverID = process.env.SERVER_ID;
const SALAI_TOKEN = process.env.SALAI_TOKEN;

const client = new Midjourney(
  channelID!,
  serverID!,
  SALAI_TOKEN!
);

// Create a cache object to store the image URIs
const cache: { [prompt: string]: string | undefined } = {};

// Create a set to track the prompts being processed
const processingSet: Set<string> = new Set();

export async function imagine(prompt: string = "") {
  if (prompt === "") {
    console.log("No prompt provided.");
    return;
  }

  try {
    // Check if the result for the prompt exists in the cache
    if (cache[prompt]) {
      console.log('Returning cached image for prompt:', prompt);
      return cache[prompt];
    }

    // Check if the prompt is already being processed
    if (processingSet.has(prompt)) {
      console.log('Prompt is already being processed:', prompt);
      return;
    }

    // Add the prompt to the processing set
    processingSet.add(prompt);

    const msg = await client.Imagine(prompt, (uri: string) => {
      console.log('Loading', uri);
    });

    console.log({ msg });

    // Cache the result for future use
    cache[prompt] = msg?.uri;

    // Remove the prompt from the processing set
    processingSet.delete(prompt);

    return msg?.uri;
  } catch (error) {
    // Remove the prompt from the processing set in case of an error
    processingSet.delete(prompt);
    console.error('An error occurred:', error);
  }
}
