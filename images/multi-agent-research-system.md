# How Anthropic Built Its Multi-Agent Research System (Summary)

Source: <https://www.anthropic.com/research/multi-agent-research-system>

## What it is

A multi-agent system is several agents (LLMs using tools in a loop) working together. Claude's **Research** feature uses a lead agent that plans the work, then spawns subagents that search in parallel.

## Why multi-agent

- Research is open-ended and path-dependent, so a fixed pipeline doesn't work.
- Subagents run in parallel with their own context windows. They compress findings and return only the key points to the lead agent.
- Each subagent has separate tools, prompts and trajectories, which reduces path dependency.
- **Results:** Opus 4 as lead with Sonnet 4 subagents beat single-agent Opus 4 by **90.2%** on an internal research eval.
- **Token use is the main driver.** On BrowseComp, token usage explains about 80% of performance variance. Tool calls and model choice account for most of the rest.
- **Cost:** agents use about 4× the tokens of chat, and multi-agent systems about **15×**. They only pay off for high-value tasks.
- **Poor fit:** tasks with shared context or heavy dependencies between agents, such as most coding tasks.
- **Good fit:** heavy parallelization, information larger than one context window, and many complex tools.

## Architecture (orchestrator-worker)

1. The **LeadResearcher** analyzes the query, plans, and saves the plan to **Memory**. The context can be truncated beyond 200k tokens.
2. It spawns **subagents**, each with a specific task. They search, evaluate results with interleaved thinking, and report back.
3. The lead synthesizes the results and decides whether to do more research.
4. A **CitationAgent** attributes claims to sources.
5. The final answer is returned with citations.

This differs from static RAG, which fetches fixed chunks by similarity. Here the search is dynamic and multi-step.

## Prompt engineering principles

1. **Think like your agents.** Simulate them step by step to find failure modes.
2. **Teach the orchestrator to delegate.** Each subagent needs an objective, an output format, tool and source guidance, and clear boundaries. Vague tasks led to duplicated work.
3. **Scale effort to complexity.**
   - A simple fact needs 1 agent and 3–10 tool calls.
   - A comparison needs 2–4 subagents.
   - Complex research needs more than 10 subagents.
4. **Tool design matters.** Give each tool a distinct purpose and a clear description. Agents should prefer specialized tools over generic ones.
5. **Let agents improve themselves.** A tool-testing agent rewrote tool descriptions, cutting task time by 40%.
6. **Start wide, then narrow.** Use short, broad queries first.
7. **Guide thinking.** Use extended and interleaved thinking for planning and for evaluating results.
8. **Parallelize.** Run 3–5 subagents at once, each using 3+ tools in parallel. This cut research time by up to 90%.

The strategy favors heuristics over rigid rules, plus guardrails against runaway behavior.

## Evaluation

- **Start small.** About 20 representative queries are enough early on.
- **LLM-as-judge** with a rubric covering factual accuracy, citation accuracy, completeness, source quality and tool efficiency. A single call outputting a 0.0–1.0 score plus pass/fail worked best.
- **Human testing** still matters. Testers found that agents preferred SEO content farms over authoritative sources.
- **Emergent behavior:** small lead-agent changes can shift subagent behavior unpredictably. Design prompts as collaboration frameworks, not just instructions.
- **End-state evaluation** suits agents that mutate state. Judge the final state and use checkpoints instead of checking every step.

## Production challenges

- **Stateful, compounding errors.** Resume from checkpoints instead of restarting. Let agents adapt to tool failures, and add deterministic retries.
- **Debugging.** Runs are non-deterministic. Use full production tracing and monitor decision patterns without reading conversation contents, to protect privacy.
- **Deployment.** Use rainbow deployments, shifting traffic gradually so running agents aren't broken.
- **Synchronous execution** creates bottlenecks. The lead can't steer subagents and subagents can't coordinate. Asynchronous execution would help but adds complexity.

## Extra tips (appendix)

- **Long conversations:** summarize finished phases into external memory. Spawn fresh subagents with clean context and hand off carefully.
- **Filesystem artifacts:** subagents store outputs externally and pass lightweight references to the lead. This avoids the "game of telephone" and saves tokens.

## Conclusion

The gap between prototype and production is wide. Reliable multi-agent systems need careful engineering, testing, prompt and tool design, strong operations, and close team collaboration. Open-source example prompts are in Anthropic's Cookbook.
