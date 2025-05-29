import type { RPGSystemConfig } from '@/types/rpg-systems';

export const dnd5eSystem: RPGSystemConfig = {
  id: 'dnd5e',
  name: {
    pt: 'D&D 5ª Edição',
    en: 'D&D 5th Edition',
    es: 'D&D 5ª Edición'
  },
  version: '5.0',
  description: {
    pt: 'O clássico sistema de RPG de fantasia medieval',
    en: 'The classic medieval fantasy RPG system',
    es: 'El clásico sistema de RPG de fantasía medieval'
  },

  races: [
    {
      id: 'humano',
      name: { pt: 'Humano', en: 'Human', es: 'Humano' },
      description: { 
        pt: 'Versatilidade e adaptabilidade', 
        en: 'Versatility and adaptability',
        es: 'Versatilidad y adaptabilidad'
      },
      bonuses: { forca: 1, destreza: 1, constituicao: 1, inteligencia: 1, sabedoria: 1, carisma: 1 }
    },
    {
      id: 'elfo',
      name: { pt: 'Elfo', en: 'Elf', es: 'Elfo' },
      description: { 
        pt: 'Graciosidade e magia natural', 
        en: 'Grace and natural magic',
        es: 'Gracia y magia natural'
      },
      bonuses: { destreza: 2 }
    },
    {
      id: 'anao',
      name: { pt: 'Anão', en: 'Dwarf', es: 'Enano' },
      description: { 
        pt: 'Resistência e artesanato', 
        en: 'Resistance and craftsmanship',
        es: 'Resistencia y artesanía'
      },
      bonuses: { constituicao: 2 }
    },
    {
      id: 'halfling',
      name: { pt: 'Halfling', en: 'Halfling', es: 'Halfling' },
      description: { 
        pt: 'Sorte e coragem', 
        en: 'Luck and courage',
        es: 'Suerte y coraje'
      },
      bonuses: { destreza: 2 }
    }
  ],

  classes: [
    {
      id: 'guerreiro',
      name: { pt: 'Guerreiro', en: 'Fighter', es: 'Guerrero' },
      description: { 
        pt: 'Mestre das armas e armaduras', 
        en: 'Master of weapons and armor',
        es: 'Maestro de armas y armaduras'
      },
      hitDie: 'd10',
      primaryAttributes: ['forca', 'destreza'],
      skillsCount: 2
    },
    {
      id: 'mago',
      name: { pt: 'Mago', en: 'Wizard', es: 'Mago' },
      description: { 
        pt: 'Estudioso das artes arcanas', 
        en: 'Scholar of arcane arts',
        es: 'Estudioso de las artes arcanas'
      },
      hitDie: 'd6',
      primaryAttributes: ['inteligencia'],
      skillsCount: 2
    },
    {
      id: 'ladino',
      name: { pt: 'Ladino', en: 'Rogue', es: 'Pícaro' },
      description: { 
        pt: 'Especialista em furtividade e precisão', 
        en: 'Specialist in stealth and precision',
        es: 'Especialista en sigilo y precisión'
      },
      hitDie: 'd8',
      primaryAttributes: ['destreza'],
      skillsCount: 4
    },
    {
      id: 'clerigo',
      name: { pt: 'Clérigo', en: 'Cleric', es: 'Clérigo' },
      description: { 
        pt: 'Servo dos deuses com poder divino', 
        en: 'Servant of gods with divine power',
        es: 'Servidor de los dioses con poder divino'
      },
      hitDie: 'd8',
      primaryAttributes: ['sabedoria'],
      skillsCount: 2
    }
  ],

  attributes: {
    label: { pt: 'Habilidades', en: 'Abilities', es: 'Habilidades' },
    totalPoints: 27,
    distributionMethod: 'points',
    maxPerAttribute: 15,
    minPerAttribute: 8,
    list: [
      {
        id: 'forca',
        name: { pt: 'Força', en: 'Strength', es: 'Fuerza' },
        description: { pt: 'Poder físico', en: 'Physical power', es: 'Poder físico' }
      },
      {
        id: 'destreza',
        name: { pt: 'Destreza', en: 'Dexterity', es: 'Destreza' },
        description: { pt: 'Agilidade e reflexos', en: 'Agility and reflexes', es: 'Agilidad y reflejos' }
      },
      {
        id: 'constituicao',
        name: { pt: 'Constituição', en: 'Constitution', es: 'Constitución' },
        description: { pt: 'Resistência e vitalidade', en: 'Resistance and vitality', es: 'Resistencia y vitalidad' }
      },
      {
        id: 'inteligencia',
        name: { pt: 'Inteligência', en: 'Intelligence', es: 'Inteligencia' },
        description: { pt: 'Raciocínio e memória', en: 'Reasoning and memory', es: 'Razonamiento y memoria' }
      },
      {
        id: 'sabedoria',
        name: { pt: 'Sabedoria', en: 'Wisdom', es: 'Sabiduría' },
        description: { pt: 'Percepção e intuição', en: 'Perception and intuition', es: 'Percepción e intuición' }
      },
      {
        id: 'carisma',
        name: { pt: 'Carisma', en: 'Charisma', es: 'Carisma' },
        description: { pt: 'Força de personalidade', en: 'Force of personality', es: 'Fuerza de personalidad' }
      }
    ]
  },

  skills: {
    label: { pt: 'Perícias', en: 'Skills', es: 'Competencias' },
    selectionCount: 4,
    list: [
      {
        id: 'acrobacia',
        name: { pt: 'Acrobacia', en: 'Acrobatics', es: 'Acrobacia' },
        description: { pt: 'Equilíbrio e agilidade', en: 'Balance and agility', es: 'Equilibrio y agilidad' }
      },
      {
        id: 'atletismo',
        name: { pt: 'Atletismo', en: 'Athletics', es: 'Atletismo' },
        description: { pt: 'Atividades físicas', en: 'Physical activities', es: 'Actividades físicas' }
      },
      {
        id: 'furtividade',
        name: { pt: 'Furtividade', en: 'Stealth', es: 'Sigilo' },
        description: { pt: 'Mover-se sem ser detectado', en: 'Move without being detected', es: 'Moverse sin ser detectado' }
      },
      {
        id: 'percepcao',
        name: { pt: 'Percepção', en: 'Perception', es: 'Percepción' },
        description: { pt: 'Notar detalhes', en: 'Notice details', es: 'Notar detalles' }
      },
      {
        id: 'investigacao',
        name: { pt: 'Investigação', en: 'Investigation', es: 'Investigación' },
        description: { pt: 'Buscar pistas e evidências', en: 'Search for clues and evidence', es: 'Buscar pistas y evidencias' }
      },
      {
        id: 'persuasao',
        name: { pt: 'Persuasão', en: 'Persuasion', es: 'Persuasión' },
        description: { pt: 'Influenciar outros', en: 'Influence others', es: 'Influir en otros' }
      },
      {
        id: 'intimidacao',
        name: { pt: 'Intimidação', en: 'Intimidation', es: 'Intimidación' },
        description: { pt: 'Ameaçar e coagir', en: 'Threaten and coerce', es: 'Amenazar y coaccionar' }
      },
      {
        id: 'enganacao',
        name: { pt: 'Enganação', en: 'Deception', es: 'Engaño' },
        description: { pt: 'Mentir e enganar', en: 'Lie and deceive', es: 'Mentir y engañar' }
      },
      {
        id: 'intuicao',
        name: { pt: 'Intuição', en: 'Insight', es: 'Perspicacia' },
        description: { pt: 'Ler intenções e motivações', en: 'Read intentions and motivations', es: 'Leer intenciones y motivaciones' }
      },
      {
        id: 'medicina',
        name: { pt: 'Medicina', en: 'Medicine', es: 'Medicina' },
        description: { pt: 'Cuidados médicos e primeiros socorros', en: 'Medical care and first aid', es: 'Atención médica y primeros auxilios' }
      },
      {
        id: 'sobrevivencia',
        name: { pt: 'Sobrevivência', en: 'Survival', es: 'Supervivencia' },
        description: { pt: 'Navegar e sobreviver na natureza', en: 'Navigate and survive in nature', es: 'Navegar y sobrevivir en la naturaleza' }
      },
      {
        id: 'arcanismo',
        name: { pt: 'Arcanismo', en: 'Arcana', es: 'Arcanismo' },
        description: { pt: 'Conhecimento de magia e mistérios', en: 'Knowledge of magic and mysteries', es: 'Conocimiento de magia y misterios' }
      },
      {
        id: 'historia',
        name: { pt: 'História', en: 'History', es: 'Historia' },
        description: { pt: 'Conhecimento de eventos históricos', en: 'Knowledge of historical events', es: 'Conocimiento de eventos históricos' }
      },
      {
        id: 'natureza',
        name: { pt: 'Natureza', en: 'Nature', es: 'Naturaleza' },
        description: { pt: 'Conhecimento do mundo natural', en: 'Knowledge of the natural world', es: 'Conocimiento del mundo natural' }
      },
      {
        id: 'religiao',
        name: { pt: 'Religião', en: 'Religion', es: 'Religión' },
        description: { pt: 'Conhecimento de deidades e rituais', en: 'Knowledge of deities and rituals', es: 'Conocimiento de deidades y rituales' }
      },
      {
        id: 'performance',
        name: { pt: 'Performance', en: 'Performance', es: 'Actuación' },
        description: { pt: 'Entreter uma audiência', en: 'Entertain an audience', es: 'Entretener a una audiencia' }
      },
      {
        id: 'prestidigitacao',
        name: { pt: 'Prestidigitação', en: 'Sleight of Hand', es: 'Juego de Manos' },
        description: { pt: 'Destreza manual e truques', en: 'Manual dexterity and tricks', es: 'Destreza manual y trucos' }
      },
      {
        id: 'lidar_animais',
        name: { pt: 'Lidar com Animais', en: 'Animal Handling', es: 'Trato con Animales' },
        description: { pt: 'Interagir e controlar animais', en: 'Interact and control animals', es: 'Interactuar y controlar animales' }
      }
    ]
  },

  resources: {
    hitPoints: {
      base: 0,
      formula: 'Classe base + Modificador de Constituição',
      name: { pt: 'Pontos de Vida', en: 'Hit Points', es: 'Puntos de Vida' }
    },
    languages: ['comum'],
    equipment: [
      {
        id: 'armadura_couro',
        name: { pt: 'Armadura de Couro', en: 'Leather Armor', es: 'Armadura de Cuero' },
        quantity: 1
      },
      {
        id: 'kit_aventureiro',
        name: { pt: 'Kit do Aventureiro', en: 'Adventurer\'s Kit', es: 'Kit del Aventurero' },
        quantity: 1
      }
    ]
  },

  customFields: {
    abilityScoreImprovement: true,
    proficiencyBonus: true,
    spellcasting: true
  }
};
