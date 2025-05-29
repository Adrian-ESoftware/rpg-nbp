"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dice6 } from 'lucide-react';
import { useRPGSystem } from '@/hooks/use-rpg-system';

interface SystemSelectorProps {
  selectedSystemId: string;
  onSystemChange: (systemId: string) => void;
}

export function SystemSelector({ selectedSystemId, onSystemChange }: SystemSelectorProps) {
  const { availableSystems, system, t } = useRPGSystem(selectedSystemId);

  return (
    <Card className="w-full shadow-lg border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 justify-center text-xl">
          <Dice6 className="w-6 h-6 text-primary" />
          <span>Sistema de RPG</span>
        </CardTitle>
        <CardDescription className="text-center text-base">
          Escolha o sistema para seu personagem
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedSystemId} onValueChange={onSystemChange}>
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Selecione um sistema..." />
          </SelectTrigger>
          <SelectContent>
            {availableSystems.map((sys) => (
              <SelectItem key={sys.id} value={sys.id}>
                {sys.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {system && (
          <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{t(system.name)}</h4>
              <Badge variant="outline">v{system.version}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{t(system.description)}</p>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-medium">Raças:</span> {system.races.length}
              </div>
              <div>
                <span className="font-medium">Classes:</span> {system.classes.length}
              </div>
              <div>
                <span className="font-medium">Atributos:</span> {system.attributes.list.length}
              </div>
              <div>
                <span className="font-medium">Perícias:</span> {system.skills.list.length}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
