import React from "react"
import { SidebarFooter } from "@/components/ui/sidebar"
import { User } from "lucide-react"

const SidebarUserProfile: React.FC = () => (
  <SidebarFooter className="!bg-sidebar border-t border-sidebar-border">
    <div className="p-6 flex justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 mx-auto mb-2 flex items-center justify-center shadow-lg">
          <User className="w-6 h-6 text-primary-foreground" />
        </div>
        <p className="text-sm text-foreground select-none">Gabriel</p>
        <p className="text-xs text-primary font-semibold select-none">Mestre de Jogo</p>
      </div>
    </div>
  </SidebarFooter>
)

export default SidebarUserProfile