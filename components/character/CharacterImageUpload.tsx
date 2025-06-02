"use client"

import React, { useState, useRef } from "react"
import { useTranslations } from 'next-intl'
import { Camera, Upload, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface CharacterImageUploadProps {
  imageUrl?: string
  onImageChange: (imageUrl: string | null) => void
  characterName?: string
}

export function CharacterImageUpload({ 
  imageUrl, 
  onImageChange, 
  characterName 
}: CharacterImageUploadProps) {
  const t = useTranslations('createCharacter')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const removeImage = () => {
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <Card className="relative overflow-hidden shadow-2xl w-full bg-card/50 border-border/70">
        <CardContent className={imageUrl ? "p-0" : "p-6"}>
          <div
            className={`relative w-full aspect-square flex items-center justify-center transition-all duration-300 ${
              isDragging ? 'bg-primary/30 border-primary/70 shadow-xl' : 'bg-muted/15'
            } ${!imageUrl ? 'border-2 border-dashed border-muted-foreground/40 cursor-pointer hover:border-primary/70 hover:bg-primary/20 hover:shadow-lg' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={!imageUrl ? handleClick : undefined}
          >
            {imageUrl ? (
              <>
                <Image
                  src={imageUrl}
                  alt={characterName || "Character"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClick()
                      }}
                      className="bg-white/80 hover:bg-white/90 text-black shadow-xl border border-white/30"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      {t('changeImage')}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeImage()
                      }}
                      className="bg-destructive/80 hover:bg-destructive/90 shadow-xl border border-destructive/30"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mb-4 border border-primary/50 shadow-lg">
                  <User className="w-8 h-8 text-primary drop-shadow-md" />
                </div>
                <p className="text-sm font-medium text-foreground mb-2">
                  {t('characterImage')}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {t('clickOrDrag')}
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    PNG, JPG até 5MB
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {characterName && (
        <div className="text-center p-3 bg-card/50 rounded-lg border border-border/60 shadow-xl">
          <h3 className="text-xl font-bold text-foreground">{characterName}</h3>
          <Badge variant="outline" className="mt-1 bg-card/40 border-border/50 shadow-md">
            {t('portrait')}
          </Badge>
        </div>
      )}
    </div>
  )
}
