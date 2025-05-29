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
      <Card className="relative overflow-hidden shadow-lg w-full">
        <CardContent className={imageUrl ? "p-0" : "p-6"}>
          <div
            className={`relative w-full aspect-square flex items-center justify-center transition-all duration-200 ${
              isDragging ? 'bg-primary/10 border-primary' : 'bg-muted/30'
            } ${!imageUrl ? 'border-2 border-dashed border-muted-foreground/30 cursor-pointer hover:border-primary/50' : ''}`}
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
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClick()
                      }}
                      className="bg-white/90 hover:bg-white text-black"
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
                      className="bg-destructive/90 hover:bg-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground mb-2">
                  {t('uploadCharacterImage')}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {t('dragDropOrClick')}
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
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground">{characterName}</h3>
          <Badge variant="outline" className="mt-1">
            {t('characterPortrait')}
          </Badge>
        </div>
      )}
    </div>
  )
}
