import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import Quiz from "@/views/Quiz.vue";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Radio index → value reference (by question):
 *
 *  Q1 "Your HIV status?"
 *    [0] "I am not sure" → Medium Risk
 *    [1] "Negative"      → Low Risk
 *    [2] "Positive"      → High Risk
 *
 *  Q2 "Your partners HIV status?"
 *    [0] "I am not sure" → Medium Risk
 *    [1] "Negative"      → Low Risk
 *    [2] "Positive"      → High Risk
 *
 *  Q3 "What are the ways you are reducing the risk?"
 *    [0] "Undetectable"                 → Low Risk
 *    [1] "Pulling out"                  → High Risk
 *    [2] "PrEP (Pre-Exposure Prophylaxis)" → Medium Risk
 */

/** Click the intro button to enter the quiz. */
async function startQuiz(user) {
  await user.click(screen.getByRole("button", { name: /how safe/i }));
}

/**
 * Select the radio at the given index within the currently visible question.
 * getAllByRole("radio") only returns radios from the visible question card
 * because v-show hides the others with display:none.
 */
async function selectRadio(user, index) {
  const radios = screen.getAllByRole("radio");
  await user.click(radios[index]);
}

/** Click the visible Next / See Results button. */
async function clickNext(user) {
  const btn =
    screen.queryByRole("button", { name: /next/i }) ||
    screen.getByRole("button", { name: /see results/i });
  await user.click(btn);
}

/** Click the Previous button. */
async function clickPrev(user) {
  await user.click(screen.getByRole("button", { name: /previous/i }));
}

/**
 * Answer all three questions and land on the results screen.
 * Each argument is the radio index (0–2) to select for that question.
 */
async function completeQuiz(user, q1, q2, q3) {
  await startQuiz(user);
  await selectRadio(user, q1);
  await clickNext(user);
  await selectRadio(user, q2);
  await clickNext(user);
  await selectRadio(user, q3);
  await clickNext(user);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Quiz.vue", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe("initial state", () => {
    it("shows the quiz intro with title and start button", () => {
      render(Quiz);
      expect(screen.getByText("RISK CALCULATOR")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /how safe/i }),
      ).toBeInTheDocument();
    });

    it("does not show quiz questions initially", () => {
      render(Quiz);
      expect(screen.queryByText("Question 1 of 3")).not.toBeInTheDocument();
    });

    it("starts at question 1 when the quiz opens", async () => {
      render(Quiz);
      await startQuiz(user);
      expect(screen.getByText("Question 1 of 3")).toBeInTheDocument();
    });

    it("has no radio pre-selected when the quiz opens", async () => {
      render(Quiz);
      await startQuiz(user);
      screen.getAllByRole("radio").forEach((radio) => {
        expect(radio).not.toBeChecked();
      });
    });

    it("shows no error message when the quiz opens", async () => {
      render(Quiz);
      await startQuiz(user);
      expect(
        screen.queryByText("Please select an answer before continuing."),
      ).not.toBeInTheDocument();
    });
  });

  describe("quiz data", () => {
    it("has 3 questions (shown in progress label)", async () => {
      render(Quiz);
      await startQuiz(user);
      expect(screen.getByText("Question 1 of 3")).toBeInTheDocument();
    });

    it("shows 3 radio options per question", async () => {
      render(Quiz);
      await startQuiz(user);
      expect(screen.getAllByRole("radio")).toHaveLength(3);

      await selectRadio(user, 1);
      await clickNext(user);
      expect(screen.getAllByRole("radio")).toHaveLength(3);

      await selectRadio(user, 1);
      await clickNext(user);
      expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    it("has the correct card title", async () => {
      render(Quiz);
      await startQuiz(user);
      expect(screen.getByText("Risk Calculator")).toBeInTheDocument();
    });
  });

  describe("showQuizMethod", () => {
    it("shows the quiz card when start button is clicked", async () => {
      render(Quiz);
      await startQuiz(user);
      expect(screen.getByText("Risk Calculator")).toBeInTheDocument();
      expect(screen.getByText("Question 1 of 3")).toBeInTheDocument();
    });
  });

  describe("next", () => {
    it("does not advance when no answer is selected", async () => {
      render(Quiz);
      await startQuiz(user);
      await clickNext(user);
      expect(screen.getByText("Question 1 of 3")).toBeInTheDocument();
    });

    it("shows error message when no answer is selected", async () => {
      render(Quiz);
      await startQuiz(user);
      await clickNext(user);
      expect(
        screen.getByText("Please select an answer before continuing."),
      ).toBeInTheDocument();
    });

    it("advances to Q2 when an answer is selected", async () => {
      render(Quiz);
      await startQuiz(user);
      await selectRadio(user, 1); // "Negative"
      await clickNext(user);
      expect(screen.getByText("Question 2 of 3")).toBeInTheDocument();
    });

    it("clears the error message when advancing after selecting an answer", async () => {
      render(Quiz);
      await startQuiz(user);
      await clickNext(user); // triggers error
      expect(
        screen.getByText("Please select an answer before continuing."),
      ).toBeInTheDocument();
      await selectRadio(user, 1);
      await clickNext(user);
      expect(
        screen.queryByText("Please select an answer before continuing."),
      ).not.toBeInTheDocument();
    });

    it("does not advance on Q2 when no answer is selected", async () => {
      render(Quiz);
      await startQuiz(user);
      await selectRadio(user, 1);
      await clickNext(user); // → Q2
      await clickNext(user); // attempt Q2 without answer
      expect(screen.getByText("Question 2 of 3")).toBeInTheDocument();
      expect(
        screen.getByText("Please select an answer before continuing."),
      ).toBeInTheDocument();
    });

    it("advances through all questions when answers are provided", async () => {
      render(Quiz);
      await completeQuiz(user, 1, 1, 0);
      expect(screen.getByText("Your Results")).toBeInTheDocument();
    });
  });

  describe("prev", () => {
    it("goes back to Q1 from Q2", async () => {
      render(Quiz);
      await startQuiz(user);
      await selectRadio(user, 1);
      await clickNext(user); // → Q2
      expect(screen.getByText("Question 2 of 3")).toBeInTheDocument();
      await clickPrev(user);
      expect(screen.getByText("Question 1 of 3")).toBeInTheDocument();
    });
  });

  describe("clearError", () => {
    it("clears the error when an answer is selected and Next is clicked", async () => {
      render(Quiz);
      await startQuiz(user);
      await clickNext(user); // trigger error
      expect(
        screen.getByText("Please select an answer before continuing."),
      ).toBeInTheDocument();
      // Select an answer and advance — next() calls clearError() internally
      await selectRadio(user, 0);
      await clickNext(user);
      // Now on Q2, the Q1 error should be gone
      expect(
        screen.queryByText("Please select an answer before continuing."),
      ).not.toBeInTheDocument();
    });
  });

  describe("restart", () => {
    it("returns to Q1 after restarting", async () => {
      render(Quiz);
      await completeQuiz(user, 1, 1, 0);
      await user.click(screen.getByRole("button", { name: /take again/i }));
      expect(screen.getByText("Question 1 of 3")).toBeInTheDocument();
    });

    it("clears all responses after restarting (no radio pre-selected)", async () => {
      render(Quiz);
      await completeQuiz(user, 1, 1, 0);
      await user.click(screen.getByRole("button", { name: /take again/i }));
      screen.getAllByRole("radio").forEach((radio) => {
        expect(radio).not.toBeChecked();
      });
    });

    it("has the same number of questions after restarting", async () => {
      render(Quiz);
      await completeQuiz(user, 1, 1, 0);
      await user.click(screen.getByRole("button", { name: /take again/i }));
      expect(screen.getByText("Question 1 of 3")).toBeInTheDocument();
    });

    it("clears any error state after restarting", async () => {
      render(Quiz);
      await completeQuiz(user, 1, 1, 0);
      await user.click(screen.getByRole("button", { name: /take again/i }));
      expect(
        screen.queryByText("Please select an answer before continuing."),
      ).not.toBeInTheDocument();
    });
  });

  describe("score", () => {
    it("returns the most frequent response when one dominates (Low Risk)", async () => {
      render(Quiz);
      // Q1: "Negative"→Low, Q2: "Negative"→Low, Q3: "Pulling out"→High
      await completeQuiz(user, 1, 1, 1);
      expect(screen.getByText("Low Risk")).toBeInTheDocument();
    });

    it("returns the value when all answers are the same (High Risk)", async () => {
      render(Quiz);
      // Q1: "Positive"→High, Q2: "Positive"→High, Q3: "Pulling out"→High
      await completeQuiz(user, 2, 2, 1);
      expect(screen.getByText("High Risk")).toBeInTheDocument();
    });

    it("returns Medium Risk when it is the mode", async () => {
      render(Quiz);
      // Q1: "I am not sure"→Medium, Q2: "I am not sure"→Medium, Q3: "Undetectable"→Low
      await completeQuiz(user, 0, 0, 0);
      expect(screen.getByText("Medium Risk")).toBeInTheDocument();
    });

    it("returns the first encountered value when there is a tie", async () => {
      render(Quiz);
      // Q1: "Negative"→Low, Q2: "I am not sure"→Medium, Q3: "Pulling out"→High
      await completeQuiz(user, 1, 0, 1);
      expect(screen.getByText("Low Risk")).toBeInTheDocument();
    });
  });

  describe("progressPercent", () => {
    it("progress bar starts at 0", async () => {
      render(Quiz);
      await startQuiz(user);
      // The card renders an internal loader progressbar (aria-hidden="true")
      // plus the quiz's own v-progress-linear (aria-hidden="false").
      const bars = screen.getAllByRole("progressbar", { hidden: true });
      const quizBar = bars.find(
        (b) => b.getAttribute("aria-hidden") !== "true" && b.hasAttribute("aria-valuenow"),
      );
      expect(quizBar).toHaveAttribute("aria-valuenow", "0");
    });

    it("progress bar updates after answering Q1", async () => {
      render(Quiz);
      await startQuiz(user);
      await selectRadio(user, 1);
      await clickNext(user);
      const bars = screen.getAllByRole("progressbar", { hidden: true });
      const quizBar = bars.find(
        (b) => b.getAttribute("aria-hidden") !== "true" && b.hasAttribute("aria-valuenow"),
      );
      const value = parseFloat(quizBar.getAttribute("aria-valuenow"));
      expect(value).toBeCloseTo(33.33, 1);
    });

    it("progress bar updates after answering Q2", async () => {
      render(Quiz);
      await startQuiz(user);
      await selectRadio(user, 1);
      await clickNext(user);
      await selectRadio(user, 1);
      await clickNext(user);
      const bars = screen.getAllByRole("progressbar", { hidden: true });
      const quizBar = bars.find(
        (b) => b.getAttribute("aria-hidden") !== "true" && b.hasAttribute("aria-valuenow"),
      );
      const value = parseFloat(quizBar.getAttribute("aria-valuenow"));
      expect(value).toBeCloseTo(66.67, 1);
    });

    it("progress bar reaches 100 after all questions are answered", async () => {
      render(Quiz);
      await completeQuiz(user, 1, 1, 0);
      const bars = screen.getAllByRole("progressbar", { hidden: true });
      const quizBar = bars.find(
        (b) => b.getAttribute("aria-hidden") !== "true" && b.hasAttribute("aria-valuenow"),
      );
      expect(quizBar).toHaveAttribute("aria-valuenow", "100");
    });
  });
});
