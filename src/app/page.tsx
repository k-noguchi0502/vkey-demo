"use client"

import type React from "react"
import { useState, type ChangeEvent, useEffect, useCallback } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { VKeyboard } from "japanese-vkeyboard"
import "japanese-vkeyboard/dist/virtual-keyboard.css"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const ExampleUsage: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [inputValue, setInputValue] = useState<string>("")
  const [keyboardType, setKeyboardType] = useState<"hirakey" | "tenkey">("hirakey")
  const [keyboardKey, setKeyboardKey] = useState(0)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyboardInput = (newValue: string) => {
    setInputValue(newValue)
  }

  const toggleKeyboardType = () => {
    setKeyboardType((prev) => (prev === "hirakey" ? "tenkey" : "hirakey"))
  }

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  const preventEvent = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  useEffect(() => {
    setKeyboardKey((prevKey) => prevKey + 1)
  }, [])

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="h-[100svh]">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4">
                <span className="text-lg font-semibold">質問：テスト</span>
                <div className="flex gap-2">
                  <button onClick={toggleKeyboardType} className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                    {keyboardType === "hirakey" ? "テンキー" : "ひらがな"}
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm flex items-center justify-center"
                  >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex-grow relative p-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onTouchStart={preventEvent}
                  onTouchEnd={preventEvent}
                  onTouchMove={preventEvent}
                  onTouchCancel={preventEvent}
                  onContextMenu={preventEvent}
                  onPointerDown={preventEvent}
                  onPointerUp={preventEvent}
                  onPointerMove={preventEvent}
                  onPointerCancel={preventEvent}
                  className="w-full h-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none touch-none resize-none text-5xl dark:text-white text-center"
                  placeholder="ここに入力されます"
                  style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}
                />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <VKeyboard
              key={keyboardKey}
              value={inputValue}
              onChange={handleKeyboardInput}
              keyboardType={keyboardType}
              enableConversion={keyboardType === "hirakey"}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default ExampleUsage

