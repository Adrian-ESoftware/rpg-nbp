export interface LocalizedText {
  pt: string;
  en: string;
  es: string;
}

export interface BaseAttribute {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  min?: number;
  max?: number;
}

export interface BaseSkill {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  prerequisites?: string[];
  category?: string;
}

export interface BaseEquipment {
  id: string;
  name: LocalizedText;
  description?: LocalizedText;
  quantity: number;
  category?: string;
}

export interface BaseRace {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  bonuses?: Record<string, number>;
  traits?: string[];
}

export interface BaseClass {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  hitDie?: string;
  primaryAttributes?: string[];
  skillsCount?: number;
  availableSkills?: string[];
}

export interface SystemResources {
  hitPoints: {
    base: number;
    formula: string;
    name: LocalizedText;
  };
  secondaryResource?: {
    base: number;
    formula: string;
    name: LocalizedText;
  };
  languages: string[];
  equipment: BaseEquipment[];
}

export interface RPGSystemConfig {
  id: string;
  name: LocalizedText;
  version: string;
  description: LocalizedText;
  
  // Character creation steps
  races: BaseRace[];
  classes: BaseClass[];
  attributes: {
    label: LocalizedText;
    list: BaseAttribute[];
    totalPoints: number;
    distributionMethod: 'points' | 'array' | 'roll';
    maxPerAttribute?: number;
    minPerAttribute?: number;
  };
  skills: {
    label: LocalizedText;
    list: BaseSkill[];
    totalPoints?: number;
    selectionCount?: number;
    categories?: Record<string, LocalizedText>;
  };
  resources: SystemResources;
  
  // System-specific settings
  customFields?: Record<string, any>;
}

export interface CharacterSheet {
  id?: string;
  systemId: string;
  name: string;
  race: string;
  class: string;
  level: number;
  background?: string;
  
  attributes: Record<string, number>;
  skills: Record<string, number>;
  hitPoints: { current: number; max: number; temp?: number };
  secondaryResource?: { current: number; max: number };
  
  equipment: BaseEquipment[];
  languages: string[];
  
  notes?: string;
  imageUrl?: string;
  
  // System-specific data
  systemData?: Record<string, any>;
  
  createdAt: Date;
  updatedAt: Date;
}
