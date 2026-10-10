# Part 2 — AI Product Thinking

## Studio COKA Climate Brief

I would build **Climate Brief**, an AI tool that helps people prepare a clear project brief before speaking with Studio COKA.

It would be useful for homeowners, developers and organisations that have an idea for a building project but are not sure how to explain it clearly.

The user would enter simple information such as the project location, building type, site conditions, intended users, priorities, budget and any known limits. The AI would then ask a few follow-up questions, point out missing information and create a short project brief.

The brief would include the main project goals, space needs, climate-related considerations and useful questions to discuss with the architect. The user could then send the brief to Studio COKA as part of an enquiry.

The goal is not to replace an architect. The goal is to help clients explain their ideas better and give Studio COKA more useful information before the first meeting.

For the first version, I would use the **OpenAI Responses API with structured outputs**, server-side validation and a small knowledge base containing Studio COKA’s public service information and design principles. Climate data could later come from a reliable weather or climate API.

The first version would include a guided form, AI follow-up questions, a generated brief, human review and enquiry submission.

Important safeguards would include clear warnings that the tool does not give professional architectural advice, no structural or building-code decisions, protection of project data, rate limiting, prompt-injection protection and human review before any design decision is made.
