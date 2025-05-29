import type { RPGSystemConfig } from '@/types/rpg-systems';

export const pathfinderSystem: RPGSystemConfig = {
  id: 'pathfinder',
  name: {
    pt: 'Pathfinder 1ª Edição',
    en: 'Pathfinder 1st Edition',
    es: 'Pathfinder 1ª Edición'
  },
  version: '1.0',
  description: {
    pt: 'Sistema de RPG de fantasia com robustas opções de customização',
    en: 'Fantasy RPG system with robust customization options',
    es: 'Sistema de rol de fantasía con sólidas opciones de personalización'
  },

  attributes: {
    label: { pt: 'Atributos', en: 'Abilities', es: 'Habilidades' },
    totalPoints: 15,
    distributionMethod: 'points',
    maxPerAttribute: 18,
    minPerAttribute: 7,
    list: [
      { id: 'forca', name: { pt: 'Força', en: 'Strength', es: 'Fuerza' }, description: { pt: 'Poder físico', en: 'Physical power', es: 'Poder físico' } },
      { id: 'destreza', name: { pt: 'Destreza', en: 'Dexterity', es: 'Destreza' }, description: { pt: 'Agilidade e reflexos', en: 'Agility and reflexes', es: 'Agilidad y reflejos' } },
      { id: 'constituicao', name: { pt: 'Constituição', en: 'Constitution', es: 'Constitución' }, description: { pt: 'Resistência e vitalidade', en: 'Resistance and vitality', es: 'Resistencia y vitalidad' } },
      { id: 'inteligencia', name: { pt: 'Inteligência', en: 'Intelligence', es: 'Inteligencia' }, description: { pt: 'Conhecimento e lógica', en: 'Knowledge and logic', es: 'Conocimiento y lógica' } },
      { id: 'sabedoria', name: { pt: 'Sabedoria', en: 'Wisdom', es: 'Sabiduría' }, description: { pt: 'Intuição e percepção', en: 'Intuition and perception', es: 'Intuición y percepción' } },
      { id: 'carisma', name: { pt: 'Carisma', en: 'Charisma', es: 'Carisma' }, description: { pt: 'Presença e influência', en: 'Presence and influence', es: 'Presencia e influencia' } }
    ]
  },

  races: [
    { id: 'humano', name: { pt: 'Humano', en: 'Human', es: 'Humano' }, description: { pt: 'Versátil e adaptável', en: 'Versatile and adaptable', es: 'Versátil y adaptable' }, bonuses: {} },
    { id: 'elfo', name: { pt: 'Elfo', en: 'Elf', es: 'Elfo' }, description: { pt: 'Ágil e inteligente', en: 'Agile and intelligent', es: 'Ágil e inteligente' }, bonuses: { destreza: 2, inteligencia: 2, constituicao: -2 } },
    { id: 'anao', name: { pt: 'Anão', en: 'Dwarf', es: 'Enano' }, description: { pt: 'Resistente e firme', en: 'Resistant and steady', es: 'Resistente y firme' }, bonuses: { constituicao: 2, sabedoria: 2, carisma: -2 } },
    { id: 'halfling', name: { pt: 'Halfling', en: 'Halfling', es: 'Halfling' }, description: { pt: 'Pequeno e sortudo', en: 'Small and lucky', es: 'Pequeño y afortunado' }, bonuses: { destreza: 2, carisma: 2, forca: -2 } },
    { id: 'gnomo', name: { pt: 'Gnomo', en: 'Gnome', es: 'Gnomo' }, description: { pt: 'Inventivo e curioso', en: 'Inventive and curious', es: 'Inventivo y curioso' }, bonuses: { carisma: 2, constituicao: 2, forca: -2 } },
    { id: 'meio_elfo', name: { pt: 'Meio-Elfo', en: 'Half-Elf', es: 'Medio Elfo' }, description: { pt: 'Diplomático e adaptável', en: 'Diplomatic and adaptable', es: 'Diplomático y adaptable' }, bonuses: {} },
    { id: 'meio_orc', name: { pt: 'Meio-Orc', en: 'Half-Orc', es: 'Medio Orco' }, description: { pt: 'Forte e intimidador', en: 'Strong and intimidating', es: 'Fuerte e intimidante' }, bonuses: {} }
  ],

  classes: [
    { id: 'barbaro', name: { pt: 'Bárbaro', en: 'Barbarian', es: 'Bárbaro' }, description: { pt: 'Guerreiro feroz com fúria incontrolável', en: 'Fierce warrior with uncontrollable rage', es: 'Guerrero feroz con furia incontrolable' }, hitDie: 'd12', primaryAttributes: ['forca'], skillsCount: 4 },
    { id: 'bardo', name: { pt: 'Bardo', en: 'Bard', es: 'Bardo' }, description: { pt: 'Artista mágico e inspirador', en: 'Magical and inspiring artist', es: 'Artista mágico e inspirador' }, hitDie: 'd8', primaryAttributes: ['carisma'], skillsCount: 6 },
    { id: 'clerigo', name: { pt: 'Clérigo', en: 'Cleric', es: 'Clérigo' }, description: { pt: 'Canalizador de poder divino', en: 'Channeler of divine power', es: 'Canalizador de poder divino' }, hitDie: 'd8', primaryAttributes: ['sabedoria'], skillsCount: 2 },
    { id: 'druida', name: { pt: 'Druida', en: 'Druid', es: 'Druida' }, description: { pt: 'Guardião da natureza', en: 'Nature guardian', es: 'Guardián de la naturaleza' }, hitDie: 'd8', primaryAttributes: ['sabedoria'], skillsCount: 4 },
    { id: 'guerreiro', name: { pt: 'Guerreiro', en: 'Fighter', es: 'Guerrero' }, description: { pt: 'Especialista em combate físico', en: 'Physical combat specialist', es: 'Especialista en combate físico' }, hitDie: 'd10', primaryAttributes: ['forca'], skillsCount: 2 },
    { id: 'feiticeiro', name: { pt: 'Feiticeiro', en: 'Sorcerer', es: 'Hechicero' }, description: { pt: 'Mago com poder inato', en: 'Innate magic user', es: 'Mago con poder innato' }, hitDie: 'd6', primaryAttributes: ['carisma'], skillsCount: 2 },
    { id: 'ladino', name: { pt: 'Ladino', en: 'Rogue', es: 'Pícaro' }, description: { pt: 'Especialista em furtividade', en: 'Stealth specialist', es: 'Especialista en sigilo' }, hitDie: 'd8', primaryAttributes: ['destreza'], skillsCount: 8 },
    { id: 'mago', name: { pt: 'Mago', en: 'Wizard', es: 'Mago' }, description: { pt: 'Estudioso das artes arcanas', en: 'Arcane arts scholar', es: 'Estudioso de las artes arcanas' }, hitDie: 'd6', primaryAttributes: ['inteligencia'], skillsCount: 2 },
    { id: 'monge', name: { pt: 'Monge', en: 'Monk', es: 'Monje' }, description: { pt: 'Mestre do corpo e mente', en: 'Master of body and mind', es: 'Maestro del cuerpo y la mente' }, hitDie: 'd8', primaryAttributes: ['destreza'], skillsCount: 4 },
    { id: 'paladino', name: { pt: 'Paladino', en: 'Paladin', es: 'Paladín' }, description: { pt: 'Campeão do bem com poderes sagrados', en: 'Champion of good with sacred powers', es: 'Campeón del bien con poderes sagrados' }, hitDie: 'd10', primaryAttributes: ['carisma'], skillsCount: 2 },
    { id: 'patrulheiro', name: { pt: 'Patrulheiro', en: 'Ranger', es: 'Explorador' }, description: { pt: 'Caçador da natureza e rastreador', en: 'Nature hunter and tracker', es: 'Cazador y rastreador de la naturaleza' }, hitDie: 'd10', primaryAttributes: ['destreza'], skillsCount: 6 }
  ],

  skills: {
    label: { pt: 'Perícias', en: 'Skills', es: 'Habilidades' },
    selectionCount: 4,
    list: []
  },

  resources: {
    hitPoints: {
      base: 0,
      formula: 'Classe base + Modificador de Constituição',
      name: { pt: 'Pontos de Vida', en: 'Hit Points', es: 'Puntos de Vida' }
    },
    languages: ['comum'],
    equipment: []
  },

  customFields: {
    abilityScoreImprovement: true,
    proficiencyBonus: false,
    spellcasting: true
  }
};