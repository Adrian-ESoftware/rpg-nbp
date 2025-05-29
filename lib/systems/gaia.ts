import type { RPGSystemConfig } from '@/types/rpg-systems';

export const gaiaSystem: RPGSystemConfig = {
  id: 'gaia',
  name: {
    pt: 'Gaia: O Prelúdio',
    en: 'Gaia: The Prelude',
    es: 'Gaia: El Preludio'
  },
  version: '1.0',
  description: {
    pt: 'Sistema de RPG ambientado no mundo místico de Gaia',
    en: 'RPG system set in the mystical world of Gaia',
    es: 'Sistema de RPG ambientado en el mundo místico de Gaia'
  },

  races: [
    {
      id: 'humano',
      name: { pt: 'Humano', en: 'Human', es: 'Humano' },
      description: { 
        pt: 'Versatilidade e adaptabilidade únicas', 
        en: 'Unique versatility and adaptability',
        es: 'Versatilidad y adaptabilidad únicas'
      },
      bonuses: { espirito: 1 }
    },
    {
      id: 'elfo',
      name: { pt: 'Elfo', en: 'Elf', es: 'Elfo' },
      description: { 
        pt: 'Seres mágicos com afinidade natural à natureza', 
        en: 'Magical beings with natural affinity to nature',
        es: 'Seres mágicos con afinidad natural a la naturaleza'
      },
      bonuses: { arcanismo: 1, agilidade: 1 }
    },
    {
      id: 'anao',
      name: { pt: 'Anão', en: 'Dwarf', es: 'Enano' },
      description: { 
        pt: 'Mestres artesãos com resistência natural', 
        en: 'Master craftsmen with natural resistance',
        es: 'Maestros artesanos con resistencia natural'
      },
      bonuses: { vigor: 1, destreza: 1 }
    },
    {
      id: 'minotauro',
      name: { pt: 'Minotauro', en: 'Minotaur', es: 'Minotauro' },
      description: { 
        pt: 'Guerreiros poderosos com força descomunal', 
        en: 'Powerful warriors with tremendous strength',
        es: 'Guerreros poderosos con fuerza descomunal'
      },
      bonuses: { brutalidade: 2 }
    },
    {
      id: 'halfling',
      name: { pt: 'Halfling', en: 'Halfling', es: 'Halfling' },
      description: { 
        pt: 'Pequenos e ágeis, com sorte natural', 
        en: 'Small and agile, with natural luck',
        es: 'Pequeños y ágiles, con suerte natural'
      },
      bonuses: { agilidade: 1, furtividade: 1 }
    }
  ],

  classes: [
    {
      id: 'guerreiro',
      name: { pt: 'Guerreiro', en: 'Warrior', es: 'Guerrero' },
      description: { 
        pt: 'Especialista em combate corpo a corpo', 
        en: 'Close combat specialist',
        es: 'Especialista em combate corpo a corpo'
      },
      primaryAttributes: ['brutalidade', 'vigor'],
      skillsCount: 2
    },
    {
      id: 'atirador',
      name: { pt: 'Atirador', en: 'Marksman', es: 'Tirador' },
      description: { 
        pt: 'Mestre em combate à distância', 
        en: 'Master of ranged combat',
        es: 'Maestro en combate a distancia'
      },
      primaryAttributes: ['precisao', 'agilidade'],
      skillsCount: 2
    },
    {
      id: 'feiticeiro',
      name: { pt: 'Feiticeiro', en: 'Sorcerer', es: 'Hechicero' },
      description: { 
        pt: 'Manipulador de energias arcanas', 
        en: 'Manipulator of arcane energies',
        es: 'Manipulador de energías arcanas'
      },
      primaryAttributes: ['arcanismo', 'canalizacao'],
      skillsCount: 3
    },
    {
      id: 'bucaneiro',
      name: { pt: 'Bucaneiro', en: 'Buccaneer', es: 'Bucanero' },
      description: { 
        pt: 'Aventureiro versátil e oportunista', 
        en: 'Versatile and opportunistic adventurer',
        es: 'Aventurero versátil y oportunista'
      },
      primaryAttributes: ['destreza', 'carisma'],
      skillsCount: 4
    }
  ],

  attributes: {
    label: { pt: 'Parâmetros', en: 'Parameters', es: 'Parámetros' },
    totalPoints: 7,
    distributionMethod: 'points',
    maxPerAttribute: 2,
    minPerAttribute: 0,
    list: [
      {
        id: 'brutalidade',
        name: { pt: 'Brutalidade', en: 'Brutality', es: 'Brutalidad' },
        description: { pt: 'Força física bruta', en: 'Raw physical strength', es: 'Fuerza física bruta' }
      },
      {
        id: 'destreza',
        name: { pt: 'Destreza', en: 'Dexterity', es: 'Destreza' },
        description: { pt: 'Habilidade manual e coordenação', en: 'Manual skill and coordination', es: 'Habilidad manual y coordinación' }
      },
      {
        id: 'agilidade',
        name: { pt: 'Agilidade', en: 'Agility', es: 'Agilidad' },
        description: { pt: 'Velocidade e reflexos', en: 'Speed and reflexes', es: 'Velocidad y reflejos' }
      },
      {
        id: 'precisao',
        name: { pt: 'Precisão', en: 'Precision', es: 'Precisión' },
        description: { pt: 'Acurácia em ataques', en: 'Attack accuracy', es: 'Precisión en ataques' }
      },
      {
        id: 'canalizacao',
        name: { pt: 'Canalização', en: 'Channeling', es: 'Canalización' },
        description: { pt: 'Controle de energia mágica', en: 'Magical energy control', es: 'Control de energía mágica' }
      },
      {
        id: 'arcanismo',
        name: { pt: 'Arcanismo', en: 'Arcanism', es: 'Arcanismo' },
        description: { pt: 'Conhecimento das artes arcanas', en: 'Knowledge of arcane arts', es: 'Conocimiento de las artes arcanas' }
      },
      {
        id: 'espirito',
        name: { pt: 'Espírito', en: 'Spirit', es: 'Espíritu' },
        description: { pt: 'Força de vontade e determinação', en: 'Willpower and determination', es: 'Fuerza de voluntad y determinación' }
      },
      {
        id: 'vigor',
        name: { pt: 'Vigor', en: 'Vigor', es: 'Vigor' },
        description: { pt: 'Resistência física e saúde', en: 'Physical resistance and health', es: 'Resistencia física y salud' }
      }
    ]
  },

  skills: {
    label: { pt: 'Conhecimentos', en: 'Knowledge', es: 'Conocimientos' },
    totalPoints: 7,
    list: [
      {
        id: 'mistico',
        name: { pt: 'Místico', en: 'Mystical', es: 'Místico' },
        description: { pt: 'Conhecimento sobre magia e mistérios', en: 'Knowledge about magic and mysteries', es: 'Conocimiento sobre magia y misterios' }
      },
      {
        id: 'exploracao',
        name: { pt: 'Exploração', en: 'Exploration', es: 'Exploración' },
        description: { pt: 'Sobrevivência e navegação', en: 'Survival and navigation', es: 'Supervivencia y navegación' }
      },
      {
        id: 'historia',
        name: { pt: 'História', en: 'History', es: 'Historia' },
        description: { pt: 'Conhecimento do passado', en: 'Knowledge of the past', es: 'Conocimiento del pasado' }
      },
      {
        id: 'religiao',
        name: { pt: 'Religião', en: 'Religion', es: 'Religión' },
        description: { pt: 'Conhecimento sobre deuses e fé', en: 'Knowledge about gods and faith', es: 'Conocimiento sobre dioses y fe' }
      },
      {
        id: 'carisma',
        name: { pt: 'Carisma', en: 'Charisma', es: 'Carisma' },
        description: { pt: 'Influência e liderança', en: 'Influence and leadership', es: 'Influencia y liderazgo' }
      },
      {
        id: 'intimidacao',
        name: { pt: 'Intimidação', en: 'Intimidation', es: 'Intimidación' },
        description: { pt: 'Capacidade de amedrontar', en: 'Ability to frighten', es: 'Capacidad de intimidar' }
      },
      {
        id: 'furtividade',
        name: { pt: 'Furtividade', en: 'Stealth', es: 'Sigilo' },
        description: { pt: 'Capacidade de se esconder', en: 'Ability to hide', es: 'Capacidad de ocultarse' }
      },
      {
        id: 'performance',
        name: { pt: 'Performance', en: 'Performance', es: 'Interpretación' },
        description: { pt: 'Habilidades artísticas', en: 'Artistic abilities', es: 'Habilidades artísticas' }
      },
      {
        id: 'percepcao',
        name: { pt: 'Percepção', en: 'Perception', es: 'Percepción' },
        description: { pt: 'Capacidade de notar detalhes', en: 'Ability to notice details', es: 'Capacidad de notar detalles' }
      },
      {
        id: 'tecnologia',
        name: { pt: 'Tecnologia', en: 'Technology', es: 'Tecnología' },
        description: { pt: 'Conhecimento técnico e inventivo', en: 'Technical and inventive knowledge', es: 'Conocimiento técnico e inventivo' }
      }
    ]
  },

  resources: {
    hitPoints: {
      base: 30,
      formula: '30 + 1d6 + Vigor',
      name: { pt: 'Pontos de Vida', en: 'Hit Points', es: 'Puntos de Vida' }
    },
    secondaryResource: {
      base: 5,
      formula: '5',
      name: { pt: 'Pontos de Energia', en: 'Energy Points', es: 'Puntos de Energía' }
    },
    languages: ['comum'],
    equipment: [
      {
        id: 'roupas',
        name: { pt: 'Conjunto de Roupas', en: 'Set of Clothes', es: 'Conjunto de Ropa' },
        quantity: 1
      },
      {
        id: 'bolsa',
        name: { pt: 'Bolsa', en: 'Bag', es: 'Bolsa' },
        quantity: 1
      },
      {
        id: 'moedas_prata',
        name: { pt: 'Moedas de Prata', en: 'Silver Coins', es: 'Monedas de Plata' },
        quantity: 120
      }
    ]
  },

  customFields: {
    energySystem: true,
    maxAttributeAtCreation: 2,
    skillPointDistribution: true
  }
};
