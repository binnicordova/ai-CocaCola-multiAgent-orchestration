import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
from PIL import Image, ImageDraw, ImageFont

BG, CARD, FG, MUT = "#0b0f1a", "#141b2d", "#e6edf7", "#8b97b3"
FONT = "/System/Library/Fonts/Apple Color Emoji.ttc"


def emoji(ch):
    im = Image.new("RGBA", (200, 200), (0, 0, 0, 0))
    ImageDraw.Draw(im).text((100, 100), ch, font=ImageFont.truetype(FONT, 160), embedded_color=True, anchor="mm")
    return np.asarray(im)


W, H = 26, 15
fig = plt.figure(figsize=(W, H), facecolor=BG)
ax = fig.add_axes([0, 0, 1, 1]); ax.set_xlim(0, W); ax.set_ylim(0, H); ax.axis("off")


def box(x, y, w, h, ec="#243049", fc=CARD, lw=1.5, a=1):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=.3", fc=fc, ec=ec, lw=lw, alpha=a))


def em(x, y, ch, z=.4):
    ax.add_artist(AnnotationBbox(OffsetImage(emoji(ch), zoom=z), (x, y), frameon=False))


def t(x, y, s, **k):
    k.setdefault("color", FG); k.setdefault("va", "center"); k.setdefault("ha", "center")
    ax.text(x, y, s, **k)


def arrow(x1, y1, x2, y2, col):
    ax.annotate("", (x2, y2), (x1, y1), arrowprops=dict(arrowstyle="-|>", color=col, lw=2.6, mutation_scale=22))


t(W / 2, 14.2, "Meet the Product Team: 5 AI specialists + you", fontsize=30, weight="bold")
t(W / 2, 13.5, "One Jira ticket in, a reviewed and tested delivery out. Each agent has one job and hands off to the next", fontsize=15, color=MUT)

flow = [("🎫", "Jira ticket\n(bug or feature)", "#38bdf8"), ("🦉", "Plan\n& tech design", "#34d399"),
        ("🐱 🦝", "Build\napp + backend", "#fbbf24"), ("🐺", "Review\nevery PR", "#c084fc"),
        ("🐞", "Test\nwith evidence", "#f472b6"), ("🦊", "Binni approves\n& merges", "#60a5fa")]
for i, (ch, lab, col) in enumerate(flow):
    x = 2.2 + i * 4.3
    if " " in ch:
        em(x - .4, 11.0, ch.split()[0], .42); em(x + .4, 11.0, ch.split()[1], .42)
    else:
        em(x, 11.0, ch, .5)
    t(x, 9.9, lab, fontsize=12.5, weight="bold", color=col)
    if i < 5:
        arrow(x + 1.0, 11.0, x + 3.2, 11.0, col)

cards = [
    ("🦉", "Ticket Delivery Analyst", "the planner · squad leader", "#34d399",
     ["Reads the ticket + screenshots", "Checks dependencies with evidence", "Writes the Tech Design", "Delegates, unblocks, reports"]),
    ("🐱", "Mobile Engineer", "the app builder", "#fbbf24",
     ["Builds screens in React Native", "Tests on a real device (ADB)", "Opens the PR", "Requests a review at once"]),
    ("🦝", "Cloud Engineer", "the backend builder", "#f87171",
     ["Builds Lambda + GraphQL APIs", "Reads CloudWatch to find causes", "Keeps changes backward compatible", "Opens PRs per environment"]),
    ("🐺", "Senior Code Reviewer", "the quality gate", "#c084fc",
     ["Hunts code smells", "Checks RN and Lambda practices", "Flags out-of-scope changes", "Comments; humans merge"]),
    ("🐞", "QA Engineer", "the evidence collector", "#f472b6",
     ["Builds a test matrix", "Uses real data, never invented", "Tests layer by layer", "Reports what passed or failed"]),
]
for i, (ch, name, role, col, steps) in enumerate(cards):
    x = .6 + i * 5.0
    box(x, 2.45, 4.7, 6.9, ec=col, lw=2.2)
    ax.add_patch(FancyBboxPatch((x, 8.0), 4.7, 1.35, boxstyle="round,pad=0.02,rounding_size=.3", fc=col, ec=col, alpha=.25))
    em(x + .7, 8.68, ch, .36)
    t(x + 1.3, 8.9, name, fontsize=12.5, weight="bold", ha="left")
    t(x + 1.3, 8.4, role, fontsize=10.5, color=MUT, ha="left")
    for j, st in enumerate(steps):
        yy = 7.0 - j * 1.2
        ax.add_patch(plt.Circle((x + .5, yy), .24, color=col))
        t(x + .5, yy, str(j + 1), color="#0b0f1a", fontsize=11, weight="bold")
        t(x + .95, yy, st, fontsize=11, ha="left")
        if j < 3:
            arrow(x + .5, yy - .27, x + .5, yy - .93, col)
    arrow(2.2 + (i + 1) * 4.3 - 4.3 if False else 2.2 + min(i + 1, 4) * 4.3 * 0 + x + 2.35 - x, 9.5, x + 2.35, 9.4, col) if False else None

box(.6, .35, 24.8, 1.7, ec="#a78bfa", lw=2)
t(2.6, 1.2, "Glue", fontsize=16, weight="bold", color="#a78bfa")
g = [("🧭", "Mika + Multica issues track every handoff"), ("🔒", "Read-only on AWS and PROD by default"),
     ("🙋‍♂️", "Humans approve posts and merges"), ("📚", "Lessons are written back into each definition")]
for i, (ch, st) in enumerate(g):
    gx = 4.6 + i * 5.3
    em(gx, 1.2, ch, .26); t(gx + .5, 1.2, st, fontsize=10.5, ha="left")

fig.savefig("images/team_agents_overview.png", dpi=85, facecolor=BG)
