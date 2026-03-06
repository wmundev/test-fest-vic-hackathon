import { render, screen, fireEvent } from "@testing-library/vue";
import Quiz from "@/views/Quiz.vue";

function getVm(container) {
  return container.firstElementChild.__vueParentComponent.proxy;
}

describe("Quiz.vue", () => {
  describe("initial state", () => {
    it("shows the quiz intro with title and start button", () => {
      render(Quiz);
      expect(screen.getByText("RISK CALCULATOR")).toBeInTheDocument();
      expect(screen.getByText("How safe are you?")).toBeInTheDocument();
    });

    it("does not show quiz questions initially", () => {
      render(Quiz);
      expect(screen.queryByText("Question 1 of 3")).not.toBeInTheDocument();
    });

    it("starts at question index 0", () => {
      const { container } = render(Quiz);
      expect(getVm(container).questionIndex).toBe(0);
    });

    it("has empty userResponses array", () => {
      const { container } = render(Quiz);
      expect(getVm(container).userResponses).toEqual([]);
    });

    it("has no error message", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      expect(vm.errorMessage).toBe("");
      expect(vm.errorIndex).toBe(-1);
    });
  });

  describe("quiz data", () => {
    it("has 3 questions", () => {
      const { container } = render(Quiz);
      expect(getVm(container).quiz.questions.length).toBe(3);
    });

    it("each question has 3 responses", () => {
      const { container } = render(Quiz);
      getVm(container).quiz.questions.forEach((question) => {
        expect(question.responses.length).toBe(3);
      });
    });

    it("has the correct title", () => {
      const { container } = render(Quiz);
      expect(getVm(container).quiz.title).toBe("Risk Calculator");
    });
  });

  describe("showQuizMethod", () => {
    it("shows the quiz card when start button is clicked", async () => {
      render(Quiz);
      await fireEvent.click(screen.getByText("How safe are you?"));
      expect(screen.getByText("Risk Calculator")).toBeInTheDocument();
      expect(screen.getByText("Question 1 of 3")).toBeInTheDocument();
    });
  });

  describe("next", () => {
    it("does not advance when no answer is selected", async () => {
      render(Quiz);
      await fireEvent.click(screen.getByText("How safe are you?"));
      const nextButtons = screen.getAllByText("Next");
      await fireEvent.click(nextButtons[0]);
      // Still on question 1
      expect(screen.getByText("Question 1 of 3")).toBeInTheDocument();
    });

    it("shows error message when no answer is selected", async () => {
      const { container } = render(Quiz);
      await fireEvent.click(screen.getByText("How safe are you?"));
      const nextButtons = screen.getAllByText("Next");
      await fireEvent.click(nextButtons[0]);
      const radioGroup = container.querySelector(
        '[error-messages="Please select an answer before continuing."]',
      );
      expect(radioGroup).not.toBeNull();
    });

    it("advances when answer is selected", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses[0] = "Low Risk";
      vm.next();
      expect(vm.questionIndex).toBe(1);
    });

    it("clears error when advancing", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.errorMessage = "some error";
      vm.errorIndex = 0;
      vm.userResponses[0] = "Low Risk";
      vm.next();
      expect(vm.errorMessage).toBe("");
      expect(vm.errorIndex).toBe(-1);
    });

    it("does not advance on the second question without an answer", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses[0] = "Low Risk";
      vm.next();
      expect(vm.questionIndex).toBe(1);
      vm.next();
      expect(vm.questionIndex).toBe(1);
      expect(vm.errorIndex).toBe(1);
    });

    it("advances through all questions when answers are provided", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses[0] = "Low Risk";
      vm.next();
      vm.userResponses[1] = "Medium Risk";
      vm.next();
      vm.userResponses[2] = "High Risk";
      vm.next();
      expect(vm.questionIndex).toBe(3);
    });
  });

  describe("prev", () => {
    it("decrements questionIndex", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses[0] = "Low Risk";
      vm.next();
      expect(vm.questionIndex).toBe(1);
      vm.prev();
      expect(vm.questionIndex).toBe(0);
    });

    it("clears error when going back", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses[0] = "Low Risk";
      vm.next();
      vm.next(); // triggers error on question 2
      expect(vm.errorMessage).not.toBe("");
      vm.prev();
      expect(vm.errorMessage).toBe("");
      expect(vm.errorIndex).toBe(-1);
    });
  });

  describe("clearError", () => {
    it("resets errorMessage and errorIndex", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.errorMessage = "Error";
      vm.errorIndex = 2;
      vm.clearError();
      expect(vm.errorMessage).toBe("");
      expect(vm.errorIndex).toBe(-1);
    });
  });

  describe("restart", () => {
    it("resets questionIndex to 0", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses[0] = "Low Risk";
      vm.next();
      vm.restart();
      expect(vm.questionIndex).toBe(0);
    });

    it("clears all user responses", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses[0] = "Low Risk";
      vm.userResponses[1] = "High Risk";
      vm.restart();
      expect(vm.userResponses[0]).toBeUndefined();
      expect(vm.userResponses[1]).toBeUndefined();
      expect(vm.userResponses[2]).toBeUndefined();
    });

    it("creates responses array with correct length", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.restart();
      expect(vm.userResponses.length).toBe(3);
    });

    it("clears any error state", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.next(); // triggers error
      vm.restart();
      expect(vm.errorMessage).toBe("");
      expect(vm.errorIndex).toBe(-1);
    });
  });

  describe("score", () => {
    it("returns the most frequent response when one dominates", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses = ["Low Risk", "Low Risk", "High Risk"];
      expect(vm.score()).toBe("Low Risk");
    });

    it("returns the value when all answers are the same", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses = ["High Risk", "High Risk", "High Risk"];
      expect(vm.score()).toBe("High Risk");
    });

    it("returns Medium Risk when it is the mode", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses = ["Medium Risk", "Medium Risk", "Low Risk"];
      expect(vm.score()).toBe("Medium Risk");
    });

    it("returns the first mode encountered when there is a tie", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses = ["Low Risk", "Medium Risk", "High Risk"];
      // When all have count 1, the first element wins (mode algorithm keeps first maxEl)
      expect(vm.score()).toBe("Low Risk");
    });
  });

  describe("progressPercent", () => {
    it("returns 0 at the first question", () => {
      const { container } = render(Quiz);
      expect(getVm(container).progressPercent).toBe(0);
    });

    it("returns correct percentage after advancing", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses[0] = "Low Risk";
      vm.next();
      // 1 out of 3 questions = ~33.33%
      expect(vm.progressPercent).toBeCloseTo(33.33, 1);
    });

    it("returns correct percentage at the second question", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses[0] = "Low Risk";
      vm.next();
      vm.userResponses[1] = "Low Risk";
      vm.next();
      // 2 out of 3 questions = ~66.67%
      expect(vm.progressPercent).toBeCloseTo(66.67, 1);
    });

    it("returns 100 when all questions are answered", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.userResponses[0] = "Low Risk";
      vm.next();
      vm.userResponses[1] = "Low Risk";
      vm.next();
      vm.userResponses[2] = "Low Risk";
      vm.next();
      expect(vm.progressPercent).toBe(100);
    });

    it("returns 0 when quiz has no questions", () => {
      const { container } = render(Quiz);
      const vm = getVm(container);
      vm.quiz = { questions: [] };
      expect(vm.progressPercent).toBe(0);
    });
  });
});
