import { Card, CardContent } from "@/components/ui/card";

function StatCard({ label, children }) {
  return (
    <Card className="bg-surface-container-low border-surface-container-high rounded-xl border">
      <CardContent className="p-6">
        <span className="text-on-surface-variant mb-4 block text-xs font-semibold uppercase tracking-widest">
          {label}
        </span>
        {children}
      </CardContent>
    </Card>
  );
}

export default function DashboardStatsSection({
  doneCount,
  totalModules,
  avgScore,
  progressPct,
}) {
  return (
    <section className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatCard label="Modules Completed">
        <div className="flex items-baseline gap-1">
          <span className="font-ui-mono text-secondary text-4xl font-bold">
            {doneCount}
          </span>
          <span className="font-ui-mono text-on-surface-variant text-lg">
            /{totalModules}
          </span>
        </div>
      </StatCard>
      <StatCard label="Avg Quiz Score">
        <div className="flex items-baseline gap-1">
          <span className="font-ui-mono text-secondary text-4xl font-bold">
            {avgScore}
          </span>
        </div>
      </StatCard>
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
  );
}
