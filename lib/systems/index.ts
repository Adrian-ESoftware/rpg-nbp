import type { RPGSystemConfig } from '@/types/rpg-systems';
import { gaiaSystem } from './gaia';
import { dnd5eSystem } from './dnd5e';
import { pathfinderSystem } from './pathfinder';

// Registro central de todos os sistemas
export const registeredSystems: Record<string, RPGSystemConfig> = {
  [gaiaSystem.id]: gaiaSystem,
  [dnd5eSystem.id]: dnd5eSystem,
};

// Função para obter um sistema específico
export function getSystem(systemId: string): RPGSystemConfig | null {
  return registeredSystems[systemId] || null;
}

// Função para obter todos os sistemas disponíveis
export function getAllSystems(): RPGSystemConfig[] {
  return Object.values(registeredSystems);
}

// Função para obter texto localizado
export function getLocalizedText(text: any, locale: 'pt' | 'en' | 'es'): string {
  if (typeof text === 'string') return text;
  if (typeof text === 'object' && text !== null) {
    return text[locale] || text.pt || Object.values(text)[0] || '';
  }
  return '';
}

// Função para validar se um sistema existe
export function isValidSystem(systemId: string): boolean {
  return systemId in registeredSystems;
}

// Função para adicionar novos sistemas dinamicamente (para futuras expansões)
export function registerSystem(system: RPGSystemConfig): void {
  registeredSystems[system.id] = system;
}
