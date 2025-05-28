"use client";

import { useTranslations } from "next-intl";

export default function CreateCharacter() {
  const t = useTranslations("createCharacter");
  const tCommon = useTranslations("common");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">{t("title")}</h1>
        <p className="text-muted-foreground">
          {t("developmentMessage")}
        </p>
      </div>
    </div>
  );
}
