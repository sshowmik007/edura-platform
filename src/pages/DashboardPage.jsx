import { useMemo, useState } from "react";
import { ArrowRight, Lock } from "lucide-react";

import { MODULES, TRACKS } from "../content";
import { Auth } from "../components/shared/learning/Auth";
import { Lesson } from "../components/shared/learning/Lesson";
import { Quiz } from "../components/shared/learning/Quiz";
import { doSave, loadProgress, loadUser } from "../shared/learning/storage";

import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Dashboard", icon: "dashboard", active: true },
  { label: "Curriculum", icon: "menu_book" },
  { label: "Students", icon: "group" },
  { label: "Analytics", icon: "analytics" },
];

const footerLinks = [
  { label: "Settings", icon: "settings" },
  { label: "Support", icon: "help" },
];

export default function DashboardPage() {
  const [user, setUser] = useState(loadUser);
  const [progress, setProgress] = useState(loadProgress);
  const [screen, setScreen] = useState("dashboard");
  const [curMod, setCurMod] = useState(null);

  const doneIds = useMemo(
    () => Object.keys(progress).filter((k) => progress[k]?.completed),
    [progress],
  );
  const avgScore = useMemo(() => {
    if (doneIds.length === 0) return "-";
    const total = doneIds.reduce(
      (sum, k) => sum + (progress[k]?.score || 0),
      0,
    );
    return `${Math.round(total / doneIds.length)}%`;
  }, [doneIds, progress]);

  const totalModules = useMemo(
    () => MODULES.filter((m) => m.lessons.length > 0).length,
    [],
  );
  const progressPct = totalModules
    ? Math.round((doneIds.length / totalModules) * 100)
    : 0;

  const orderedModules = useMemo(
    () =>
      MODULES.slice().sort((a, b) => {
        if (a.trackId === b.trackId) return a.order - b.order;
        return a.trackId.localeCompare(b.trackId);
      }),
    [],
  );
  const firstAvailableId = useMemo(() => {
    const next = orderedModules.find(
      (m) => m.lessons.length > 0 && !progress[m.id]?.completed,
    );
    return next?.id ?? orderedModules[0]?.id ?? null;
  }, [orderedModules, progress]);

  if (!user)
    return (
      <Auth
        onLogin={(u) => {
          setUser(u);
          setScreen("dashboard");
        }}
      />
    );

  if (screen === "lesson" && curMod)
    return (
      <Lesson
        mod={curMod}
        onBack={() => {
          setScreen("dashboard");
          setCurMod(null);
        }}
        onQuiz={() => setScreen("quiz")}
      />
    );

  if (screen === "quiz" && curMod)
    return (
      <Quiz
        mod={curMod}
        onBack={() => {
          setScreen("dashboard");
          setCurMod(null);
        }}
        onComplete={(score) => {
          const updated = {
            ...progress,
            [curMod.id]: { completed: true, score },
          };
          setProgress(updated);
          doSave(updated);
          setScreen("dashboard");
          setCurMod(null);
        }}
      />
    );

  const handleSelect = (mod) => {
    setCurMod(mod);
    setScreen("lesson");
  };

  return (
    <DashboardLayout
      navLinks={navLinks}
      footerLinks={footerLinks}
      onLogout={() => {
        setUser(null);
        localStorage.removeItem("edura-user");
      }}
    >
      <header className="mb-10">
        <div className="text-on-surface-variant mb-4 flex items-center space-x-2 text-sm">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-on-surface font-medium">{user.email}</span>
        </div>
        <h2 className="font-display text-secondary mb-3 text-5xl font-bold">
          Student Dashboard
        </h2>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
          Welcome back. You have one module ready to start in your foundation
          path.
        </p>
      </header>

      <section className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="bg-surface-container-low border-surface-container-high rounded-xl border">
          <CardContent className="p-6">
            <span className="text-on-surface-variant mb-4 block text-xs font-semibold uppercase tracking-widest">
              Modules Completed
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="font-ui-mono text-secondary text-4xl font-bold">
                {doneIds.length}
              </span>
              <span className="font-ui-mono text-on-surface-variant text-lg">
                /{totalModules}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-surface-container-low border-surface-container-high rounded-xl border">
          <CardContent className="p-6">
            <span className="text-on-surface-variant mb-4 block text-xs font-semibold uppercase tracking-widest">
              Avg Quiz Score
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="font-ui-mono text-secondary text-4xl font-bold">
                {avgScore}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-surface-container-low border-surface-container-high rounded-xl border">
          <CardContent className="p-6">
            <div className="mb-4 flex items-end justify-between">
              <span className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
                Total Progress
              </span>
              <span className="font-ui-mono text-primary text-lg font-bold">
                {progressPct}%
              </span>
            </div>
            <div className="bg-surface-container-high h-2.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {TRACKS.map((track) => {
        const mods = MODULES.filter((m) => m.trackId === track.id).sort(
          (a, b) => a.order - b.order,
        );
        return (
          <section key={track.id} className="mb-16">
            <div className="mb-8 flex items-center space-x-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold"
                style={{
                  background: `${track.color}20`,
                  color: track.color,
                }}
              >
                {track.icon}
              </div>
              <h3 className="text-secondary text-xl font-bold">{track.name}</h3>
            </div>
            <div className="relative pl-12">
              <div className="border-outline-variant/70 absolute bottom-4 left-[19px] top-4 w-0.5 border-l-2 border-dashed" />
              <div className="space-y-6">
                {mods.map((mod) => {
                  const has = mod.lessons.length > 0;
                  const completed = progress[mod.id]?.completed;
                  const isActive = mod.id === firstAvailableId;
                  return (
                    <div key={mod.id} className="relative group">
                      <div className="absolute -left-12 top-1/2 z-10 -translate-y-1/2">
                        {isActive ? (
                          <div className="bg-surface border-primary flex h-10 w-10 items-center justify-center rounded-full border-4">
                            <div className="bg-primary h-2.5 w-2.5 animate-pulse rounded-full" />
                          </div>
                        ) : (
                          <div className="bg-surface-container-low border-outline-variant/70 flex h-10 w-10 items-center justify-center rounded-full border-2">
                            <Lock className="text-on-surface-variant/60 h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <Card
                        className={cn(
                          "bg-surface-container-lowest ring-outline-variant/20 shadow-[0_10px_30px_rgba(26,28,27,0.06)] ring-1",
                          has ? "cursor-pointer" : "cursor-not-allowed"
                        )}
                        onClick={() => has && handleSelect(mod)}
                      >
                        <CardContent className="flex items-center justify-between px-7 py-3">
                          <div className="flex flex-1 items-center">
                            <div
                              className={
                                has
                                  ? "bg-primary mr-6 h-2.5 w-2.5 rounded-full shadow-[0_0_0_5px_rgba(42,157,143,0.18)]"
                                  : "bg-outline-variant/60 mr-6 h-2.5 w-2.5 rounded-full"
                              }
                            />
                            <div>
                              <h4
                                className={
                                  has
                                    ? "font-body text-secondary text-lg font-semibold"
                                    : "font-body text-on-surface-variant/70 text-lg font-semibold"
                                }
                              >
                                {mod.title}
                              </h4>
                              <p
                                className={
                                  has
                                    ? "text-on-surface-variant mt-0.5 text-sm"
                                    : "text-on-surface-variant/60 mt-0.5 text-sm"
                                }
                              >
                                {mod.description}
                              </p>
                            </div>
                          </div>
                          {has ? (
                            <Button
                              className="bg-primary text-white flex items-center rounded-sm px-7 py-5 text-sm font-semibold shadow-md transition-all hover:shadow-lg"
                              onClick={() => handleSelect(mod)}
                            >
                              {completed ? "Review" : "Start"}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="bg-surface-container-high text-on-surface-variant/70 rounded-sm px-4 py-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                            >
                              Coming soon
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <DashboardFooter />
      <div className="pointer-events-none fixed right-0 top-0 -z-10 h-1/2 w-1/3 bg-gradient-to-bl from-primary/5 to-transparent opacity-50 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-64 -z-10 h-64 w-64 rounded-full bg-tertiary/5 blur-3xl" />
    </DashboardLayout>
  );
}
