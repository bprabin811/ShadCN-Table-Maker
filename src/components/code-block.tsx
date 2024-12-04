'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ code, language = "typescript", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg bg-card max-h-96 overflow-auto">
      {filename && (
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 bg-gray-600">
          <span className="text-sm text-white/80">{filename}</span>
        </div>
      )}
      <div>
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 rounded-md p-2 hover:bg-zinc-800"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-zinc-400" />
          )}
        </button>
        <SyntaxHighlighter
          language={language}
          style={dracula}
          customStyle={{
            margin: 0,
            borderRadius: filename ? "0 0 0.5rem 0.5rem" : "0.5rem",
            padding: "1.5rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

