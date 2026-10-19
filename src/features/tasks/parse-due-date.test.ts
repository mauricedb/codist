import { describe, expect, it } from "vitest"
import { parseDueDate, removeDuePhrase } from "@/features/tasks/parse-due-date"

// A Monday.
const today = "2026-10-19"

describe("parseDueDate", () => {
  it.each([
    ["Buy milk today", "2026-10-19"],
    ["Buy milk tomorrow", "2026-10-20"],
    ["Buy milk tmr", "2026-10-20"],
    ["Pay rent in two days", "2026-10-21"],
    ["Pay rent in 2 days", "2026-10-21"],
    ["Review in a week", "2026-10-26"],
    ["Review next week", "2026-10-26"],
    ["Call friday", "2026-10-23"],
    ["Call next monday", "2026-10-26"],
    ["Dentist Oct 25", "2026-10-25"],
    ["Renew passport next month", "2026-11-19"],
    ["Dinner tomorrow at 7pm", "2026-10-20"],
  ])("%s → %s", (text, dueDate) => {
    expect(parseDueDate(text, today)?.dueDate).toBe(dueDate)
  })

  it.each([
    "Buy milk",
    "Standup at 9am",
    "Read 3 chapters",
    "Bake for 2 days",
    "May need to call",
  ])("finds no due date in %s", (text) => {
    expect(parseDueDate(text, today)).toBeNull()
  })

  it("rolls over to the next month", () => {
    expect(parseDueDate("tomorrow", "2026-10-31")?.dueDate).toBe("2026-11-01")
  })

  it("returns the phrase position", () => {
    expect(parseDueDate("Call mom tomorrow about tickets", today)).toEqual({
      dueDate: "2026-10-20",
      start: 9,
      end: 17,
    })
  })
})

describe("removeDuePhrase", () => {
  it.each([
    ["Call mom tomorrow about tickets", "Call mom about tickets"],
    ["Pay rent in two days", "Pay rent"],
    ["tomorrow buy milk", "buy milk"],
  ])("%s → %s", (text, title) => {
    const phrase = parseDueDate(text, today)!
    expect(removeDuePhrase(text, phrase)).toBe(title)
  })
})
