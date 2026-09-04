# AKSOS Design OS for Mistral Vibe

Contents:
- `AGENTS.md` — permanent project instructions
- `docs/AKSOS-DESIGN-DOCTRINE.md` — design source of truth
- 8 focused Agent Skills under `.agents/skills/`
- supporting reference files

## Install
Copy `AGENTS.md`, `docs/`, and `.agents/` into the root of the AKSOS repository.

Mistral Vibe supports project-level Agent Skills and `AGENTS.md`. Skills use YAML frontmatter with `name` and `description`, followed by Markdown instructions. Keep descriptions specific so the correct skill is activated for the task.

## Recommended workflow
1. Start in the `plan` agent.
2. Audit the repository without modifying files.
3. Produce the UX/UI redesign proposal.
4. Review the proposal.
5. Challenge it against the doctrine.
6. Implement incrementally.
7. Run visual QA after each major section.
8. Run production build and protected-route checks.

## First prompt
Read `AGENTS.md` and `docs/AKSOS-DESIGN-DOCTRINE.md`. Inspect the repository without modifying files. Audit current UX, UI, diagrams, motion, responsive behavior, and frontend architecture. Then propose the new homepage experience. Do not code yet.
