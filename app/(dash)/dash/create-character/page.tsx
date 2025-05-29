"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Shield, Wand2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CharacterImageUpload } from "@/components/character/CharacterImageUpload";
import { CharacterIdentityForm } from "@/components/character/CharacterIdentityForm";
import { AttributeDistribution } from "@/components/character/AttributeDistribution";
import { CharacterSummary } from "@/components/character/CharacterSummary";
import { SystemSelector } from "@/components/character/SystemSelector";
import { useRPGSystem } from "@/hooks/use-rpg-system";
import type { CharacterSheet } from "@/types/rpg-systems";

export default function CreateCharacterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations("createCharacter");
  const tValidation = useTranslations("validation");

  const [selectedSystem, setSelectedSystem] = useState<string>("gaia");
  const { system, t: tSystem } = useRPGSystem(selectedSystem);
  
  const [characterData, setCharacterData] = useState<Partial<CharacterSheet>>({
    systemId: selectedSystem,
    name: "",
    background: "",
    race: "",
    class: "",
    level: 1,
    attributes: {},
    skills: {},
    languages: [],
    equipment: [],
    imageUrl: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (system) {
      setCharacterData({
        systemId: selectedSystem,
        name: "",
        background: "",
        race: "",
        class: "",
        level: 1,
        attributes: {},
        skills: {},
        languages: [...system.resources.languages],
        equipment: [...system.resources.equipment],
        imageUrl: undefined,
        hitPoints: { current: system.resources.hitPoints.base, max: system.resources.hitPoints.base },
        secondaryResource: system.resources.secondaryResource ? {
          current: system.resources.secondaryResource.base,
          max: system.resources.secondaryResource.base
        } : undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }, [selectedSystem, system]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!characterData.name?.trim()) {
      newErrors.name = tValidation("characterNameRequired");
    }

    if (!characterData.race) {
      newErrors.race = tValidation("legacyRequired");
    }

    if (!characterData.class) {
      newErrors.class = tValidation("combatPathRequired");
    }

    if (system) {
      // Validate attribute distribution
      const attributePoints = Object.values(characterData.attributes || {}).reduce(
        (sum, val) => sum + (val || 0),
        0
      );
      if (attributePoints !== system.attributes.totalPoints) {
        newErrors.attributes = tValidation("attributePointsRequired", {
          points: system.attributes.totalPoints,
        });
      }

      // Validate skills distribution
      if (system.skills.totalPoints) {
        const skillPoints = Object.values(characterData.skills || {}).reduce(
          (sum, val) => sum + (val || 0),
          0
        );
        if (skillPoints !== system.skills.totalPoints) {
          newErrors.skills = tValidation("knowledgePointsRequired", {
            points: system.skills.totalPoints,
          });
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSkillsChange = (skills: Record<string, number>) => {
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Criando personagem:", characterData);

      toast({
        title: t("successMessage"),
        description: t("successDescription", { name: characterData.name ?? "" }),
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

  if (!system) {
    return <div>Carregando sistema...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
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
                system={system}
                errors={errors}
                onInputChange={handleInputChange}
                tSystem={tSystem}
              />
            </Card>
          </div>

          {/* Center Column: System Selection & Character Image */}
          <div className="lg:col-span-1 flex flex-col items-center space-y-8">
            <div className="w-full max-w-lg mx-auto">
              <SystemSelector
                selectedSystemId={selectedSystem}
                onSystemChange={setSelectedSystem}
              />
            </div>
            <div className="w-full max-w-lg mx-auto mt-auto"> 
              <CharacterImageUpload
                imageUrl={characterData.imageUrl}
                onImageChange={handleImageChange}
                characterName={characterData.name || ""}
              />
            </div>
          </div>

          {/* Right Column: Character Summary */}
          <div className="lg:col-span-1 flex">
            <div className="lg:sticky lg:top-6 w-full">
              <Card className="shadow-lg border-primary/20 h-full w-full">
                <CharacterSummary
                  characterData={characterData}
                  system={system}
                  isSubmitting={isSubmitting}
                  onCreateCharacter={handleCreateCharacter}
                  tSystem={tSystem}
                />
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom Section - Attributes and Skills */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Attributes */}
          <Card className="shadow-lg border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Wand2 className="w-6 h-6 text-primary" />
                <span>{tSystem(system.attributes.label)}</span>
              </CardTitle>
              <CardDescription className="text-base">
                {t("attributesDescription", {
                  points: system.attributes.totalPoints,
                  max: system.attributes.maxPerAttribute ?? 0,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <AttributeDistribution
                attributes={system.attributes.list}
                values={characterData.attributes || {}}
                onChange={handleAttributeChange}
                totalPoints={system.attributes.totalPoints}
                maxPerAttribute={system.attributes.maxPerAttribute || 10}
                error={errors.attributes}
                systemId={selectedSystem}
                sectionLabel={tSystem(system.attributes.label)}
              />
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="shadow-lg border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Wand2 className="w-6 h-6 text-primary" />
                <span>{tSystem(system.skills.label)}</span>
              </CardTitle>
              <CardDescription className="text-base">
                {system.skills.totalPoints ? t("knowledgeDescription", {
                  points: system.skills.totalPoints,
                  max: 2, // ou algum valor do sistema
                }) : t("skillsDescription", { count: system.skills.selectionCount || 4 })}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <AttributeDistribution
                attributes={system.skills.list}
                values={characterData.skills || {}}
                onChange={handleSkillsChange}
                totalPoints={system.skills.totalPoints || 0}
                maxPerAttribute={2} // ou algum valor do sistema
                error={errors.skills}
                systemId={selectedSystem}
                isKnowledge={true}
                sectionLabel={tSystem(system.skills.label)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
