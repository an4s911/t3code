import { describe, expect, it } from "vite-plus/test";
import { highlightQuoteInMarkdown } from "./citationHighlight";

describe("highlightQuoteInMarkdown", () => {
  it.each([
    [
      "plain text",
      "Glad the second install worked.",
      "Glad the second",
      "==Glad the second== install worked.",
    ],
    ["first of repeated text", "go now, then go now", "go now", "==go now==, then go now"],
    ["text wrapped onto the next line", "one two\nthree", "two three", "one ==two\nthree=="],
    ["regex characters", "Run (a+b)*c today", "(a+b)*c", "Run ==(a+b)*c== today"],
    [
      "prose after the same text in code",
      "`go now` then go now",
      "go now",
      "`go now` then ==go now==",
    ],
    [
      "text inside bold",
      "create **spring tides** now",
      "spring",
      "create **==spring== tides** now",
    ],
    [
      "text running into bold",
      "These changes create **spring tides and neap tides**.",
      "create spring tides",
      "These changes ==create== **==spring tides== and neap tides**.",
    ],
    ["text across bold", "the **bold** word", "the bold word", "==the== **==bold==** ==word=="],
    ["text across italics", "an _odd_ one", "an odd one", "==an== _==odd==_ ==one=="],
    ["snake_case as text", "set my_var now", "my_var now", "set ==my_var now=="],
  ])("highlights %s", (_name, markdown, quote, expected) => {
    expect(highlightQuoteInMarkdown(markdown, quote)).toBe(expected);
  });

  it.each([
    ["an empty quote", "text", "  "],
    ["text across a paragraph break", "one two\n\nthree", "two three"],
    ["text only inside inline code", "run `vp test` now", "vp test"],
    ["text only inside a code fence", "```sh\nvp test\n```", "vp test"],
    ["missing text", "nothing here", "absent"],
  ])("leaves %s unhighlighted", (_name, markdown, quote) => {
    expect(highlightQuoteInMarkdown(markdown, quote)).toBeNull();
  });
});
