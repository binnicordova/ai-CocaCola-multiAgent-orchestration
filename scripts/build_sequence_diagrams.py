import matplotlib
matplotlib.use("Agg")
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
from PIL import Image, ImageDraw, ImageFont

BG, FG, MUT = "#0b0f1a", "#e6edf7", "#8b97b3"
FONT = "/System/Library/Fonts/Apple Color Emoji.ttc"

def emoji_img(ch):
    f = ImageFont.truetype(FONT, 160)
    im = Image.new("RGBA", (200, 200), (0, 0, 0, 0))
    ImageDraw.Draw(im).text((100, 100), ch, font=f, embedded_color=True, anchor="mm")
    return np.asarray(im)

# key: (emoji, name, role/kind, color)
A = {
    "binni": ("🦊", "Binni", "human · owner", "#60a5fa"),
    "jira": ("🎫", "Jira", "ticket", "#38bdf8"),
    "ana": ("🦉", "Delivery Analyst", "agent", "#34d399"),
    "conf": ("📄", "Confluence", "tech design", "#a3e635"),
    "mob": ("🐱", "Mobile Engineer", "agent", "#fbbf24"),
    "cloud": ("🦝", "Cloud Engineer", "agent", "#f87171"),
    "cw": ("☁️", "CloudWatch / AWS MCP", "logs", "#fb923c"),
    "gh": ("🐙", "GitHub", "PRs", "#a78bfa"),
    "rev": ("🐺", "Code Reviewer", "agent", "#c084fc"),
    "qa": ("🐞", "QA Engineer", "agent", "#f472b6"),
    "teams": ("💬", "Teams", "chat", "#22d3ee"),
}
ORDER = list(A)

def diagram(fname, title, sub, msgs):
    n = len(ORDER); dx = 2.5
    W = n * dx + 1; step = .95
    H = 3.6 + len(msgs) * step + .8
    fig = plt.figure(figsize=(W, H), facecolor=BG)
    ax = fig.add_axes([0, 0, 1, 1]); ax.set_xlim(0, W); ax.set_ylim(0, H); ax.axis("off")
    X = {k: .5 + dx / 2 + i * dx for i, k in enumerate(ORDER)}
    top = H - 2.2
    ax.text(W / 2, H - .5, title, color=FG, fontsize=26, weight="bold", ha="center", va="center")
    ax.text(W / 2, H - 1.1, sub, color=MUT, fontsize=13, ha="center", va="center")
    bottom = .5
    for k in ORDER:
        em, name, kind, col = A[k]
        ax.plot([X[k], X[k]], [top - .6, bottom], color=col, lw=1.2, ls=(0, (4, 4)), alpha=.5, zorder=0)
        ax.add_artist(AnnotationBbox(OffsetImage(emoji_img(em), zoom=.36), (X[k], top + .05), frameon=False))
        ax.text(X[k], top - .45, name, color=col, fontsize=10.5, weight="bold", ha="center", va="center")
    y = top - 1.2
    for m in msgs:
        if m[0] == "note":
            _, k1, k2, txt, col = m
            x1, x2 = X[k1] - 1.0, X[k2] + 1.0
            ax.add_patch(plt.Rectangle((x1, y - .3), x2 - x1, .6, fc=col, ec=col, alpha=.18, zorder=1))
            ax.text((x1 + x2) / 2, y, txt, color=FG, fontsize=11.5, weight="bold", ha="center", va="center", zorder=2)
        else:
            a, b, txt, num = m
            col = A[a][3]
            if a == b:
                ax.annotate("", (X[a] + .08, y - .25), (X[a] + .08, y + .25), arrowprops=dict(arrowstyle="->", color=col, lw=2, connectionstyle="arc3,rad=-1.6"))
                ax.text(X[a] + .75, y, txt, color=FG, fontsize=11, va="center", ha="left")
            else:
                ax.annotate("", (X[b], y), (X[a], y), arrowprops=dict(arrowstyle="-|>", color=col, lw=2, mutation_scale=16))
                ax.text((X[a] + X[b]) / 2, y + .27, txt, color=FG, fontsize=11, ha="center", va="center",
                        bbox=dict(fc=BG, ec="none", pad=1.5), zorder=3)
            ax.add_patch(plt.Circle((X[a] if a != b else X[a], y), .0, color=col))
            ax.text(.3, y, str(num), color=col, fontsize=10, ha="center", va="center", weight="bold")
        y -= step
    fig.savefig(fname, dpi=100, facecolor=BG)
    plt.close(fig)

bug = [
    ("note", "binni", "jira", "1 · REPORT", "#60a5fa"),
    ("binni", "jira", "FA-4889: offline order stuck", 1),
    ("jira", "ana", "ticket + screenshots (COC-37)", 2),
    ("ana", "ana", "analyze, widen bug context", 3),
    ("note", "ana", "gh", "2 · APP FIX (Sep 23 – Oct 1)", "#fbbf24"),
    ("ana", "mob", "delegate fix (COC-44)", 4),
    ("mob", "gh", "PRs #264 #268 #287 #289", 5),
    ("gh", "rev", "review request", 6),
    ("rev", "gh", "comments / approve", 7),
    ("note", "ana", "cw", "3 · ROOT CAUSE IN BACKEND (Nov 12)", "#f87171"),
    ("ana", "cloud", "backend suspected (COC-184)", 8),
    ("cloud", "cw", "query logs of 4 offline orders", 9),
    ("cw", "cloud", "erpMeasureUnitId ≠ erpUnitMeasure", 10),
    ("cloud", "gh", "fix PRs: testing·staging·master·develop", 11),
    ("note", "cloud", "teams", "4 · VERIFY & REPORT", "#f472b6"),
    ("cloud", "qa", "validate on QA", 12),
    ("qa", "jira", "evidence comment", 13),
    ("qa", "teams", "sync with team", 14),
    ("binni", "gh", "human approves + merges", 15),
]
feat = [
    ("note", "binni", "jira", "1 · SPEC", "#60a5fa"),
    ("binni", "jira", "FA-4841: sales trend card", 1),
    ("jira", "ana", "story + criteria", 2),
    ("ana", "conf", "write Tech Design (source of truth)", 3),
    ("note", "ana", "cloud", "2 · PARALLEL BUILD (contract-first)", "#34d399"),
    ("ana", "mob", "COC-79: card + flags per country", 4),
    ("ana", "cloud", "COC-94: lambda + GraphQL query", 5),
    ("mob", "mob", "builds against mock", 6),
    ("cloud", "gh", "backend PR #555", 7),
    ("mob", "gh", "mobile PR #330", 8),
    ("note", "gh", "rev", "3 · REVIEW", "#c084fc"),
    ("gh", "rev", "review (COC-95, COC-96)", 9),
    ("rev", "gh", "comments / approve", 10),
    ("note", "mob", "teams", "4 · INTEGRATE & ROLLOUT", "#f472b6"),
    ("mob", "mob", "switch mock off", 11),
    ("qa", "jira", "test with real clients, handoff", 12),
    ("qa", "teams", "ask SMP service owners", 13),
    ("binni", "jira", "PO adjusts scope, release via flags", 14),
]
diagram("images/sequence_01_bug-FA-4889.png", "Bug sequence · FA-4889",
        "Actors: human, agents and tools · investigation-driven, loops until evidence validates the fix", bug)
diagram("images/sequence_02_feature-FA-4841.png", "Feature sequence · FA-4841",
        "Actors: human, agents and tools · spec-driven, mobile and backend built in parallel", feat)
