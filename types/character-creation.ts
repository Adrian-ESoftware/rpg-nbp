export interface Option {
  id: string
  name: string
  description: string
}

export interface LegacyOption extends Option {}

export interface CombatPathOption extends Option {}

export interface AttributeOption extends Option {}

export interface SkillOption extends Option {
  combatPaths: string[]
}

export interface EquipmentItem {
  id: string
  name: string
  quantity: number
}

export interface SystemConfiguration {
  id: string
  name: string
  identity: {
    legacyLabel: string
    legacyOptions: LegacyOption[]
    combatPathLabel: string
    combatPathOptions: CombatPathOption[]
  }
  attributes: {
    label: string
    totalPoints: number
    maxPerAttribute: number
    list: AttributeOption[]
  }
  knowledge: {
    label: string
    totalPoints: number
    maxPerKnowledge: number
    list: AttributeOption[]
  }
  skills: {
    initialCount: number
    available: SkillOption[]
  }
  resources: {
    baseHP: number
    baseEP: number
    hpFormula: string
    epFormula: string
    initialLanguages: string[]
    initialEquipment: EquipmentItem[]
  }
}

export interface CharacterData {
  name: string
  background: string
  legacy: string
  combatPath: string
  attributes: Record<string, number>
  knowledge: Record<string, number>
  skills: string[]
  hitPoints: number
  energyPoints: number
  languages: string[]
  equipment: EquipmentItem[]
  imageUrl?: string
}
