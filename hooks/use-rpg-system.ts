import { useState, useEffect, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { getSystem, getLocalizedText, getAllSystems } from '@/lib/systems';
import type { RPGSystemConfig, CharacterSheet } from '@/types/rpg-systems';

export function useRPGSystem(systemId?: string) {
  const locale = useLocale() as 'pt' | 'en' | 'es';
  const [currentSystem, setCurrentSystem] = useState<RPGSystemConfig | null>(null);

  useEffect(() => {
    if (systemId) {
      const system = getSystem(systemId);
      setCurrentSystem(system);
    }
  }, [systemId]);

  // Função para obter texto localizado
  const t = useMemo(() => {
    return (text: any) => getLocalizedText(text, locale);
  }, [locale]);

  // Função para obter todos os sistemas com nomes localizados
  const availableSystems = useMemo(() => {
    return getAllSystems().map(system => ({
      id: system.id,
      name: t(system.name),
      description: t(system.description)
    }));
  }, [t]);

  // Função para calcular modificadores de atributos (D&D style)
  const calculateModifier = (score: number): number => {
    return Math.floor((score - 10) / 2);
  };

  // Função para validar distribuição de pontos
  const validatePointDistribution = (
    values: Record<string, number>,
    totalPoints: number,
    maxPerAttribute?: number
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const usedPoints = Object.values(values).reduce((sum, val) => sum + (val || 0), 0);
    
    if (usedPoints !== totalPoints) {
      errors.push(`Distribua exatamente ${totalPoints} pontos`);
    }

    if (maxPerAttribute) {
      Object.entries(values).forEach(([attr, value]) => {
        if (value > maxPerAttribute) {
          errors.push(`${attr} não pode ter mais que ${maxPerAttribute} pontos`);
        }
      });
    }

    return { isValid: errors.length === 0, errors };
  };

  return {
    system: currentSystem,
    t,
    locale,
    availableSystems,
    calculateModifier,
    validatePointDistribution,
    setSystem: setCurrentSystem
  };
}
