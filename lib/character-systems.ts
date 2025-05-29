import type { SystemConfiguration } from "@/types/character-creation"

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
