"use client"
import Link from "next/link"
import { useEffect, useState } from 'react'

import { buttonVariants } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { imagine } from "@/lib/midjourney"

export default function IndexPage() {
  const [tweet, setTweet] = useState('')
  const [style, setStyle] = useState('')
  const [length, setLength] = useState('')

  const [script, setScript] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const response = await fetch('/api/generateScript', {
      method: 'POST',
      body: JSON.stringify({ tweet, style, length }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const generatedScript = await response.json();
    setLoading(false);
    setScript(generatedScript);
    console.log({ tweet, style, length, script: script });
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Tweet ➡️ Short-Form AI <span className="bg-gradient-to-br text-transparent from-sky-300 to-sky-600 bg-clip-text ">beta</span>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Some directions
        </p>
      </div>

      <div className="grid w-full gap-2">
        <Textarea
          placeholder="Tweet"
          value={tweet}
          onChange={e => setTweet(e.target.value)}
        />
        <Textarea
          placeholder="Style"
          value={style}
          onChange={e => setStyle(e.target.value)}
        />
        <Select value={length} onValueChange={setLength}>
          <SelectTrigger className="w-[180px]">
            <SelectValue aria-label={length} >
              {length ? length : "Select a length"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Length</SelectLabel>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="normal" >Normal</SelectItem>
              <SelectItem value="long" >Long</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={handleGenerate}>
          Generate
        </Button>

        {loading && <ProgressBar />}
        <p className="whitespace-pre-wrap">{script}</p>
      </div>
    </section >
  )
}

export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentTime = 0;
    const endTime = 15000; // 30 seconds
    const stepDuration = 100; // 100 milliseconds

    const interval = setInterval(() => {
      currentTime += stepDuration * Math.random();
      // Calculate the progress as a percentage
      const calculatedProgress = (currentTime / endTime) * 100;

      setProgress(Math.min(calculatedProgress, 90));

      if (currentTime >= endTime) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Progress value={progress} className="w-full" />;
}
