import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

BG, INK, MUT, ORG, GRN, RED = "#fcf9f0", "#1c1a17", "#7a756b", "#c8782e", "#2f8f5b", "#b5483a"
fig = plt.figure(figsize=(18, 14), facecolor=BG)
fig.text(.04, .955, "An agent's usefulness has a shape, and you can keep it high", fontsize=27, weight="bold", color=INK)
fig.text(.04, .925, "Without care the curve drifts down quietly. With pair coding, feedback and a regular check-up it keeps climbing.",
         fontsize=14.5, color=MUT)

ax = fig.add_axes([.07, .51, .90, .38], facecolor=BG)
x = np.linspace(0, 100, 600)
sig = lambda v, c, k: 1 / (1 + np.exp(-(v - c) / k))
base = .05 + .88 * sig(x, 20, 6)
drift = np.where(x > 45, base - (x - 45) * .0085, base)
rng = np.random.default_rng(3)
mature = .05 + .88 * sig(x, 20, 6) + np.where(x > 45, (x - 45) * .0016, 0)
checks = [50, 60, 70, 80, 90]
saw = mature.copy()
for i, c in enumerate(checks):
    seg = (x >= c - 10) & (x < c)
    saw[seg] -= .075 * (1 - (c - x[seg]) / 10) ** 1.2 * 1.0
saw = np.minimum(saw, .985)
ax.fill_between(x, drift, color=ORG, alpha=.12)
ax.plot(x, drift, color=RED, lw=4, ls="--", label="No maintenance: silent drift")
ax.plot(x, saw, color=GRN, lw=4.5, label="With pair coding + feedback + periodic check-up")
for a, b, t, col in [(0, 20, "LEARNING", ORG), (20, 45, "PLATEAU", MUT), (45, 100, "DRIFT RISK  vs  CONTINUOUS IMPROVEMENT", INK)]:
    ax.text((a + b) / 2, 1.04, t, ha="center", fontsize=14, weight="bold", color=col)
for v in (20, 45):
    ax.axvline(v, color="#a9a398", ls="--", lw=1.2)
for c in checks:
    ax.scatter([c], [np.interp(c, x, saw)], s=140, color=GRN, zorder=5, edgecolor=BG, lw=2)
ax.annotate("check-up: run evals,\nfix definition, re-baseline", (checks[1], np.interp(checks[1], x, saw)), (52, .3),
            fontsize=11.5, color=INK, arrowprops=dict(arrowstyle="-", color=INK))
ax.scatter([88], [np.interp(88, x, drift)], s=150, color=INK, zorder=6)
ax.annotate("where most teams\nfinally notice", (88, np.interp(88, x, drift)), (74, .27), fontsize=12, ha="center", color=INK,
            arrowprops=dict(arrowstyle="-", color=INK))
ev = [(4, "Aug 14\n4 agents\ncreated"), (13, "Sep 23\nfirst bug\n(FA-4889)"), (27, "Oct 27-29\nSupport Agent +\nfeature FA-4841"),
      (40, "Nov 2-5\nstanding auth.,\nack + closing rules")]
pos = {4: (7, .42), 13: (11, .66), 27: (33, .45), 40: (47, .6)}
for p, t in ev:
    ax.annotate(t, (p, np.interp(p, x, base)), pos[p], fontsize=10, color=MUT, ha="center",
                arrowprops=dict(arrowstyle="-", color="#c9c3b6"))
ax.set_ylim(0, 1.1); ax.set_xlim(0, 100); ax.set_yticks([]); ax.set_xticks([])
for s in ("top", "right"): ax.spines[s].set_visible(False)
ax.set_ylabel("Usefulness at its job", fontsize=14, color=INK)
ax.set_xlabel("Time the agent has been running  →", fontsize=14, color=INK, labelpad=6)
ax.legend(loc="lower right", frameon=False, fontsize=12.5)
fig.text(.07, .468, "Conceptual curve (shape per agent-drift literature). Milestone dates are real Multica events; heights are illustrative, not measured.",
         fontsize=9.5, color=MUT)


def card(x0, y0, w, h, col, title, lines):
    fig.patches.append(FancyBboxPatch((x0, y0), w, h, boxstyle="round,pad=0.004,rounding_size=.01", transform=fig.transFigure,
                                      fc="#fffdf7", ec=col, lw=2.2))
    fig.text(x0 + .012, y0 + h - .03, title, fontsize=15.5, weight="bold", color=col)
    for i, l in enumerate(lines):
        fig.text(x0 + .012, y0 + h - .068 - i * .0345, l, fontsize=11.3, color=INK)


card(.04, .06, .29, .38, ORG, "1 · What improves it", [
    "Pair coding: you and the agent fix a real case",
    "   together, then the lesson goes into its definition",
    "Feedback: requester says 'ya funciona' / you correct",
    "Learning loop: each solved case = new playbook entry",
    "Code review: Senior Reviewer catches regressions",
    "Guardrails: read-only PROD, ask when unsure",
    "Examples: playbooks 1-7 in Support Agent;",
    "   backend playbook learned on FA-4841",
])
card(.355, .06, .29, .38, GRN, "2 · How to stop the decline", [
    "Weekly: read 5 random runs end to end (traces)",
    "Monthly: re-run a golden set of past tickets",
    "   (e.g. FA-4889, FA-5379) and compare to baseline",
    "Re-baseline after any model, tool or prompt change",
    "Watch the 4 drifts: goal, context, reasoning, tool",
    "Alert if a metric drops over 10% vs baseline",
    "Prune: keep definitions short, remove stale rules",
    "Version the definition in git (Multica shows only latest)",
])
card(.67, .06, .29, .38, "#3b6fb5", "3 · How to measure it", [
    "Task success rate: runs completed / total",
    "   today 3,334 of 3,594 = 92.8%, failed 213, cancelled 47",
    "Rework rate: cases you had to correct",
    "Time to resolve: issue created to done",
    "Tool-call accuracy: right query, right table",
    "Human approvals needed per case (should fall)",
    "Cost: runs and tokens per resolved ticket",
    "Sources: Multica runs/issues, CloudWatch, Jira",
])
fig.text(.04, .028, "Research basis: drift types, evals, traces, human feedback and rework-rate metrics from Confident AI, Collibra, NVIDIA, UptimeRobot and "
         "dev.to agent-drift guides. Shape inspired by the reference chart you supplied.", fontsize=9.5, color=MUT)
fig.savefig("images/efficiency_over_time.png", dpi=100, facecolor=BG)
