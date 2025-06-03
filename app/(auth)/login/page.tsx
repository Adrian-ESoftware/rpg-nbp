"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { Lock, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ThemedIcon from "@/components/svg/ThemedIcon"

export default function LoginPage() {
  const t = useTranslations("auth")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // Simulate login
    await new Promise((r) => setTimeout(r, 1200))
    if (!email || !password) {
      setError(t("missingFields"))
      setLoading(false)
      return
    }
    // TODO: Replace with real authentication logic
    if (email === "demo@rpg.com" && password === "demo") {
      window.location.href = "/dash"
    } else {
      setError(t("invalidCredentials"))
      setLoading(false)
    }
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

    <div className="relative z-10 w-full max-w-md mx-auto">
      <Card className="shadow-2xl border-primary/20 bg-card/70 backdrop-blur-lg">
        <CardHeader className="pb-2 text-center">
        <CardTitle className="text-3xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
          <div className="p-4 flex justify-center items-center">
            <ThemedIcon />
          </div>
        </CardTitle>
        <span className="text-muted-foreground text-md py-2">{t("loginDescription")}</span>
        </CardHeader>
        <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {t("email")}
            </span>
            </label>
            <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={"test@email.com"}
            className="bg-card/30 border-border/60 focus:bg-card/50 focus:shadow-lg transition-all duration-300"
            required
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
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={"********"}
            className="bg-card/30 border-border/60 focus:bg-card/50 focus:shadow-lg transition-all duration-300"
            required
            />
          </div>
          {error && (
            <div className="text-destructive text-sm text-center">{error}</div>
          )}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg rounded-xl"
              disabled={loading}
            >
              {loading ? t("loading") : t("loginButton")}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border border-border/60 bg-background/80 hover:bg-background/90 transition-all duration-300 py-3 text-lg rounded-xl"
              disabled={loading}
              onClick={() => {
                setLoading(true)
                window.location.href = "/api/auth/google"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
              </svg>
              {t("loginWithGoogle")}
            </Button>
        </form>
        <div className="mt-4 text-center">
          <a
            className="w-full text-primary transition-colors"
            href="/signup"
          >
            {t("notHaveAccount")}
          </a>
        </div>
        <div className="mt-6 text-center text-muted-foreground text-sm">
          <a
            href="/forgot-password"
            className="text-primary hover:underline transition-colors"
          >
            {t("forgotPassword")}
          </a>
        </div>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}