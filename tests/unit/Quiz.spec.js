import { shallowMount } from "@vue/test-utils";
import Quiz from "@/views/Quiz.vue";

describe("Quiz.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Quiz);
  });

  describe("initial state", () => {
    it("has showQuiz set to false", () => {
      expect(wrapper.vm.showQuiz).toBe(false);
    });

    it("starts at question index 0", () => {
      expect(wrapper.vm.questionIndex).toBe(0);
    });

    it("has empty userResponses array", () => {
      expect(wrapper.vm.userResponses).toEqual([]);
    });

    it("has no error message", () => {
      expect(wrapper.vm.errorMessage).toBe("");
      expect(wrapper.vm.errorIndex).toBe(-1);
    });
  });

  describe("quiz data", () => {
    it("has 3 questions", () => {
      expect(wrapper.vm.quiz.questions.length).toBe(3);
    });

    it("each question has 3 responses", () => {
      wrapper.vm.quiz.questions.forEach((question) => {
        expect(question.responses.length).toBe(3);
      });
    });

    it("has the correct title", () => {
      expect(wrapper.vm.quiz.title).toBe("Risk Calculator");
    });
  });

  describe("showQuizMethod", () => {
    it("sets showQuiz to true", () => {
      wrapper.vm.showQuizMethod();
      expect(wrapper.vm.showQuiz).toBe(true);
    });
  });

  describe("next", () => {
    it("does not advance when no answer is selected", () => {
      wrapper.vm.next();
      expect(wrapper.vm.questionIndex).toBe(0);
    });

    it("sets error message when no answer is selected", () => {
      wrapper.vm.next();
      expect(wrapper.vm.errorMessage).toBe(
        "Please select an answer before continuing.",
      );
      expect(wrapper.vm.errorIndex).toBe(0);
    });

    it("advances when answer is selected", () => {
      wrapper.vm.userResponses[0] = "Low Risk";
      wrapper.vm.next();
      expect(wrapper.vm.questionIndex).toBe(1);
    });

    it("clears error when advancing", () => {
      wrapper.vm.errorMessage = "some error";
      wrapper.vm.errorIndex = 0;
      wrapper.vm.userResponses[0] = "Low Risk";
      wrapper.vm.next();
      expect(wrapper.vm.errorMessage).toBe("");
      expect(wrapper.vm.errorIndex).toBe(-1);
    });

    it("does not advance on the second question without an answer", () => {
      wrapper.vm.userResponses[0] = "Low Risk";
      wrapper.vm.next();
      expect(wrapper.vm.questionIndex).toBe(1);
      wrapper.vm.next();
      expect(wrapper.vm.questionIndex).toBe(1);
      expect(wrapper.vm.errorIndex).toBe(1);
    });

    it("advances through all questions when answers are provided", () => {
      wrapper.vm.userResponses[0] = "Low Risk";
      wrapper.vm.next();
      wrapper.vm.userResponses[1] = "Medium Risk";
      wrapper.vm.next();
      wrapper.vm.userResponses[2] = "High Risk";
      wrapper.vm.next();
      expect(wrapper.vm.questionIndex).toBe(3);
    });
  });

  describe("prev", () => {
    it("decrements questionIndex", () => {
      wrapper.vm.userResponses[0] = "Low Risk";
      wrapper.vm.next();
      expect(wrapper.vm.questionIndex).toBe(1);
      wrapper.vm.prev();
      expect(wrapper.vm.questionIndex).toBe(0);
    });

    it("clears error when going back", () => {
      wrapper.vm.userResponses[0] = "Low Risk";
      wrapper.vm.next();
      wrapper.vm.next(); // triggers error on question 2
      expect(wrapper.vm.errorMessage).not.toBe("");
      wrapper.vm.prev();
      expect(wrapper.vm.errorMessage).toBe("");
      expect(wrapper.vm.errorIndex).toBe(-1);
    });
  });

  describe("clearError", () => {
    it("resets errorMessage and errorIndex", () => {
      wrapper.vm.errorMessage = "Error";
      wrapper.vm.errorIndex = 2;
      wrapper.vm.clearError();
      expect(wrapper.vm.errorMessage).toBe("");
      expect(wrapper.vm.errorIndex).toBe(-1);
    });
  });

  describe("restart", () => {
    it("resets questionIndex to 0", () => {
      wrapper.vm.userResponses[0] = "Low Risk";
      wrapper.vm.next();
      wrapper.vm.restart();
      expect(wrapper.vm.questionIndex).toBe(0);
    });

    it("clears all user responses", () => {
      wrapper.vm.userResponses[0] = "Low Risk";
      wrapper.vm.userResponses[1] = "High Risk";
      wrapper.vm.restart();
      expect(wrapper.vm.userResponses[0]).toBeUndefined();
      expect(wrapper.vm.userResponses[1]).toBeUndefined();
      expect(wrapper.vm.userResponses[2]).toBeUndefined();
    });

    it("creates responses array with correct length", () => {
      wrapper.vm.restart();
      expect(wrapper.vm.userResponses.length).toBe(3);
    });

    it("clears any error state", () => {
      wrapper.vm.next(); // triggers error
      wrapper.vm.restart();
      expect(wrapper.vm.errorMessage).toBe("");
      expect(wrapper.vm.errorIndex).toBe(-1);
    });
  });

  describe("score", () => {
    it("returns the most frequent response when one dominates", () => {
      wrapper.vm.userResponses = ["Low Risk", "Low Risk", "High Risk"];
      expect(wrapper.vm.score()).toBe("Low Risk");
    });

    it("returns the value when all answers are the same", () => {
      wrapper.vm.userResponses = ["High Risk", "High Risk", "High Risk"];
      expect(wrapper.vm.score()).toBe("High Risk");
    });

    it("returns Medium Risk when it is the mode", () => {
      wrapper.vm.userResponses = ["Medium Risk", "Medium Risk", "Low Risk"];
      expect(wrapper.vm.score()).toBe("Medium Risk");
    });

    it("returns the first mode encountered when there is a tie", () => {
      wrapper.vm.userResponses = ["Low Risk", "Medium Risk", "High Risk"];
      // When all have count 1, the first element wins (mode algorithm keeps first maxEl)
      expect(wrapper.vm.score()).toBe("Low Risk");
    });
  });

  describe("progressPercent", () => {
    it("returns 0 at the first question", () => {
      expect(wrapper.vm.progressPercent).toBe(0);
    });

    it("returns correct percentage after advancing", () => {
      wrapper.vm.userResponses[0] = "Low Risk";
      wrapper.vm.next();
      // 1 out of 3 questions = ~33.33%
      expect(wrapper.vm.progressPercent).toBeCloseTo(33.33, 1);
    });

    it("returns correct percentage at the second question", () => {
      wrapper.vm.userResponses[0] = "Low Risk";
      wrapper.vm.next();
      wrapper.vm.userResponses[1] = "Low Risk";
      wrapper.vm.next();
      // 2 out of 3 questions = ~66.67%
      expect(wrapper.vm.progressPercent).toBeCloseTo(66.67, 1);
    });

    it("returns 100 when all questions are answered", () => {
      wrapper.vm.userResponses[0] = "Low Risk";
      wrapper.vm.next();
      wrapper.vm.userResponses[1] = "Low Risk";
      wrapper.vm.next();
      wrapper.vm.userResponses[2] = "Low Risk";
      wrapper.vm.next();
      expect(wrapper.vm.progressPercent).toBe(100);
    });

    it("returns 0 when quiz has no questions", () => {
      wrapper.vm.quiz = { questions: [] };
      expect(wrapper.vm.progressPercent).toBe(0);
    });
  });
});
