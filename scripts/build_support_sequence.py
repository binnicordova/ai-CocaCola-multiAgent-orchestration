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


A = {
    "req": ("🙋", "Requester (CL/AR/BR/PY)", "", "#60a5fa"),
    "teams": ("💬", "Teams support chats", "", "#22d3ee"),
    "auto": ("⏰", "Autopilot sweep (5 min)", "", "#fbbf24"),
    "sa": ("🦸", "Support Agent", "", "#34d399"),
    "mu": ("🧭", "Multica issue", "", "#a78bfa"),
    "dyn": ("🗄️", "DynamoDB (PRD read-only)", "", "#fb923c"),
    "cw": ("☁️", "CloudWatch + Cognito", "", "#f87171"),
    "sp": ("🛠️", "SharePoint + sync team", "", "#a3e635"),
    "jira": ("🎫", "Jira", "", "#38bdf8"),
    "bin": ("🦊", "Binni (approver)", "", "#f472b6"),
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


M = [
 ("note","req","auto","1 · INTAKE","#60a5fa"),
 ("req","teams","asks for access / reports a problem",1),
 ("auto","teams","sweep: unread markers",2),
 ("auto","sa","wake up with new request",3),
 ("sa","mu","create 1 issue per request",4),
 ("sa","mu","ack comment: 'Revisando...'",5),
 ("sa","sa","triage: 5 request types",6),
 ("note","sa","sp","2 · A · SELLER ACTIVATION (standing authorization)","#34d399"),
 ("sa","dyn","seller row exists? profile + route",7),
 ("sa","sp","build CSV, upload to SharePoint",8),
 ("sa","teams","@sync team: run the sync",9),
 ("sp","sa","'Ejecutado' / 'Listo, valida'",10),
 ("sa","dyn","validate row in PRD",11),
 ("note","req","cw","3 · B · LOGIN PROBLEM","#fbbf24"),
 ("sa","dyn","active? profile? route?",12),
 ("sa","cw","Cognito user + getWhoAmI logs",13),
 ("cw","sa","no logs = client-side SSO issue",14),
 ("sa","teams","reply: clear Chrome cache guide (PDF)",15),
 ("note","sa","cw","4 · C · ORDER FAILS","#f87171"),
 ("sa","cw","Logs Insights by clientId / RequestId",16),
 ("cw","sa","insufficient_credit (expected)",17),
 ("sa","teams","explain: credit area must review",18),
 ("note","sa","bin","5 · D · UNKNOWN / ZONES / QUESTIONS","#f472b6"),
 ("sa","jira","zone change ticket (backup JSON)",19),
 ("sa","bin","draft reply, ask approval",20),
 ("bin","sa","approve / correct",21),
 ("note","req","mu","6 · CLOSE & LEARN","#a78bfa"),
 ("req","teams","'ya funciona' confirms",22),
 ("sa","mu","quote confirmation, set done",23),
 ("sa","mu","append case to playbook (learning loop)",24),
]
diagram("images/sequence_03_support-agent.png","Support Agent sequence · how Teams requests are attended",
        "Actors: requester, Teams, autopilot, agent and tools · human approval for anything outside the standing playbooks", M)
