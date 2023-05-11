"use client"
import Link from "next/link"
import { useState } from 'react'

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Imagine } from "@/components/midjourney"



export default function IndexPage() {
  const [tweet, setTweet] = useState('')
  const [style, setStyle] = useState('')
  const [numSeconds, setNumSeconds] = useState(10)
  // Imagine();
  // Imagine("A nice robot");


  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Tweet ➡️ Short-Form Demo
        </h1>
        <p className="text-muted-foreground max-w-[700px] text-lg sm:text-xl">
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
        <Input
          type="number"
          placeholder="num seconds"
          min="10"
          max="120"
          value={numSeconds}
          onChange={e => setNumSeconds(Number(e.target.value))}
        />

        <Button onClick={() => console.log({ tweet, style, length })}>
          Generate
        </Button>
      </div>
    </section>
  )
}
