"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Shield, Dice6, Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CharacterImageUpload } from "@/components/character/CharacterImageUpload";
import { CharacterIdentityForm } from "@/components/character/CharacterIdentityForm";
import { AttributeDistribution } from "@/components/character/AttributeDistribution";
import { CharacterSummary } from "@/components/character/CharacterSummary";
import { systemConfigurations } from "@/lib/character-systems";
import type { CharacterData, SystemConfiguration } from "@/types/character-creation";

export default function CreateCharacterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations("createCharacter");
  const tValidation = useTranslations("validation");

  const [selectedSystem, setSelectedSystem] = useState<string>("gaia");
  const [systemConfig, setSystemConfig] = useState<SystemConfiguration>(
    systemConfigurations.gaia
  );
  const [characterData, setCharacterData] = useState<CharacterData>({
    name: "",
    background: "",
    legacy: "",
    combatPath: "",
    attributes: {},
    knowledge: {},
    skills: [],
    hitPoints: 30,
    energyPoints: 5,
    languages: ["comum"],
    equipment: [],
    imageUrl: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const config = systemConfigurations[selectedSystem as keyof typeof systemConfigurations];
    if (config) {
      setSystemConfig(config);
      setCharacterData({
        name: "",
        background: "",
        legacy: "",
        combatPath: "",
        attributes: {},
        knowledge: {},
        skills: [],
        hitPoints: config.resources.baseHP,
        energyPoints: config.resources.baseEP,
        languages: [...config.resources.initialLanguages],
        equipment: [...config.resources.initialEquipment],
        imageUrl: undefined,
      });
    }
  }, [selectedSystem]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!characterData.name.trim()) {
      newErrors.name = tValidation("characterNameRequired");
    }

    if (!characterData.legacy) {
      newErrors.legacy = tValidation("legacyRequired");
    }

    if (!characterData.combatPath) {
      newErrors.combatPath = tValidation("combatPathRequired");
    }

    // Validate attribute distribution
    const attributePoints = Object.values(characterData.attributes).reduce(
      (sum, val) => sum + (val || 0),
      0
    );
    if (attributePoints !== systemConfig.attributes.totalPoints) {
      newErrors.attributes = tValidation("attributePointsRequired", {
        points: systemConfig.attributes.totalPoints,
      });
    }

    // Validate knowledge distribution
    const knowledgePoints = Object.values(characterData.knowledge).reduce(
      (sum, val) => sum + (val || 0),
      0
    );
    if (knowledgePoints !== systemConfig.knowledge.totalPoints) {
      newErrors.knowledge = tValidation("knowledgePointsRequired", {
        points: systemConfig.knowledge.totalPoints,
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateHitPoints = (): number => {
    const vigorBonus = characterData.attributes.vigor || 0;
    const diceRoll = Math.floor(Math.random() * 6) + 1; // Simulate 1d6
    return systemConfig.resources.baseHP + diceRoll + vigorBonus;
  };

  const handleInputChange = (field: string, value: any) => {
    setCharacterData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleAttributeChange = (attributes: Record<string, number>) => {
    setCharacterData((prev) => ({ ...prev, attributes }));
    if (errors.attributes) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.attributes;
        return newErrors;
      });
    }
  };

  const handleKnowledgeChange = (knowledge: Record<string, number>) => {
    setCharacterData((prev) => ({ ...prev, knowledge }));
    if (errors.knowledge) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.knowledge;
        return newErrors;
      });
    }
  };

  const handleSkillChange = (skills: string[]) => {
    setCharacterData((prev) => ({ ...prev, skills }));
    if (errors.skills) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.skills;
        return newErrors;
      });
    }
  };

  const handleImageChange = (imageUrl: string | null) => {
    setCharacterData((prev) => ({ ...prev, imageUrl: imageUrl || undefined }));
  };

  const handleCreateCharacter = async () => {
    if (!validateForm()) {
      toast({
        title: tValidation("validationError"),
        description: tValidation("validationErrorDescription"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate final HP
      const finalHP = calculateHitPoints();
      const finalCharacter = { ...characterData, hitPoints: finalHP };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Criando personagem:", finalCharacter);

      toast({
        title: t("successMessage"),
        description: t("successDescription", { name: characterData.name }),
      });

      // Redirect to character sheet or dashboard
      router.push("/dash");
    } catch (error) {
      toast({
        title: tValidation("createError"),
        description: tValidation("createErrorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Changed max-width to full and added responsive padding */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6 max-w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                {t("title")}
              </h1>
              <p className="text-lg text-muted-foreground">{t("description")}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid - Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Left Column: Character Identity */}
          <div className="lg:col-span-1 flex">
            <Card className="shadow-lg border-primary/20 h-full w-full">
              <CharacterIdentityForm
                characterData={characterData}
                systemConfig={systemConfig}
                errors={errors}
                onInputChange={handleInputChange}
              />
            </Card>
          </div>

          {/* Center Column: System Selection & Character Image */}
          <div className="lg:col-span-1 flex flex-col items-center space-y-8">
            {/* Applied max-w-lg to the card for system selection */}
            <Card className="w-full max-w-lg mx-auto shadow-lg border-2 border-primary/20">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 justify-center text-xl">
                  <Dice6 className="w-6 h-6 text-primary" />
                  <span>{t("systemSelection")}</span>
                </CardTitle>
                <CardDescription className="text-center text-base">
                  {t("systemSelectionDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <Label className="text-base font-medium">{t("rpgSystem")}</Label>
                  <Select
                    value={selectedSystem}
                    onValueChange={setSelectedSystem}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gaia">Gaia: O Prelúdio</SelectItem>
                      <SelectItem value="dnd5e">D&D 5ª Edição</SelectItem>
                      <SelectItem value="pathfinder">Pathfinder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            {/* Applied max-w-lg to the image upload container */}
            <div className="w-full max-w-lg mx-auto mt-auto"> 
              <CharacterImageUpload
                imageUrl={characterData.imageUrl}
                onImageChange={handleImageChange}
                characterName={characterData.name}
              />
            </div>
          </div>

          {/* Right Column: Character Summary */}
          <div className="lg:col-span-1 flex">
            <div className="lg:sticky lg:top-6 w-full">
              <Card className="shadow-lg border-primary/20 h-full w-full">
                <CharacterSummary
                  characterData={characterData}
                  systemConfig={systemConfig}
                  isSubmitting={isSubmitting}
                  onCreateCharacter={handleCreateCharacter}
                />
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom Section - Attributes and Knowledge */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Attributes */}
          <Card className="shadow-lg border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Wand2 className="w-6 h-6 text-primary" />
                <span>{systemConfig.attributes.label}</span>
              </CardTitle>
              <CardDescription className="text-base">
                {t("attributesDescription", {
                  points: systemConfig.attributes.totalPoints,
                  max: systemConfig.attributes.maxPerAttribute,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <AttributeDistribution
                attributes={systemConfig.attributes.list}
                values={characterData.attributes}
                onChange={handleAttributeChange}
                totalPoints={systemConfig.attributes.totalPoints}
                maxPerAttribute={systemConfig.attributes.maxPerAttribute}
                error={errors.attributes}
              />
            </CardContent>
          </Card>

          {/* Knowledge */}
          <Card className="shadow-lg border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Wand2 className="w-6 h-6 text-primary" />
                <span>{systemConfig.knowledge.label}</span>
              </CardTitle>
              <CardDescription className="text-base">
                {t("knowledgeDescription", {
                  points: systemConfig.knowledge.totalPoints,
                  max: systemConfig.knowledge.maxPerKnowledge,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <AttributeDistribution
                attributes={systemConfig.knowledge.list}
                values={characterData.knowledge}
                onChange={handleKnowledgeChange}
                totalPoints={systemConfig.knowledge.totalPoints}
                maxPerAttribute={systemConfig.knowledge.maxPerKnowledge}
                error={errors.knowledge}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
