# Reconciliation: video and deck vs Multica

**Capture date (use for every figure): Nov 13, 2026.** Re-capture once, the morning of the talk, and change every number together. Run counts grow about 100 per day because the Support sweep runs every 15 minutes.

Source: `multica issue list` (all 199 issues) and `multica agent tasks <agent>` (all runs, paged).

## Totals

| Figure                  | Video / deck before  | Multica (Nov 13)                                                                   | Deck now            |
| ----------------------- | -------------------- | ---------------------------------------------------------------------------------- | ------------------- |
| Agent runs              | 3,595                | **3,722** (3,458 completed, 213 failed, 51 cancelled/running)                      | 3,722               |
| Completed rate          | 93% (3,334 of 3,594) | 92.9%                                                                              | 93%                 |
| Issues created          | 187                  | **199**                                                                            | 199                 |
| Issues done             | 76                   | **77** (66 in review, 23 blocked, 14 in progress, 10 cancelled, 8 todo, 1 backlog) | 77                  |
| Issues in November      | 100                  | **112** (Aug 17, Sep 30, Oct 40)                                                   | 112                 |
| Support definition size | 31,072 chars         | **33,551** (after Playbook 20)                                                     | 33,551              |
| Hours lost              | 847                  | **no Multica source**                                                              | labelled "estimate" |

The video (`final_en.mp4`, `final_es.mp4`) still shows the old figures. Re-render it with the table above, or say "as of the first capture" when presenting it.

## 847 hours: label it as an estimate

Multica does not measure human hours lost. Analytics shows about 64 h (2d 16h) of agent run time in 30 days. Say it like this: _"My estimate: 847 hours a year went to repeat bugs, emails and deploys. It is my own estimate, not a Multica metric."_ If you keep it, add the formula on the slide, for example tickets per week × minutes per ticket × 52.

## Tickets attended

- **199 issues** in Multica: 107 assigned to Support, 33 to Reviewer, 25 to Mobile, 12 to Cloud.
- **20 distinct Jira tickets** (FA-xxxx) appear in issue titles.
- Support seller, zones and failure counts (about 38, 27, 18) come from title keywords. Keep the "~".
- Analytics usage and cost figures are unreliable because most runs do not report tokens. Do not show them.

## Maturity per agent

| Agent    | Runs  | Completed | Issues | Active since | Definition (chars) | Maturity                                              |
| -------- | ----- | --------- | ------ | ------------ | ------------------ | ----------------------------------------------------- |
| Support  | 2,268 | 92%       | 107    | Oct 27       | 33,551             | Mature: 20 playbook revisions, autopilot every 15 min |
| Reviewer | 500   | 96%       | 35     | Aug 17       | 18,987             | Established: rules updated from chats                 |
| Analyst  | 348   | 95%       | 11     | Aug 14       | 10,258             | Growing                                               |
| Mobile   | 304   | 92%       | 35     | Aug 14       | 15,114             | Growing                                               |
| Cloud    | 157   | 97%       | 20     | Aug 14       | 17,576             | Growing                                               |
| Mika     | 124   | 94%       | 1      | Aug 14       | n/a                | Coordinator                                           |
| QA       | 21    | 100%      | 6      | Aug 17       | 5,240              | Emerging                                              |

Support has 177 failed runs, about 8% of its runs. The busiest agent is also the one with the most corrections, which makes it the best story.

## The four questions, with evidence

1. **Why an agent and not a skill?** A skill is a recipe. An agent owns a queue, a memory and a schedule. Evidence: Support has "No skills assigned" and still handled 107 issues (`images/multica_agent_02_support-agent-no-skills.png`).
2. **How to improve the agents?** Correct them where they fail, and write the lesson into the definition. Evidence: Playbook 20 grew Support from 31,072 to 33,551 characters (`images/multica_chat_03_support-playbook20-improve.png`, `images/multica_runlog_01_COC44-pair-coding-correction.png`). Fix the tool, not the prompt.
3. **Why multi-agent vs OpenSpec, or OpenSpec vs skill?** OpenSpec writes the spec before the change. A skill packages one procedure. Multi-agent splits roles with separate contexts and a review gate. Use a spec for what to build, a skill for how to do one task, and agents for who does it and checks it. Evidence: FA-4889 delegation (`images/multica_chat_04_multiagent-fa4889-delegation.png`). Caveat: Cognition warns that parallel agents share context poorly, so keep one owner per ticket.
4. **Next steps.**
   - Measure drift: a weekly eval of 20 closed tickets, with failure rate per agent.
   - Replace the Chrome-based Teams access with a Teams MCP.
   - Add an Atlassian MCP so agents read Jira directly.
   - Report token usage per run so cost can be shown.
   - Keep a human approval before any external message.
   - Grow QA, which has only 21 runs.
