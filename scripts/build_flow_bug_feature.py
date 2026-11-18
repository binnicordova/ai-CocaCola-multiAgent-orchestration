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


W, H = 26, 16
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


t(W / 2, 15.2, "Dos flujos, mismos agentes: Bug vs. Feature", fontsize=30, weight="bold")
t(W / 2, 14.5, "El bug es una investigacion que vuelve en ciclo hasta tener evidencia. La feature es un diseno que se construye en paralelo", fontsize=14, color=MUT)

def lane(y0, col, title, sub, nodes, loop=None):
    box(.5, y0, 25, 6.3, ec=col, lw=2.4)
    ax.add_patch(FancyBboxPatch((.5, y0 + 5.2), 25, 1.1, boxstyle="round,pad=0.02,rounding_size=.3", fc=col, ec=col, alpha=.25))
    t(1.0, y0 + 5.75, title, fontsize=20, weight="bold", ha="left")
    t(9.0, y0 + 5.75, sub, fontsize=12.5, color=MUT, ha="left")
    n = len(nodes); step = 24 / n
    for i, (ch, name, desc, c) in enumerate(nodes):
        x = 1.5 + step * i + step / 2 - .5
        yc = y0 + 3.3
        if isinstance(ch, tuple):
            em(x - .45, yc + .7, ch[0], .38); em(x + .45, yc + .7, ch[1], .38)
        else:
            em(x, yc + .7, ch, .46)
        t(x, yc - .35, name, fontsize=12, weight="bold", color=c)
        t(x, yc - 1.15, desc, fontsize=10.2, color=FG, linespacing=1.35)
        if i < n - 1:
            arrow(x + 1.25, yc + .7, x + step - 1.25, yc + .7, col)
    if loop:
        a, b, label = loop
        xa = 1.5 + step * a + step / 2 - .5; xb = 1.5 + step * b + step / 2 - .5
        ax.annotate("", (xb, y0 + .8), (xa, y0 + .8), arrowprops=dict(arrowstyle="-|>", color="#fbbf24", lw=2.2, ls="--", mutation_scale=18))
        t((xa + xb) / 2, y0 + .4, label, fontsize=11.5, color="#fbbf24")

bug = [("🎫", "1. Reporte", "Ticket Jira con\nsintoma y capturas", "#38bdf8"),
       ("🦉", "2. Analiza", "Delivery Analyst:\nreproduce y acota\nel contexto", "#34d399"),
       ("🦝", "3. Causa raiz", "Cloud Engineer:\nlogs de CloudWatch\nvs. datos", "#f87171"),
       (("🐱", "🦝"), "4. Fix minimo", "Mobile / Cloud:\ncorreccion pequena,\ncompatible", "#fbbf24"),
       ("🐺", "5. Revision", "Code Reviewer:\nrevisa cada PR", "#c084fc"),
       ("🐞", "6. Evidencia", "QA: replica el caso\ny comenta en Jira", "#f472b6"),
       ("🦊", "7. Backport", "Binni aprueba y\nmerge a todos los\nentornos", "#60a5fa")]
feat = [("🎫", "1. Historia", "Ticket Jira con\ncriterios de\naceptacion", "#38bdf8"),
        ("🦉", "2. Diseno", "Delivery Analyst:\nTech Design en\nConfluence", "#34d399"),
        (("🐱", "🦝"), "3. Build paralelo", "Mobile con mock +\nCloud con Lambda,\ncontrato primero", "#fbbf24"),
        ("🐺", "4. Revision", "Code Reviewer:\nPR movil y backend", "#c084fc"),
        ("🐞", "5. Matriz QA", "QA: pais x entorno\ncon clientes reales", "#f472b6"),
        ("🦊", "6. Release", "Binni / PO ajustan\nalcance; flags por\npais", "#60a5fa")]
lane(8.0, "#f87171", "BUG  ·  investigar y probar", "ej. FA-4889 pedido offline en Procesando", bug, loop=(5, 2, "si la evidencia falla, vuelve a investigar"))
lane(1.2, "#34d399", "FEATURE  ·  disenar y construir", "ej. FA-4841 tendencia de ventas", feat, loop=(4, 2, "si QA encuentra desvio, vuelve a construir"))
t(W / 2, .55, "Orden ilustrativo basado en las definiciones de los agentes y en los tickets COC-37..49, 79, 94-96, 184-187.", fontsize=10, color=MUT)
fig.savefig("images/team_bug_vs_feature_flow.png", dpi=85, facecolor=BG)
