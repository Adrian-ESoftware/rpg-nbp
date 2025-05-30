import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { SessionData, ValidationErrors } from '../types'
import { getAllSystems } from '@/lib/systems'

export const useCreateSession = () => {
  const { toast } = useToast()
  const router = useRouter()
  const tValidation = useTranslations('validation')
  const t = useTranslations('createSession')
  
  // Obter primeiro sistema disponível como padrão
  const availableSystems = getAllSystems()
  const defaultSystemId = availableSystems.length > 0 ? availableSystems[0].id : 'gaia'
  
  const [sessionData, setSessionData] = useState<SessionData>({
    name: "",
    description: "",
    maxPlayers: 4,
    duration: "3",
    sessionType: "oneshot",
    difficulty: "medium",
    systemType: defaultSystemId, // Usar sistema válido do registro
    isPrivate: false,
    allowSpectators: true,
    tags: [],
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!sessionData.name.trim()) {
      newErrors.name = tValidation('sessionNameRequired')
    } else if (sessionData.name.trim().length < 3) {
      newErrors.name = tValidation('sessionNameMinLength')
    }

    if (!sessionData.description.trim()) {
      newErrors.description = tValidation('descriptionRequired')
    } else if (sessionData.description.trim().length < 10) {
      newErrors.description = tValidation('descriptionMinLength')
    }

    if (sessionData.maxPlayers < 1 || sessionData.maxPlayers > 8) {
      newErrors.maxPlayers = tValidation('playersRange')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof SessionData, value: any) => {
    setSessionData(prev => ({ ...prev, [field]: value }))
    
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleCreateSession = async () => {
    if (!validateForm()) {
      toast({
        title: tValidation('validationError'),
        description: tValidation('validationErrorDescription'),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Criando sessão:", sessionData)
      
      toast({
        title: t('successMessage'),
        description: t('successDescription', { name: sessionData.name }),
      })
      
      router.push('/')
      
    } catch (error) {
      toast({
        title: tValidation('createError'),
        description: tValidation('createErrorDescription'),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    sessionData,
    errors,
    isSubmitting,
    handleInputChange,
    handleCreateSession
  }
}
