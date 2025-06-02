"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dice6 } from 'lucide-react';
import { useRPGSystem } from '@/hooks/use-rpg-system';

interface SystemSelectorProps {
  selectedSystemId: string;
  onSystemChange: (systemId: string) => void;
}

export function SystemSelector({ selectedSystemId, onSystemChange }: SystemSelectorProps) {
  const t = useTranslations('createCharacter');
  const { availableSystems, system, t: tSystem } = useRPGSystem(selectedSystemId);

  // Calcular altura dinâmica baseada na quantidade de sistemas
  const getSelectHeight = () => {
    const systemCount = availableSystems.length;
    if (systemCount <= 3) return "h-[120px]";
    if (systemCount <= 5) return "h-[180px]";
    return "h-[200px]";
  };

  return (
    <Card className="w-full shadow-2xl border-primary/30 bg-card/50">
      <CardContent className="space-y-4 bg-card/40 p-6">
        {/* Title Section */}
        <div className="space-y-2 mb-6 text-center">
          <div className="flex items-center space-x-3 justify-center">
            <Dice6 className="w-6 h-6 text-primary drop-shadow-lg" />
            <h2 className="text-xl font-semibold">{t('systemSelection')}</h2>
          </div>
          <p className="text-base text-muted-foreground">
            {t('systemSelectionDescription')}
          </p>
        </div>

        <Select value={selectedSystemId} onValueChange={onSystemChange}>
          <SelectTrigger className="h-12 text-base bg-card/30 border-border/60 hover:bg-card/50 focus:shadow-lg transition-all duration-300 shadow-md">
            <SelectValue placeholder={t('selectSystem')} />
          </SelectTrigger>
          <SelectContent className="bg-card border-border shadow-2xl">
            <ScrollArea className={getSelectHeight()}>
              <div className="p-1">
                {availableSystems.map((sys) => (
                  <SelectItem 
                    key={sys.id} 
                    value={sys.id} 
                    className="hover:bg-muted/60 focus:bg-muted/60 hover:text-foreground focus:text-foreground rounded-md my-1 cursor-pointer"
                  >
                    <div className="flex flex-col text-left w-full">
                      <span className="font-medium">{tSystem(sys.name)}</span>
                      <span className="text-xs text-muted-foreground truncate">
                        {tSystem(sys.description)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </div>
            </ScrollArea>
          </SelectContent>
        </Select>

        {system && (
          <div className="space-y-3 p-4 bg-muted/20 rounded-lg border border-border/60 shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{tSystem(system.name)}</h4>
              <Badge variant="outline" className="bg-card/50 border-border/50 shadow-md">
                v{system.version}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{tSystem(system.description)}</p>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-medium">{t('legacy')}:</span> {system.races.length}
              </div>
              <div>
                <span className="font-medium">{t('combatPath')}:</span> {system.classes.length}
              </div>
              <div>
                <span className="font-medium">{tSystem(system.attributes.label)}:</span> {system.attributes.list.length}
              </div>
              <div>
                <span className="font-medium">{tSystem(system.skills.label)}:</span> {system.skills.list.length}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
