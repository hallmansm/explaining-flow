# Flow Simulator — team topology experiments you can run

Every argument about team structure eventually collapses into dueling anecdotes: specialists vs. cross-skilled, more people vs. better flow, big batches vs. small. This simulator ends the anecdotes. Configure a team, press Run, and watch the physics — throughput, cycle time, and WIP, measured live while animated work items move across a board.

**Run it here: https://hallmansm.github.io/explaining-flow/** — no install, and it comes pre-loaded with a full experiment series (below).

This is a fork of [Michel Grootjans' explaining-flow](https://github.com/michelgrootjans/explaining-flow), extended for live demos and coaching sessions. His original readme includes an excellent scenario-by-scenario lightning talk that remains the best gentle introduction to the tool's ideas.

## What it measures

- **Throughput** — stories finished per day. What velocity wishes it were.
- **Cycle time** — elapsed days from started to done, per story. The only number your customer feels.
- **WIP** — stories in flight: started, not done.

The three obey [Little's law](https://en.wikipedia.org/wiki/Little%27s_law) (`WIP = throughput × cycle time`) in every scenario — watching that hold while everything else changes is half the education.

## The Banana Software Company experiment series

The Recipe dropdown ships pre-loaded with eleven scenarios. They're a sequence, not a grab bag — run them in order and you get the whole argument:

| # | Recipe | The question it answers |
|---|--------|------------------------|
| 1 | **Base Team** | The baseline: 7 people (po, 2×ui, 3×dev, qa), specialists only, unlimited WIP. Watch the queues form between roles. |
| 2–4 | **2x / 4x / 8x People** | "We need more people." Buy the same team twice, four times, eight times over. Throughput rises — but divide it by payroll and watch **throughput-per-expense** fall. Capacity scales linearly; coordination doesn't. |
| 5 | **WIP throttling only** | One free change: cap work in flight at 7. Same people, same cost. Cycle time drops hard; throughput barely moves. |
| 6 | **Cross-skilling only** | One free change: every person carries a second skill. Handoffs stop blocking; idle time converts to flow. |
| 7 | **Cut Batch only** | One free change: halve the story size (twice the stories). Smaller batches, faster feedback, smoother flow. |
| 8–10 | **WIP + cross-skill + batch combos** | The free levers together — two skills, then three skills, then full-stack, each with WIP capped and batches cut. In typical runs the combos **beat the 2x-payroll team on throughput and crush it on cycle time — at 1x cost.** This is the point of the whole series. |
| 11 | **Base Team (noVar)** | The control: baseline with variability off. Compare against #1 to see what randomness alone costs — queues form even when averages say they shouldn't. |

Recipes are saved in your browser (localStorage): edit one and re-run under the same name to update it, hit **×** to delete one, name a new configuration to add your own. Clearing them is permanent for your browser — fresh visitors always start with the full set.

## Run it locally

```shell
git clone https://github.com/hallmansm/explaining-flow.git
cd explaining-flow
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## What this fork adds

- **Scenario names** — label runs so five-deep comparisons stay readable
- **Saved recipes** — the dropdown, with update-in-place, delete, and the baked-in demo series
- **A Clear button** — reset runs and charts between audiences, keeping recipes
- **A stable stats frame** — big teams (4x/8x) no longer shove the animation off-screen; the comparison table scrolls in place
- Case-insensitive worker/skill parsing, and assorted demo-hardening fixes

## Companion simulator

This sim has no rework loop — quality is assumed. For the other half of the story, the [Rework Backwash simulator](https://hallmansm.github.io/rework-sim/) shows what a defect rate does to a single team's flow: why 33% rework isn't "33% slower" but a queueing cliff.

## Credits

Concept, model, and the original implementation: [Michel Grootjans](https://github.com/michelgrootjans/explaining-flow). Fork maintained by Steve Hallman ([The Agile Couch](https://theagilecouch.com)), with Claude doing the typing.

# License

Shield: [![CC BY 4.0][cc-by-shield]][cc-by]

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by],
same as the upstream project it derives from.

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg
