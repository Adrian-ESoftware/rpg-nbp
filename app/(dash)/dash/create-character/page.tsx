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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background - usando cores do tema */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-muted"></div>
      
      {/* Floating Elements - usando cores do tema */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-accent/30 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-primary/15 rounded-full blur-xl animate-pulse delay-700"></div>
      <div className="absolute bottom-40 right-10 w-36 h-36 bg-accent/20 rounded-full blur-2xl animate-pulse delay-300"></div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6 max-w-full">
          {/* Header */}
          <div className="mb-8 text-center pt-8">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
              {t("title")}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Main Content Grid - Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Left Column: Character Identity */}
            <div className="lg:col-span-1 flex">
              <div className="transform hover:scale-[1.01] transition-all duration-300 w-full">
                <Card className="shadow-lg border-primary/20 h-full w-full bg-card/70 backdrop-blur-sm">
                  <CharacterIdentityForm
                    characterData={characterData}
                    system={system}
                    errors={errors}
                    onInputChange={handleInputChange}
                    tSystem={tSystem}
                  />
                </Card>
              </div>
            </div>

            {/* Center Column: System Selection & Character Image */}
            <div className="lg:col-span-1 flex flex-col items-center space-y-8">
              <div className="w-full max-w-lg mx-auto transform hover:scale-[1.02] transition-all duration-300">
                <SystemSelector
                  selectedSystemId={selectedSystem}
                  onSystemChange={setSelectedSystem}
                />
              </div>
              <div className="w-full max-w-lg mx-auto mt-auto transform hover:scale-[1.01] transition-all duration-300"> 
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
                <div className="transform hover:scale-[1.01] transition-all duration-300">
                  <Card className="shadow-lg border-primary/20 h-full w-full bg-card/70 backdrop-blur-sm">
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
          </div>

          {/* Bottom Section - Attributes and Skills */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
            {/* Attributes */}
            <div className="transform hover:scale-[1.01] transition-all duration-300">
              <Card className="shadow-lg border-primary/20 bg-card/70 backdrop-blur-sm h-[600px] flex flex-col">
                <CardHeader className="pb-4 bg-card/40 backdrop-blur-xl border-b border-border/60 shadow-lg">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <Wand2 className="w-6 h-6 text-primary drop-shadow-lg" />
                    <span>{tSystem(system.attributes.label)}</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t("attributesDescription", {
                      points: system.attributes.totalPoints,
                      max: system.attributes.maxPerAttribute ?? 0,
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 bg-card/20 backdrop-blur-2xl p-6 overflow-y-auto">
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
            </div>

            {/* Skills */}
            <div className="transform hover:scale-[1.01] transition-all duration-300">
              <Card className="shadow-lg border-primary/20 bg-card/70 backdrop-blur-sm h-[600px] flex flex-col">
                <CardHeader className="pb-4 bg-card/40 backdrop-blur-xl border-b border-border/60 shadow-lg">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <Wand2 className="w-6 h-6 text-primary drop-shadow-lg" />
                    <span>{tSystem(system.skills.label)}</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {system.skills.totalPoints ? t("knowledgeDescription", {
                      points: system.skills.totalPoints,
                      max: 2,
                    }) : t("skillsDescription", { count: system.skills.selectionCount || 4 })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 bg-card/20 backdrop-blur-2xl p-6 overflow-y-auto">
                  <AttributeDistribution
                    attributes={system.skills.list}
                    values={characterData.skills || {}}
                    onChange={handleSkillsChange}
                    totalPoints={system.skills.totalPoints || 0}
                    maxPerAttribute={2}
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
      </div>
    </div>
  );
}
