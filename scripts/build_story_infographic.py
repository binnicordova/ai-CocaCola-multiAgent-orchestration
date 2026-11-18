import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

BG, CARD, FG, MUT = "#0b0f1a", "#141b2d", "#e6edf7", "#8b97b3"
C = {"Delivery Analyst": "#34d399", "Mobile Engineer": "#fbbf24", "Cloud Engineer": "#f87171",
     "Code Reviewer": "#a78bfa", "QA Engineer": "#f472b6", "Support Agent": "#22d3ee", "Human (Binni)": "#60a5fa"}
W, H = 22, 30
fig = plt.figure(figsize=(W, H), facecolor=BG)
ax = fig.add_axes([0, 0, 1, 1]); ax.set_xlim(0, W); ax.set_ylim(0, H); ax.axis("off")

def box(x, y, w, h, fc=CARD, ec="#243049", lw=1.2):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=.25", fc=fc, ec=ec, lw=lw))
def t(x, y, s, **k):
    k.setdefault("color", FG); k.setdefault("va", "center"); ax.text(x, y, s, **k)
def chip(x, y, label, w=3.6):
    box(x, y - .3, w, .6, fc=C[label], ec=C[label]); t(x + w / 2, y, label, color="#0b0f1a", fontsize=12.5, weight="bold", ha="center")

t(W / 2, 29.1, "How AI agents attend a Bug vs. a Feature", fontsize=34, weight="bold", ha="center")
t(W / 2, 28.3, "Multica agents + MCP ecosystem working on real Jira tickets  ·  solo-company development model", fontsize=16, color=MUT, ha="center")

def column(x, title, sub, col, tid, steps, agents):
    box(x, 15.2, 10.4, 12.2)
    ax.add_patch(FancyBboxPatch((x, 26.2), 10.4, 1.2, boxstyle="round,pad=0.02,rounding_size=.25", fc=col, ec=col, alpha=.3))
    t(x + .4, 26.95, title, fontsize=22, weight="bold"); t(x + .4, 26.45, sub, fontsize=12.5, color=MUT)
    y = 25.4
    for d, who, txt in steps:
        ax.add_patch(plt.Circle((x + .6, y), .22, color=col)); t(x + .6, y, str(steps.index((d, who, txt)) + 1), color="#0b0f1a", fontsize=11, weight="bold", ha="center")
        t(x + 1.1, y + .18, f"{d}  ·  {who}", fontsize=12.5, weight="bold", color=col)
        t(x + 1.1, y - .32, txt, fontsize=11.5, linespacing=1.4)
        y -= 1.45

column(.5, "BUG  ·  FA-4889 (offline order stuck)", "Sep 23 → Nov 12  ·  7 weeks, many iterations", "#f87171", "bug", [
    ("Sep 23", "Delivery Analyst", "Reads the Jira ticket + screenshots,\nwidens bug context, writes analysis"),
    ("Sep 23", "Mobile Engineer", "Reproduces and fixes the app side\n(timeout, retry, offline queue)"),
    ("Sep 23-Oct 1", "Code Reviewer", "Reviews 4 mobile PRs (#264, #268,\n#287, #289) before human merge"),
    ("Nov 12", "Cloud Engineer", "Root cause in backend via CloudWatch:\nfield mismatch broke the event record"),
    ("Nov 12", "QA + Reviewer", "Replays 4 orders on QA, 4 PRs across\nenvironments; reports back in Jira"),
    ("Loop", "Human (Binni)", "Approves, merges, answers business\nquestions; ticket reopens if evidence fails")], [])
column(11.1, "FEATURE  ·  FA-4841 (Sales trend card)", "Oct 29 → Nov 12  ·  planned, spec-driven", "#34d399", "feat", [
    ("Start", "Delivery Analyst", "Turns the story into a Tech Design\n(source of truth) in Confluence"),
    ("Oct 29", "Mobile Engineer", "Builds card (extended/compact) + country\nfeature flags against a mocked contract"),
    ("Nov 2", "Cloud Engineer", "Builds lambda mk-getTendenciaVenta +\nGraphQL query, backward compatible"),
    ("Nov 2", "Code Reviewer", "Reviews backend PR #555 and\nmobile PR #330"),
    ("Nov", "QA + Human", "Mock switched off, tested with real\nclients per country; PO adjusts scope"),
    ("Nov", "Release", "Feature flag rollout AR / BR / CL / PY")], [])

for x, names in ((.5, ["Delivery Analyst", "Mobile Engineer", "Cloud Engineer", "Code Reviewer", "QA Engineer", "Human (Binni)"]),
                 (11.1, ["Delivery Analyst", "Mobile Engineer", "Cloud Engineer", "Code Reviewer", "QA Engineer", "Human (Binni)"])):
    for i, n in enumerate(names):
        chip(x + .3 + (i % 3) * 3.4, 15.3 + 0 if False else 16.0 - (i // 3) * .75 + .0, n, 3.2) if False else None
    for i, n in enumerate(names):
        cx = x + .3 + (i % 3) * 3.4; cy = 16.5 - (i // 3) * .7 - .0
        box(cx, cy - .27, 3.2, .54, fc=C[n], ec=C[n]); t(cx + 1.6, cy, n, color="#0b0f1a", fontsize=11, weight="bold", ha="center")

# comparison
box(.5, 8.6, 21, 6.2)
t(W / 2, 14.3, "Bug vs. Feature: what changes and where agents help", fontsize=20, weight="bold", ha="center")
rows = [("", "BUG", "FEATURE"),
        ("Starting point", "Symptom + evidence (screens, logs). Cause unknown", "Business story + acceptance criteria. Design known"),
        ("Main effort", "Investigate: reproduce, read logs, find root cause", "Design + build: contract, UI, flags, tests"),
        ("Risk", "Wrong diagnosis, fix that hides cause, regressions", "Scope drift, missed countries, contract mismatch"),
        ("Agent superpower", "Cross-checks logs vs. data in minutes (CloudWatch, Dynamo)", "Parallel work: mobile and backend built at once from one design"),
        ("Human role", "Validates diagnosis and decides the fix", "Owns scope, product decisions, release")]
ys = [13.5, 12.6, 11.7, 10.8, 9.9, 9.0]
for (a, b, c), y in zip(rows, ys):
    hdr = a == ""
    t(.9, y, a, fontsize=12.5, weight="bold", color=MUT)
    t(5.0, y, b, fontsize=12.5 if not hdr else 15, weight="bold" if hdr else "normal", color="#f87171" if hdr else FG)
    t(13.0, y, c, fontsize=12.5 if not hdr else 15, weight="bold" if hdr else "normal", color="#34d399" if hdr else FG)

# ecosystem
box(.5, .8, 21, 7.4)
t(W / 2, 7.65, "The ecosystem around the agents", fontsize=20, weight="bold", ha="center")
cx, cy = 11, 3.9
box(cx - 2.2, cy - .9, 4.4, 1.8, fc="#1d4ed8", ec="#60a5fa"); ax.patches[-1].set_zorder(3); t(cx, cy + .3, "Multica", fontsize=17, weight="bold", ha="center", zorder=4)
t(cx, cy - .35, "issues · agents · squad\nautopilots · runtime", fontsize=10.5, ha="center", color="#dbeafe", zorder=4)
nodes = [(3.1, 6.2, "Jira", "tickets, comments,\nscreenshots (via browser)", "#60a5fa"),
         (8.2, 6.5, "Confluence", "Tech Design =\nsource of truth", "#34d399"),
         (13.8, 6.5, "GitHub", "branches, PRs,\ncode review (gh CLI)", "#a78bfa"),
         (18.9, 6.2, "Microsoft Teams", "support chats, sync asks\n(browser; MCP pending approval)", "#22d3ee"),
         (3.1, 1.9, "AWS CloudWatch MCP", "logs, metrics, alarms\ndev / qa / stg / prod", "#f87171"),
         (8.2, 1.5, "AWS API MCP", "read-only checks:\nDynamo, Lambda, S3", "#fbbf24"),
         (13.8, 1.5, "Bitrise MCP", "app builds, install\npages for QA", "#f472b6"),
         (18.9, 1.9, "Chrome DevTools MCP", "drives logged-in web\napps, screenshots", "#fb923c")]
for x, y, n, d, col in nodes:
    ax.plot([cx, x], [cy, y], color=col, lw=1.4, alpha=.55, zorder=0)
    box(x - 2.2, y - .62, 4.4, 1.24, fc=CARD, ec=col, lw=2); ax.patches[-1].set_zorder(3)
    t(x, y + .27, n, fontsize=12, weight="bold", ha="center", color=col, zorder=4); t(x, y - .2, d, fontsize=9.3, ha="center", color=FG, zorder=4, linespacing=1.25)

t(.5, .4, "Illustrative summary built from Multica issues (COC-37..49, 79, 94-96, 162, 184-187), Jira tickets FA-4889 / FA-4841 / FA-5379 and the MCP servers configured on the runtime.",
  fontsize=9.5, color=MUT)
fig.savefig("images/story_bug-vs-feature-ecosystem.png", dpi=110, facecolor=BG)
