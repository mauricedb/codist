import * as chrono from "chrono-node"

export type DuePhrase = {
  // Calendar date as "YYYY-MM-DD".
  dueDate: string
  // The matched phrase, as `text.slice(start, end)`.
  start: number
  end: number
}

// A duration without "in"/"next", e.g. "Bake for 2 days", is not a due date.
const bareDuration = /^(for\s+)?(\d+|an?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(days?|weeks?|months?|years?)$/i

function pad(value: number) {
  return String(value).padStart(2, "0")
}

// Finds the first due-date phrase in `text`, such as "tomorrow",
// "in two days", "next monday" or "Oct 25". `today` ("YYYY-MM-DD") is the
// reference date, so results don't depend on the caller's time zone.
export function parseDueDate(text: string, today: string): DuePhrase | null {
  const [year, month, day] = today.split("-").map(Number)
  // Local noon of `today`: chrono resolves relative phrases in local time.
  const reference = new Date(year, month - 1, day, 12)

  const result = chrono.casual
    .parse(text, reference, { forwardDate: true })
    .find(
      (candidate) =>
        (candidate.start.isCertain("day") ||
          candidate.start.isCertain("weekday") ||
          candidate.tags().has("result/relativeDate")) &&
        !bareDuration.test(candidate.text)
    )
  if (!result) return null

  return {
    dueDate: `${result.start.get("year")}-${pad(result.start.get("month")!)}-${pad(result.start.get("day")!)}`,
    start: result.index,
    end: result.index + result.text.length,
  }
}

export function removeDuePhrase(text: string, phrase: DuePhrase) {
  return `${text.slice(0, phrase.start)} ${text.slice(phrase.end)}`
    .replace(/\s+/g, " ")
    .trim()
}
