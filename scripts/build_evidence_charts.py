import json, collections as C, datetime as dt, subprocess, os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.dates as md

OUT = "images"
BG, FG, GRID = "#0b0f1a", "#e6edf7", "#243049"
PAL = ["#22d3ee", "#a78bfa", "#34d399", "#fbbf24", "#f87171", "#60a5fa", "#f472b6"]
plt.rcParams.update({"figure.facecolor": BG, "axes.facecolor": BG, "savefig.facecolor": BG,
    "text.color": FG, "axes.labelcolor": FG, "xtick.color": FG, "ytick.color": FG,
    "axes.edgecolor": GRID, "font.size": 12, "axes.titlesize": 16, "axes.titleweight": "bold"})

def P(s): return dt.datetime.fromisoformat(s.replace("Z", "+00:00")).replace(tzinfo=None)
def style(ax):
    ax.grid(color=GRID, lw=.6, alpha=.8); ax.set_axisbelow(True)
    for s in ("top", "right"): ax.spines[s].set_visible(False)
def save(fig, name, foot="Source: Multica workspace API (agents, runs, issues). Titles/names omitted for privacy."):
    fig.text(.01, .01, foot, fontsize=8, color="#7d8aa5")
    fig.savefig(f"{OUT}/{name}", dpi=160, bbox_inches="tight"); plt.close(fig)

runs = json.load(open(".work/runs.json"))
issues = json.load(open(".work/i0.json"))["issues"] + json.load(open(".work/i100.json"))["issues"]
agents = json.loads(subprocess.check_output([os.environ["MULTICA_CLI_PATH"], "agent", "list", "--output", "json"]))
order = ["Support Agent", "Senior Code Reviewer", "Ticket Delivery Analyst", "Mobile Engineer", "Cloud Engineer", "Mika", "QA Engineer"]
col = dict(zip(order, PAL))

def wk(d): return dt.datetime.combine(d.date() - dt.timedelta(days=d.weekday()), dt.time())

# 1. weekly runs stacked
weeks = C.defaultdict(lambda: C.Counter())
for r in runs:
    if r["created_at"]: weeks[wk(P(r["created_at"]))][r["agent"]] += 1
ws = sorted(weeks); fig, ax = plt.subplots(figsize=(13, 6.5)); bottom = [0] * len(ws)
for a in order:
    v = [weeks[w][a] for w in ws]; ax.bar(ws, v, 6, bottom=bottom, label=a, color=col[a])
    bottom = [b + x for b, x in zip(bottom, v)]
ax.set_title("Agent runs per week: the team ramping up"); ax.set_ylabel("Runs"); style(ax)
ax.xaxis.set_major_formatter(md.DateFormatter("%b %d")); ax.legend(frameon=False, ncol=4, loc="upper left")
save(fig, "evidence_01_weekly-agent-runs.png")

# 2. cumulative runs and issues
fig, ax = plt.subplots(figsize=(13, 6.5))
rd = sorted(P(r["created_at"]) for r in runs if r["created_at"]); idt = sorted(P(i["created_at"]) for i in issues)
ax.plot(rd, range(1, len(rd) + 1), color=PAL[0], lw=3, label=f"Agent runs ({len(rd):,})")
ax.set_ylabel("Cumulative runs", color=PAL[0]); style(ax)
ax2 = ax.twinx(); ax2.plot(idt, range(1, len(idt) + 1), color=PAL[3], lw=3, label=f"Issues created ({len(idt)})")
ax2.set_ylabel("Cumulative issues", color=PAL[3]); ax2.spines["top"].set_visible(False)
ax.set_title("Growth over time: cumulative runs and issues"); ax.xaxis.set_major_formatter(md.DateFormatter("%b %d"))
h1, l1 = ax.get_legend_handles_labels(); h2, l2 = ax2.get_legend_handles_labels(); ax.legend(h1 + h2, l1 + l2, frameon=False, loc="upper left")
save(fig, "evidence_02_cumulative-growth.png")

# 3. agent definition size (instructions chars) + age
rows = sorted([(a["name"], len(a["instructions"] or ""), P(a["created_at"])) for a in agents if a["name"] != "Mika"], key=lambda x: x[1])
fig, ax = plt.subplots(figsize=(13, 6))
ax.barh([r[0] for r in rows], [r[1] for r in rows], color=[col[r[0]] for r in rows])
for i, r in enumerate(rows): ax.text(r[1] + 300, i, f"{r[1]:,} chars  (since {r[2]:%b %d})", va="center", fontsize=11)
ax.set_xlim(0, max(r[1] for r in rows) * 1.35); ax.set_title("Agent definitions today: instruction size per agent"); style(ax)
ax.set_xlabel("Characters of instructions (refined through pair-coding sessions)")
save(fig, "evidence_03_agent-definition-size.png")

# 4. outcomes per agent
fig, ax = plt.subplots(figsize=(13, 6.5)); cnt = C.defaultdict(C.Counter)
for r in runs: cnt[r["agent"]][r["status"]] += 1
names = sorted(order, key=lambda n: sum(cnt[n].values())); left = [0] * len(names)
for s, c in (("completed", "#34d399"), ("failed", "#f87171"), ("cancelled", "#fbbf24"), ("running", "#60a5fa")):
    v = [cnt[n][s] for n in names]; ax.barh(names, v, left=left, color=c, label=s); left = [l + x for l, x in zip(left, v)]
for i, n in enumerate(names):
    t = sum(cnt[n].values()); ax.text(t + 15, i, f"{t:,}  ({cnt[n]['completed'] / t:.0%} completed)", va="center", fontsize=11)
ax.set_xlim(0, max(left) * 1.3); ax.set_title("Run outcomes per agent"); style(ax); ax.legend(frameon=False, loc="lower right")
save(fig, "evidence_04_run-outcomes.png")

# 5. issues: monthly created + status
fig, (a1, a2) = plt.subplots(1, 2, figsize=(14, 6), gridspec_kw={"width_ratios": [1.2, 1]})
m = C.Counter(P(i["created_at"]).strftime("%Y-%m") for i in issues); ks = sorted(m)
a1.bar([dt.datetime.strptime(k, "%Y-%m").strftime("%b %Y") for k in ks], [m[k] for k in ks], color=PAL[1])
for i, k in enumerate(ks): a1.text(i, m[k] + 1, m[k], ha="center")
a1.set_title("Issues created per month"); style(a1)
s = C.Counter(i["status"] for i in issues); lab = list(s)
a2.pie([s[k] for k in lab], labels=[f"{k} ({s[k]})" for k in lab], colors=PAL, startangle=90, wedgeprops={"width": .45, "edgecolor": BG}, textprops={"color": FG, "fontsize": 11})
a2.set_title(f"Issue status ({len(issues)} total)")
save(fig, "evidence_05_issues-overview.png")

# 6. timeline
ev = [("2026-08-11", "Workspace + Mika", 1.0), ("2026-08-14", "Specialist agents\n+ Product Team squad", -.6),
      ("2026-08-17", "Code Reviewer\n+ PR autopilot", 1.9), ("2026-10-27", "Support Agent", 1.0),
      ("2026-10-28", "Support chats\nautopilot (15 min)", -.6), ("2026-10-30", "Teams PR-review\nautopilot (30 min)", 1.9)]
fig, ax = plt.subplots(figsize=(14, 6)); ax.axhline(0, color=GRID, lw=3)
for i, (d, t, y) in enumerate(ev):
    x = dt.datetime.fromisoformat(d)
    ax.plot([x, x], [0, y], color=PAL[i], lw=2); ax.scatter([x], [0], s=140, color=PAL[i], zorder=3)
    ax.text(x, y + (.08 if y > 0 else -.08), f"{x:%b %d}\n{t}", ha="center", va="bottom" if y > 0 else "top", fontsize=11, color=FG)
ax.set_ylim(-1.8, 3.0); ax.set_xlim(dt.datetime(2026, 7, 20), dt.datetime(2026, 11, 20)); ax.axis("off")
ax.set_title("Timeline: from one agent to an autonomous solo-company team")
save(fig, "evidence_00_timeline.png")

print(len(runs), len(issues))
