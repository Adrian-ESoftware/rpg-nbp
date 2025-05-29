"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Shield, Dice6, Wand2, Package, CheckCircle } from "lucide-react";
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
import { SkillSelection } from "@/components/character/SkillSelection";
import { EquipmentDisplay } from "@/components/character/EquipmentDisplay";
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

    // Validate skills
    if (characterData.skills.length < systemConfig.skills.initialCount) {
      newErrors.skills = tValidation("skillsRequired", {
        count: systemConfig.skills.initialCount,
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
      <div className="container mx-auto px-4 py-6 max-w-[1600px]">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t("title")}
              </h1>
              <p className="text-muted-foreground">{t("description")}</p>
            </div>
          </div>
        </div>

        {/* System Selection */}
        <div className="mb-8">
          <Card className="max-w-md mx-auto shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 justify-center">
                <Dice6 className="w-5 h-5 text-primary" />
                <span>{t("systemSelection")}</span>
              </CardTitle>
              <CardDescription className="text-center">
                {t("systemSelectionDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>{t("rpgSystem")}</Label>
                <Select
                  value={selectedSystem}
                  onValueChange={setSelectedSystem}
                >
                  <SelectTrigger>
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
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Character Identity */}
          <div className="lg:col-span-3 space-y-6">
            <CharacterIdentityForm
              characterData={characterData}
              systemConfig={systemConfig}
              errors={errors}
              onInputChange={handleInputChange}
            />
          </div>

          {/* Center Column - Character Image */}
          <div className="lg:col-span-6 flex flex-col items-center justify-start space-y-6">
            <CharacterImageUpload
              imageUrl={characterData.imageUrl}
              onImageChange={handleImageChange}
              characterName={characterData.name}
            />

            {/* Character Summary for mobile */}
            <div className="lg:hidden w-full max-w-md">
              <CharacterSummary
                characterData={characterData}
                systemConfig={systemConfig}
                isSubmitting={isSubmitting}
                onCreateCharacter={handleCreateCharacter}
              />
            </div>
          </div>

          {/* Right Column - Character Summary (Desktop) */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-6">
              <CharacterSummary
                characterData={characterData}
                systemConfig={systemConfig}
                isSubmitting={isSubmitting}
                onCreateCharacter={handleCreateCharacter}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section - Attributes, Knowledge, Skills, Equipment */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Attributes */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wand2 className="w-5 h-5 text-primary" />
                <span>{systemConfig.attributes.label}</span>
              </CardTitle>
              <CardDescription>
                {t("attributesDescription", {
                  points: systemConfig.attributes.totalPoints,
                  max: systemConfig.attributes.maxPerAttribute,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
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
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wand2 className="w-5 h-5 text-primary" />
                <span>{systemConfig.knowledge.label}</span>
              </CardTitle>
              <CardDescription>
                {t("knowledgeDescription", {
                  points: systemConfig.knowledge.totalPoints,
                  max: systemConfig.knowledge.maxPerKnowledge,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
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

          {/* Skills */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>{t("skills")}</span>
              </CardTitle>
              <CardDescription>
                {t("skillsDescription", {
                  count: systemConfig.skills.initialCount,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkillSelection
                availableSkills={systemConfig.skills.available}
                selectedSkills={characterData.skills}
                onChange={handleSkillChange}
                maxSelection={systemConfig.skills.initialCount}
                combatPath={characterData.combatPath}
                error={errors.skills}
              />
            </CardContent>
          </Card>

          {/* Equipment */}
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-primary" />
                <span>{t("initialEquipment")}</span>
              </CardTitle>
              <CardDescription>
                {t("equipmentDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EquipmentDisplay equipment={characterData.equipment} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
