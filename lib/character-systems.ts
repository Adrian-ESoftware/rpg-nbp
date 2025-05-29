import type { SystemConfiguration, LocalizedString } from "@/types/character-creation"

// Helper function to get localized string
export function getLocalizedString(text: string | LocalizedString, language: 'pt' | 'en' | 'es' = 'pt'): string {
  if (typeof text === 'string') {
    return text
  }
  return text[language] || text.pt
}

// Internationalization data for future use
export const localizedData = {
  gaia: {
    attributes: {
      label: {
        pt: "Parâmetros",
        en: "Attributes",
        es: "Atributos"
      },
      items: {
        brutalidade: {
          name: { pt: "Brutalidade", en: "Brutality", es: "Brutalidad" },
          description: { pt: "Força física bruta", en: "Raw physical strength", es: "Fuerza física bruta" }
        },
        destreza: {
          name: { pt: "Destreza", en: "Dexterity", es: "Destreza" },
          description: { pt: "Habilidade manual e coordenação", en: "Manual skill and coordination", es: "Habilidad manual y coordinación" }
        },
        agilidade: {
          name: { pt: "Agilidade", en: "Agility", es: "Agilidad" },
          description: { pt: "Velocidade e reflexos", en: "Speed and reflexes", es: "Velocidad y reflejos" }
        },
        precisao: {
          name: { pt: "Precisão", en: "Precision", es: "Precisión" },
          description: { pt: "Acurácia em ataques", en: "Attack accuracy", es: "Precisión en ataques" }
        },
        canalizacao: {
          name: { pt: "Canalização", en: "Channeling", es: "Canalización" },
          description: { pt: "Controle de energia mágica", en: "Magical energy control", es: "Control de energía mágica" }
        },
        arcanismo: {
          name: { pt: "Arcanismo", en: "Arcanism", es: "Arcanismo" },
          description: { pt: "Conhecimento das artes arcanas", en: "Knowledge of arcane arts", es: "Conocimiento de las artes arcanas" }
        },
        espirito: {
          name: { pt: "Espírito", en: "Spirit", es: "Espíritu" },
          description: { pt: "Força de vontade e determinação", en: "Willpower and determination", es: "Fuerza de voluntad y determinación" }
        },
        vigor: {
          name: { pt: "Vigor", en: "Vigor", es: "Vigor" },
          description: { pt: "Resistência física e saúde", en: "Physical resistance and health", es: "Resistencia física y salud" }
        }
      }
    },
    knowledge: {
      label: {
        pt: "Conhecimentos",
        en: "Knowledge",
        es: "Conocimientos"
      },
      items: {
        mistico: {
          name: { pt: "Místico", en: "Mystical", es: "Místico" },
          description: { pt: "Conhecimento sobre magia e mistérios", en: "Knowledge about magic and mysteries", es: "Conocimiento sobre magia y misterios" }
        },
        exploracao: {
          name: { pt: "Exploração", en: "Exploration", es: "Exploración" },
          description: { pt: "Sobrevivência e navegação", en: "Survival and navigation", es: "Supervivencia y navegación" }
        },
        historia: {
          name: { pt: "História", en: "History", es: "Historia" },
          description: { pt: "Conhecimento do passado", en: "Knowledge of the past", es: "Conocimiento del pasado" }
        },
        religiao: {
          name: { pt: "Religião", en: "Religion", es: "Religión" },
          description: { pt: "Conhecimento sobre deuses e fé", en: "Knowledge about gods and faith", es: "Conocimiento sobre dioses y fe" }
        },
        carisma: {
          name: { pt: "Carisma", en: "Charisma", es: "Carisma" },
          description: { pt: "Influência e liderança", en: "Influence and leadership", es: "Influencia y liderazgo" }
        },
        intuicao: {
          name: { pt: "Intuição", en: "Intuition", es: "Intuición" },
          description: { pt: "Percepção e instinto", en: "Perception and instinct", es: "Percepción e instinto" }
        },
        intimidacao: {
          name: { pt: "Intimidação", en: "Intimidation", es: "Intimidación" },
          description: { pt: "Capacidade de amedrontar", en: "Ability to frighten", es: "Capacidad de intimidar" }
        },
        vontade: {
          name: { pt: "Vontade", en: "Will", es: "Voluntad" },
          description: { pt: "Resistência mental", en: "Mental resistance", es: "Resistencia mental" }
        },
        furtividade: {
          name: { pt: "Furtividade", en: "Stealth", es: "Sigilo" },
          description: { pt: "Capacidade de se esconder", en: "Ability to hide", es: "Capacidad de ocultarse" }
        },
        performance: {
          name: { pt: "Performance", en: "Performance", es: "Interpretación" },
          description: { pt: "Habilidades artísticas", en: "Artistic abilities", es: "Habilidades artísticas" }
        },
        percepcao: {
          name: { pt: "Percepção", en: "Perception", es: "Percepción" },
          description: { pt: "Capacidade de notar detalhes", en: "Ability to notice details", es: "Capacidad de notar detalles" }
        },
        tecnologia: {
          name: { pt: "Tecnologia", en: "Technology", es: "Tecnología" },
          description: { pt: "Conhecimento técnico e inventivo", en: "Technical and inventive knowledge", es: "Conocimiento técnico e inventivo" }
        }
      }
    }
  },
  dnd5e: {
    attributes: {
      label: {
        pt: "Atributos",
        en: "Attributes",
        es: "Atributos"
      },
      items: {
        forca: {
          name: { pt: "Força", en: "Strength", es: "Fuerza" },
          description: { pt: "Poder físico", en: "Physical power", es: "Poder físico" }
        },
        destreza: {
          name: { pt: "Destreza", en: "Dexterity", es: "Destreza" },
          description: { pt: "Agilidade e reflexos", en: "Agility and reflexes", es: "Agilidad y reflejos" }
        },
        constituicao: {
          name: { pt: "Constituição", en: "Constitution", es: "Constitución" },
          description: { pt: "Resistência e vitalidade", en: "Resistance and vitality", es: "Resistencia y vitalidad" }
        },
        inteligencia: {
          name: { pt: "Inteligência", en: "Intelligence", es: "Inteligencia" },
          description: { pt: "Raciocínio e memória", en: "Reasoning and memory", es: "Razonamiento y memoria" }
        },
        sabedoria: {
          name: { pt: "Sabedoria", en: "Wisdom", es: "Sabiduría" },
          description: { pt: "Percepção e intuição", en: "Perception and intuition", es: "Percepción e intuición" }
        },
        carisma: {
          name: { pt: "Carisma", en: "Charisma", es: "Carisma" },
          description: { pt: "Força de personalidade", en: "Force of personality", es: "Fuerza de personalidad" }
        }
      }
    },
    knowledge: {
      label: {
        pt: "Perícias",
        en: "Skills",
        es: "Habilidades"
      },
      items: {
        atletismo: {
          name: { pt: "Atletismo", en: "Athletics", es: "Atletismo" },
          description: { pt: "Atividades físicas", en: "Physical activities", es: "Actividades físicas" }
        },
        acrobacia: {
          name: { pt: "Acrobacia", en: "Acrobatics", es: "Acrobacia" },
          description: { pt: "Equilíbrio e agilidade", en: "Balance and agility", es: "Equilibrio y agilidad" }
        },
        furtividade: {
          name: { pt: "Furtividade", en: "Stealth", es: "Sigilo" },
          description: { pt: "Mover-se sem ser detectado", en: "Move without being detected", es: "Moverse sin ser detectado" }
        },
        percepcao: {
          name: { pt: "Percepção", en: "Perception", es: "Percepción" },
          description: { pt: "Notar detalhes", en: "Notice details", es: "Notar detalles" }
        }
      }
    }
  }
}

export const systemConfigurations: Record<string, SystemConfiguration> = {
  gaia: {
    id: "gaia",
    name: "Gaia: O Prelúdio",
    identity: {
      legacyLabel: "Legado",
      legacyOptions: [
        { id: "elfo", name: "Elfo", description: "Seres mágicos com afinidade natural à natureza" },
        { id: "minotauro", name: "Minotauro", description: "Guerreiros poderosos com força descomunal" },
        { id: "humano", name: "Humano", description: "Versatilidade e adaptabilidade únicas" },
        { id: "anao", name: "Anão", description: "Mestres artesãos com resistência natural" },
        { id: "halfling", name: "Halfling", description: "Pequenos e ágeis, com sorte natural" },
        { id: "draconiano", name: "Draconiano", description: "Descendentes de dragões com poder arcano" },
        { id: "centauro", name: "Centauro", description: "Meio humano, meio cavalo, conectados à natureza" },
        { id: "felino", name: "Felino", description: "Ágeis e silenciosos como gatos" },
        { id: "gnomo", name: "Gnomo", description: "Pequenos inventores com mente brilhante" },
        { id: "goblin", name: "Goblin", description: "Criaturas astutas e engenhosas" },
        { id: "lefou", name: "Lefou", description: "Seres mágicos com aparência bestial" },
        { id: "medusa", name: "Medusa", description: "Serpentinas com olhar petrificante" },
        { id: "meio_elfo", name: "Meio-Elfo", description: "Herança élfica e humana combinadas" },
        { id: "meio_orc", name: "Meio-Orc", description: "Força orca com inteligência humana" },
        { id: "qareen", name: "Qareen", description: "Habitantes do deserto com resistência ao calor" },
        { id: "sprite", name: "Sprite", description: "Fadas pequenas com grande poder mágico" }
      ],
      combatPathLabel: "Caminho de Combate",
      combatPathOptions: [
        { id: "guerreiro", name: "Guerreiro", description: "Especialista em combate corpo a corpo" },
        { id: "atirador", name: "Atirador", description: "Mestre em combate à distância" },
        { id: "feiticeiro", name: "Feiticeiro", description: "Manipulador de energias arcanas" },
        { id: "bucaneiro", name: "Bucaneiro", description: "Aventureiro versátil e oportunista" }
      ]
    },
    attributes: {
      label: "Parâmetros",
      totalPoints: 7,
      maxPerAttribute: 2,
      list: [
        { id: "brutalidade", name: "Brutalidade", description: "Força física bruta" },
        { id: "destreza", name: "Destreza", description: "Habilidade manual e coordenação" },
        { id: "agilidade", name: "Agilidade", description: "Velocidade e reflexos" },
        { id: "precisao", name: "Precisão", description: "Acurácia em ataques" },
        { id: "canalizacao", name: "Canalização", description: "Controle de energia mágica" },
        { id: "arcanismo", name: "Arcanismo", description: "Conhecimento das artes arcanas" },
        { id: "espirito", name: "Espírito", description: "Força de vontade e determinação" },
        { id: "vigor", name: "Vigor", description: "Resistência física e saúde" }
      ]
    },
    knowledge: {
      label: "Conhecimentos",
      totalPoints: 7,
      maxPerKnowledge: 2,
      list: [
        { id: "mistico", name: "Místico", description: "Conhecimento sobre magia e mistérios" },
        { id: "exploracao", name: "Exploração", description: "Sobrevivência e navegação" },
        { id: "historia", name: "História", description: "Conhecimento do passado" },
        { id: "religiao", name: "Religião", description: "Conhecimento sobre deuses e fé" },
        { id: "carisma", name: "Carisma", description: "Influência e liderança" },
        { id: "intuicao", name: "Intuição", description: "Percepção e instinto" },
        { id: "intimidacao", name: "Intimidação", description: "Capacidade de amedrontar" },
        { id: "vontade", name: "Vontade", description: "Resistência mental" },
        { id: "furtividade", name: "Furtividade", description: "Capacidade de se esconder" },
        { id: "performance", name: "Performance", description: "Habilidades artísticas" },
        { id: "percepcao", name: "Percepção", description: "Capacidade de notar detalhes" },
        { id: "tecnologia", name: "Tecnologia", description: "Conhecimento técnico e inventivo" }
      ]
    },
    skills: {
      initialCount: 2,
      available: [
        { id: "ataque_duplo", name: "Ataque Duplo", description: "Realize dois ataques em uma ação", combatPaths: ["guerreiro"] },
        { id: "tiro_certeiro", name: "Tiro Certeiro", description: "Aumente a precisão dos seus ataques à distância", combatPaths: ["atirador"] },
        { id: "missil_magico", name: "Míssil Mágico", description: "Dispare projéteis mágicos que sempre acertam", combatPaths: ["feiticeiro"] },
        { id: "golpe_sujo", name: "Golpe Sujo", description: "Ataque furtivo que causa dano extra", combatPaths: ["bucaneiro"] },
        { id: "defesa_aprimorada", name: "Defesa Aprimorada", description: "Aumente sua capacidade defensiva", combatPaths: ["guerreiro", "bucaneiro"] },
        { id: "tiro_multiplo", name: "Tiro Múltiplo", description: "Ataque múltiplos alvos à distância", combatPaths: ["atirador"] },
        { id: "escudo_magico", name: "Escudo Mágico", description: "Crie uma barreira mágica protetora", combatPaths: ["feiticeiro"] },
        { id: "esquiva_aprimorada", name: "Esquiva Aprimorada", description: "Melhore sua capacidade de esquiva", combatPaths: ["bucaneiro", "atirador"] }
      ]
    },
    resources: {
      baseHP: 30,
      baseEP: 5,
      hpFormula: "30 + 1d6 + Vigor",
      epFormula: "5",
      initialLanguages: ["comum"],
      initialEquipment: [
        { id: "roupas", name: "Conjunto de Roupas", quantity: 1 },
        { id: "bolsa", name: "Bolsa", quantity: 1 },
        { id: "algibeira", name: "Algibeira", quantity: 1 },
        { id: "cantil", name: "Cantil", quantity: 1 },
        { id: "saco_dormir", name: "Saco de Dormir", quantity: 1 },
        { id: "racoes", name: "Rações de Viagem", quantity: 3 },
        { id: "moedas_prata", name: "Moedas de Prata", quantity: 120 }
      ]
    }
  },
  dnd5e: {
    id: "dnd5e",
    name: "D&D 5ª Edição",
    identity: {
      legacyLabel: "Raça",
      legacyOptions: [
        { id: "humano", name: "Humano", description: "Versatilidade e adaptabilidade" },
        { id: "elfo", name: "Elfo", description: "Graciosidade e magia natural" },
        { id: "anao", name: "Anão", description: "Resistência e artesanato" },
        { id: "halfling", name: "Halfling", description: "Sorte e coragem" }
      ],
      combatPathLabel: "Classe",
      combatPathOptions: [
        { id: "guerreiro", name: "Guerreiro", description: "Mestre das armas e armaduras" },
        { id: "mago", name: "Mago", description: "Estudioso das artes arcanas" },
        { id: "ladino", name: "Ladino", description: "Especialista em furtividade e precisão" },
        { id: "clerigo", name: "Clérigo", description: "Servo dos deuses com poder divino" }
      ]
    },
    attributes: {
      label: "Atributos",
      totalPoints: 27,
      maxPerAttribute: 15,
      list: [
        { id: "forca", name: "Força", description: "Poder físico" },
        { id: "destreza", name: "Destreza", description: "Agilidade e reflexos" },
        { id: "constituicao", name: "Constituição", description: "Resistência e vitalidade" },
        { id: "inteligencia", name: "Inteligência", description: "Raciocínio e memória" },
        { id: "sabedoria", name: "Sabedoria", description: "Percepção e intuição" },
        { id: "carisma", name: "Carisma", description: "Força de personalidade" }
      ]
    },
    knowledge: {
      label: "Perícias",
      totalPoints: 4,
      maxPerKnowledge: 1,
      list: [
        { id: "atletismo", name: "Atletismo", description: "Atividades físicas" },
        { id: "acrobacia", name: "Acrobacia", description: "Equilíbrio e agilidade" },
        { id: "furtividade", name: "Furtividade", description: "Mover-se sem ser detectado" },
        { id: "percepcao", name: "Percepção", description: "Notar detalhes" }
      ]
    },
    skills: {
      initialCount: 2,
      available: [
        { id: "action_surge", name: "Surto de Ação", description: "Ação adicional em combate", combatPaths: ["guerreiro"] },
        { id: "sneak_attack", name: "Ataque Furtivo", description: "Dano extra em ataques surpresa", combatPaths: ["ladino"] },
        { id: "cantrips", name: "Truques", description: "Magias menores ilimitadas", combatPaths: ["mago", "clerigo"] }
      ]
    },
    resources: {
      baseHP: 8,
      baseEP: 0,
      hpFormula: "Classe + Constituição",
      epFormula: "N/A",
      initialLanguages: ["comum"],
      initialEquipment: [
        { id: "armadura_couro", name: "Armadura de Couro", quantity: 1 },
        { id: "espada_curta", name: "Espada Curta", quantity: 1 },
        { id: "kit_aventureiro", name: "Kit do Aventureiro", quantity: 1 }
      ]
    }
  }
}
