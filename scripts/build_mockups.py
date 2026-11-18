import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

BG, CARD, FG, MUTED = "#0b0f1a", "#141b2d", "#e6edf7", "#8b97b3"
plt.rcParams.update({"font.family": "DejaVu Sans"})

def card(name, platform, accent, author, role, when, body, ref, h=6.2):
    fig = plt.figure(figsize=(11, h), facecolor=BG)
    ax = fig.add_axes([0, 0, 1, 1]); ax.set_xlim(0, 11); ax.set_ylim(0, h); ax.axis("off")
    ax.add_patch(FancyBboxPatch((.4, .75), 10.2, h - 1.6, boxstyle="round,pad=0.02,rounding_size=.15", fc=CARD, ec="#243049"))
    ax.add_patch(FancyBboxPatch((.4, h - 1.5), 10.2, .75, boxstyle="round,pad=0.02,rounding_size=.15", fc=accent, ec=accent, alpha=.25))
    ax.text(.7, h - 1.12, platform, color=FG, fontsize=13, weight="bold", va="center")
    ax.text(10.3, h - 1.12, ref, color=MUTED, fontsize=10, ha="right", va="center", family="monospace")
    ax.add_patch(plt.Circle((.95, h - 2.0), .22, color=accent))
    ax.text(.95, h - 2.0, "AI", color="#0b0f1a", fontsize=9, weight="bold", ha="center", va="center")
    ax.text(1.3, h - 1.9, author, color=FG, fontsize=12, weight="bold", va="center")
    ax.text(1.3 + .12 * len(author) + .25, h - 1.9, f"{role}  ·  {when}", color=MUTED, fontsize=10, va="center")
    ax.text(.7, h - 2.4, body, color=FG, fontsize=11, va="top", linespacing=1.55)
    ax.text(.4, .38, "ILLUSTRATIVE · ANONYMIZED MOCKUP: structure based on real AI-authored comments; all names, IDs, accounts and client data are placeholders.",
            color="#fbbf24", fontsize=8.5, va="center")
    fig.savefig(f"images/{name}", dpi=160); plt.close(fig)

card("mock_01_jira-qa-verification.png", "Jira · Comment", "#60a5fa", "QA Engineer (AI agent)", "agent", "yesterday 14:20",
"""Hi [Owner]

All [4] test orders went through the full flow on [QA env] with the fix, no errors.
Sources: [CloudWatch log groups] and a read-only scan of the [event table].

Flow per order
  #   Scenario        Sent by app        API call   Stored status
  1   mixed units     [lines A, B, C]    OK         confirmed
  2   unit type 1     [lines A, B]       OK         confirmed
  3   unit type 2     [line A]           OK         confirmed
  4   edge case       [line A]           OK         confirmed

Verdict: ready for review. No production data was touched (read-only).""", "[TICKET-0000]", h=6.9)

card("mock_02_teams-sync-request.png", "Microsoft Teams · Channel message", "#a78bfa", "Support Agent (AI agent)", "on behalf of [Owner]", "14:50",
"""@[Colleague A] @[Colleague B] hi!

Please run the seller sync for [Country] PRD.
The CSV with [N] new rows is already uploaded to the shared folder and verified.

Reply "Done" here when finished and I will validate the users
in the production database and answer the requester.

(Automated message sent by an AI agent, supervised by [Owner])""", "[Internal support chat]", h=5.6)

card("mock_03_multica-progress-comment.png", "Multica · Issue comment", "#34d399", "Support Agent (AI agent)", "agent", "15:02",
"""Progress ([Country] PRD, read-only checks):

- Done: CSV with [N] rows uploaded to the shared folder, read back and verified.
- Done: sync requested from [Colleague A] and [Colleague B] in the internal chat.
- Waiting: their "Done" reply. A wakeup fires in 5 minutes.

Next, automatically: re-validate users in the database, reply to the
requester, close the issue and delete the wakeup.

State: in_progress · no new comment posted if nothing changed.""", "[PROJ-000]", h=5.8)

card("mock_04_multica-agent-delegation.png", "Multica · Agent-to-agent handoff", "#fbbf24", "Cloud Engineer (AI agent)", "agent", "21:55",
"""Hi @Mobile Engineer

Backend analysis for [TICKET-0000] is finished.
You can continue automatically on the app side.

What was done on this tick
  - Reproduced the issue in the [QA env] with a replayed event
  - Backend fix pushed in [PR #000] (schema stays backward compatible)
  - Deployed to [QA env]; verification evidence attached above

Open question for you: confirm the app sends [field X] on every line.""", "[PROJ-000]", h=6.0)

card("mock_05_code-review.png", "GitHub · PR review comment", "#f472b6", "Senior Code Reviewer (AI agent)", "agent", "03:00",
"""Review of [PR #000] → [branch]   Verdict: Approve with 2 minor notes

  Correctness   handler maps unit type consistently; no regression found
  Compatibility GraphQL schema change is additive (backward compatible)
  Tests         new unit test covers mixed-unit order; edge case missing
  Risk          low · no secrets, no infra changes

Notes
  1. [file A:L42] default value should be explicit.
  2. [file B:L10] add a test for the empty-lines case.""", "[repo] #000", h=5.8)
print("ok")
