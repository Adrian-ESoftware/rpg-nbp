"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { User, Mail, Lock, Badge } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ThemedIcon from "@/components/svg/ThemedIcon"

export default function SignupPage() {
  const t = useTranslations("auth")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    // Simulate signup
    await new Promise((r) => setTimeout(r, 1200))
    if (!username || !email || !password) {
      setError(t("missingFields"))
      setLoading(false)
      return
    }
    // TODO: Replace with real signup logic
    setSuccess(t("signupSuccess"))
    setLoading(false)
    // Optionally redirect after success
    // window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-10 left-20 w-40 h-40 bg-primary/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-32 right-32 w-28 h-28 bg-accent/25 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-16 w-52 h-52 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute top-1/4 right-1/5 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-pulse delay-300"></div>
      <div className="absolute bottom-1/4 right-20 w-36 h-36 bg-accent/15 rounded-full blur-2xl animate-pulse delay-700"></div>
      <div className="absolute top-3/5 left-32 w-44 h-44 bg-secondary/12 rounded-full blur-2xl animate-pulse delay-200"></div>
      <div className="absolute top-1/6 left-1/3 w-20 h-20 bg-primary/18 rounded-full blur-lg animate-pulse delay-800"></div>
      <div className="absolute bottom-1/6 right-1/4 w-32 h-32 bg-accent/22 rounded-full blur-xl animate-pulse delay-400"></div>

      <div className="relative z-10 w-full max-w-md mx-auto sm:max-w-md sm:mx-auto h-screen sm:h-auto flex items-center">
        <Card className="shadow-2xl border-primary/20 bg-card/70 backdrop-blur-lg w-full h-full sm:h-auto flex flex-col justify-center">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-3xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
              <div className="p-4 flex justify-center items-center">
                <ThemedIcon />
              </div>
            </CardTitle>
            <span className="text-muted-foreground text-md py-2">{t("createAccountDescription")}</span>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="username">
                  <span className="flex items-center gap-2">
                    <Badge className="w-4 h-4" />
                    {t("username")}
                  </span>
                </label>
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="master389"
                  className="bg-card/30 border-border/60 focus:bg-card/50 focus:shadow-lg transition-all duration-300"
                  required
                  maxLength={50}
                />
              </div>
                            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="fullName">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t("fullName")}
                  </span>
                </label>
                <Input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder={"John Doe"}
                  className="bg-card/30 border-border/60 focus:bg-card/50 focus:shadow-lg transition-all duration-300"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t("email")}
                  </span>
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="test@email.com"
                  className="bg-card/30 border-border/60 focus:bg-card/50 focus:shadow-lg transition-all duration-300"
                  required
                  maxLength={255}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {t("password")}
                  </span>
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="********"
                  className="bg-card/30 border-border/60 focus:bg-card/50 focus:shadow-lg transition-all duration-300"
                  required
                  maxLength={255}
                />
              </div>
              {error && (
                <div className="text-destructive text-sm text-center">{error}</div>
              )}
              {success && (
                <div className="text-success text-sm text-center">{success}</div>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg rounded-xl"
                disabled={loading}
              >
                {loading ? t("loading") : t("createAccount")}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <a
                className="w-full text-primary transition-colors"
                href="/login"
              >
                {t("alreadyHaveAccount")}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}