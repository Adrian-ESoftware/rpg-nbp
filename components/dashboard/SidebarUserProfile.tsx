import React from "react"
import { SidebarFooter } from "@/components/ui/sidebar"
import { User } from "lucide-react"

const SidebarUserProfile: React.FC = () => (
  <SidebarFooter
    className="!bg-gray-950 border-t border-yellow-900/30"
    style={{ backgroundColor: "#1f2937" }}
  >
    <div className="p-6 flex justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 mx-auto mb-2 flex items-center justify-center shadow-lg">
          <User className="w-6 h-6 text-gray-100" />
        </div>
        <p className="text-sm text-gray-100">Gabriel</p>
        <p className="text-xs text-emerald-400">Mestre de Jogo</p>
      </div>
    </div>
  </SidebarFooter>
)

export default SidebarUserProfile
