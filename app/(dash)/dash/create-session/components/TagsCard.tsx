import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Plus, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SessionData } from '../types'

interface TagsCardProps {
  sessionData: SessionData
  onInputChange: (field: keyof SessionData, value: any) => void
}

export const TagsCard: React.FC<TagsCardProps> = ({
  sessionData,
  onInputChange
}) => {
  const t = useTranslations('createSession')
  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    const trimmedTag = newTag.trim()
    if (trimmedTag && !sessionData.tags.includes(trimmedTag) && sessionData.tags.length < 10) {
      onInputChange("tags", [...sessionData.tags, trimmedTag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    onInputChange("tags", sessionData.tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle>{t('tagsAndCategories')}</CardTitle>
        <CardDescription>
          {t('tagsDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('tagPlaceholder')}
            disabled={sessionData.tags.length >= 10}
            className="flex-1"
          />
          <Button 
            onClick={addTag}
            disabled={!newTag.trim() || sessionData.tags.includes(newTag.trim()) || sessionData.tags.length >= 10}
            size="icon"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {sessionData.tags.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('addedTags')}:</span>
              <span className="text-xs text-muted-foreground">{sessionData.tags.length}/10</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sessionData.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center space-x-1 pr-1"
                >
                  <span>{tag}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
