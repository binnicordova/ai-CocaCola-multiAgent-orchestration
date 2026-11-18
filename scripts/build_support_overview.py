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


W, H = 24, 15
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


t(W / 2, 14.2, "Meet the Support Agent: your Teams support teammate", fontsize=30, weight="bold")
t(W / 2, 13.5, "It works while Binni is busy, follows written playbooks, and asks before anything risky", fontsize=15, color=MUT)

# flow: request -> agent -> triage
em(1.6, 10.9, "🙋", .55); t(1.6, 9.8, "Someone asks\nin a Teams chat", fontsize=13, weight="bold")
t(1.6, 9.0, "AR · BR · CL · PY", fontsize=10.5, color=MUT)
arrow(2.9, 10.9, 4.3, 10.9, "#60a5fa")
em(5.7, 10.9, "⏰", .5); t(5.7, 9.85, "Checks the chats\nevery 5 minutes", fontsize=13, weight="bold")
arrow(7.1, 10.9, 8.5, 10.9, "#fbbf24")
em(10.0, 10.9, "🦸", .6); t(10.0, 9.8, "Support Agent", fontsize=14, weight="bold", color="#34d399")
t(10.0, 9.2, "opens 1 ticket, says 'Revisando…'", fontsize=10.5, color=MUT)
arrow(11.6, 10.9, 13.0, 10.9, "#34d399")
em(14.4, 10.9, "🧭", .5); t(14.4, 9.85, "Triage:\nwhat kind of request?", fontsize=13, weight="bold")

# three lanes
lanes = [
    ("1", "🧑‍💼", "Create / update a seller", "~38 tickets · most common", "#34d399",
     ["Look up the user in the database", "Build the file, upload it to SharePoint", "Ask the sync team to run it", "Verify, thank them, answer, close"]),
    ("2", "🗺️", "Change zones / routes", "~27 tickets · second", "#fbbf24",
     ["Read the current zone setup", "Save a backup copy", "Open a Jira ticket for the owner", "Notify them, validate, reply"]),
    ("3", "🔍", "Investigate a failure", "login · order · price/SKU · ~18", "#f87171",
     ["Collect evidence: logs, user, data", "Separate confirmed from assumed", "Explain the cause in the chat's language", "Hand app bugs to the dev agents"]),
]
x0 = 1.0
for i, (n, ch, title, sub, col, steps) in enumerate(lanes):
    x = x0 + i * 7.6
    box(x, 2.45, 7.1, 5.85, ec=col, lw=2.2)
    ax.add_patch(FancyBboxPatch((x, 7.2), 7.1, 1.1, boxstyle="round,pad=0.02,rounding_size=.3", fc=col, ec=col, alpha=.25))
    em(x + .75, 7.75, ch, .36)
    t(x + 1.5, 7.95, f"TOP {n} · {title}", fontsize=14.5, weight="bold", ha="left")
    t(x + 1.5, 7.5, sub, fontsize=10.5, color=MUT, ha="left")
    for j, s in enumerate(steps):
        yy = 6.4 - j * 1.0
        ax.add_patch(plt.Circle((x + .6, yy), .24, color=col))
        t(x + .6, yy, str(j + 1), color="#0b0f1a", fontsize=11, weight="bold")
        t(x + 1.1, yy, s, fontsize=12.5, ha="left")
        if j < 3:
            arrow(x + .6, yy - .27, x + .6, yy - .73, col)
    arrow(14.4 if False else 14.4, 9.15, x + 3.55, 8.4, col) if False else None
for i, (_, _, _, _, col, _) in enumerate(lanes):
    arrow(14.4 - (1 - i) * 0.0, 9.1, 1.0 + i * 7.6 + 3.55, 8.4, col)

# guardrails
box(1.0, .35, 21.7, 1.7, ec="#a78bfa", lw=2)
t(3.1, 1.2, "Guardrails", fontsize=16, weight="bold", color="#a78bfa")
g = [("🔒", "Production is read-only"), ("🙋‍♂️", "Asks Binni when unsure"), ("🧾", "Never invents data"), ("📚", "Each case feeds a playbook")]
for i, (ch, s) in enumerate(g):
    gx = 5.6 + i * 4.3
    em(gx, 1.2, ch, .26); t(gx + .5, 1.2, s, fontsize=11.5, ha="left")

fig.savefig("images/support_agent_overview.png", dpi=90, facecolor=BG)
