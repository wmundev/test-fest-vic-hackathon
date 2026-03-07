<template>
  <div class="quiz bg-surface" v-cloak>
    <!-- Intro Section -->
    <section
      v-if="!showQuiz"
      class="quiz__hero bg-primary text-white position-relative d-flex align-center min-vh-100"
    >
      <v-container class="quiz__hero-container py-16 py-md-24">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" lg="6" class="text-center">
            <v-avatar color="white" size="100" class="mb-8 elevation-4">
              <v-icon size="60" color="primary">mdi-shield-check</v-icon>
            </v-avatar>

            <h1
              class="quiz__main-title text-h3 text-md-h2 font-weight-bold mb-6"
            >
              RISK CALCULATOR
            </h1>

            <p
              class="quiz__subtitle text-h6 font-weight-light opacity-80 mb-10"
            >
              Use this calculator to find out the risk associated to scenarios
              based on anal sex and where condoms are not being used.
            </p>

            <v-btn
              class="quiz__start-btn bg-white text-primary px-8 text-button font-weight-bold elevation-4 rounded-pill"
              size="x-large"
              v-on:click="showQuizMethod"
            >
              How safe are you?
              <v-icon right class="ml-2">mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Quiz Section -->
    <section
      v-if="showQuiz"
      class="quiz__content py-16 min-vh-100 bg-grey-lighten-4 d-flex align-center"
    >
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card
              class="quiz__card elevation-6 rounded-xl overflow-hidden transition-all"
            >
              <div
                class="quiz__card-header bg-primary pa-6 text-center text-white"
              >
                <h2 class="text-h5 font-weight-medium mb-0">
                  {{ quiz.title }}
                </h2>
              </div>

              <v-progress-linear
                :model-value="progressPercent"
                color="secondary"
                height="6"
                class="quiz__progress"
              ></v-progress-linear>

              <v-card-text class="pa-6 pa-md-8 text-body-1">
                <div :key="index" v-for="(question, index) in quiz.questions">
                  <div
                    v-show="index === questionIndex"
                    class="quiz__question-block"
                  >
                    <div class="d-flex justify-space-between align-center mb-4">
                      <span
                        class="quiz__question-counter text-button font-weight-bold text-primary"
                      >
                        Question {{ index + 1 }} of
                        {{ quiz.questions.length }}
                      </span>
                    </div>

                    <h3
                      class="quiz__question-text text-h5 font-weight-medium mb-6 text-on-surface"
                    >
                      {{ question.text }}
                    </h3>

                    <v-radio-group
                      v-model="userResponses[index]"
                      :error-messages="errorIndex === index ? errorMessage : ''"
                      @update:modelValue="clearError"
                      class="quiz__radio-group"
                    >
                      <v-card
                        v-for="response in question.responses"
                        :key="response.text"
                        variant="outlined"
                        class="quiz__option-card mb-3 transition-all"
                        :class="{
                          'quiz__option-card--selected bg-primary-lighten-5 border-primary':
                            userResponses[index] === response.value,
                        }"
                        @click="
                          userResponses[index] = response.value;
                          clearError();
                        "
                      >
                        <v-card-text class="pa-2 pa-sm-3 d-flex align-center">
                          <v-radio
                            :label="response.text"
                            :value="response.value"
                            color="primary"
                            class="quiz__radio w-100"
                            hide-details
                          ></v-radio>
                        </v-card-text>
                      </v-card>
                    </v-radio-group>

                    <v-card-actions
                      class="quiz__actions pa-0 mt-8 pt-4 border-t"
                    >
                      <v-btn
                        variant="text"
                        color="medium-emphasis"
                        class="quiz__btn px-4 font-weight-bold text-none"
                        v-if="questionIndex > 0"
                        v-on:click="prev"
                        prepend-icon="mdi-arrow-left"
                      >
                        Previous
                      </v-btn>

                      <v-spacer></v-spacer>

                      <v-btn
                        color="primary"
                        variant="flat"
                        class="quiz__btn px-6 font-weight-bold text-none rounded-pill"
                        v-on:click="next"
                        append-icon="mdi-arrow-right"
                      >
                        {{
                          questionIndex === quiz.questions.length - 1
                            ? "See Results"
                            : "Next"
                        }}
                      </v-btn>
                    </v-card-actions>
                  </div>
                </div>

                <!-- Results Page -->
                <div
                  v-show="questionIndex === quiz.questions.length"
                  class="quiz__results text-center py-6"
                >
                  <v-avatar
                    color="primary-lighten-5"
                    size="100"
                    class="mb-6 mx-auto elevation-1"
                  >
                    <v-icon size="50" color="primary">mdi-chart-line</v-icon>
                  </v-avatar>

                  <h3 class="text-h4 font-weight-bold mb-2 text-on-surface">
                    Your Results
                  </h3>
                  <p class="text-body-1 text-medium-emphasis mb-8">
                    Based on your answers, here is your estimated risk level:
                  </p>

                  <v-chip
                    size="x-large"
                    class="quiz__result-chip px-8 py-6 text-h5 font-weight-bold elevation-2 mb-10"
                    :color="getResultColor(score())"
                  >
                    {{ score() }}
                  </v-chip>

                  <v-divider class="mb-8"></v-divider>

                  <v-card-actions class="justify-center">
                    <v-btn
                      variant="outlined"
                      color="primary"
                      class="quiz__btn px-6 font-weight-bold rounded-pill"
                      size="large"
                      v-on:click="restart"
                      prepend-icon="mdi-restart"
                    >
                      Take Again
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "QuizView",
  data() {
    return {
      quiz: {},
      questionIndex: 0,
      userResponses: Array(),
      showQuiz: false,
      errorMessage: "",
      errorIndex: -1,
    };
  },
  computed: {
    progressPercent() {
      if (!this.quiz.questions || this.quiz.questions.length === 0) return 0;
      return (this.questionIndex / this.quiz.questions.length) * 100;
    },
  },
  methods: {
    // Go to next question
    next: function () {
      if (this.userResponses[this.questionIndex] == null) {
        this.errorMessage = "Please select an answer before continuing.";
        this.errorIndex = this.questionIndex;
        return;
      }
      this.clearError();
      this.questionIndex++;
      console.log(this.userResponses); // eslint-disable-line no-console
    },
    // Go to previous question
    prev: function () {
      this.clearError();
      this.questionIndex--;
    },

    clearError: function () {
      this.errorMessage = "";
      this.errorIndex = -1;
    },

    showQuizMethod: function () {
      this.showQuiz = true;
    },

    restart: function () {
      this.questionIndex = 0;
      this.userResponses = Array.from({ length: this.quiz.questions.length });
      this.clearError();
    },

    score: function () {
      //find the highest occurence in responses
      var modeMap = {};
      var maxEl = this.userResponses[0],
        maxCount = 1;
      for (var i = 0; i < this.userResponses.length; i++) {
        var el = this.userResponses[i];
        if (modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;
        if (modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }
      return maxEl;
    },

    getResultColor(resultText) {
      if (!resultText) return "primary";
      const lower = resultText.toLowerCase();
      if (lower.includes("high")) return "error";
      if (lower.includes("medium")) return "warning";
      if (lower.includes("low")) return "success";
      return "primary";
    },
  },

  created: function () {
    this.quiz = {
      title: "Risk Calculator",

      questions: [
        {
          text: "Your HIV status?",
          responses: [
            {
              text: "I am not sure",
              value: "Medium Risk",
            },
            {
              text: "Negative",
              value: "Low Risk",
            },
            {
              text: "Positive",
              value: "High Risk",
            },
          ],
        },
        {
          text: "Your partners HIV status?",
          responses: [
            {
              text: "I am not sure",
              value: "Medium Risk",
            },
            {
              text: "Negative",
              value: "Low Risk",
            },
            {
              text: "Positive",
              value: "High Risk",
            },
          ],
        },
        {
          text: "What are the ways you are reducing the risk?",
          responses: [
            {
              text: "Undetectable",
              value: "Low Risk",
            },
            {
              text: "Pulling out",
              value: "High Risk",
            },
            {
              text: "PrEP (Pre-Exposure Prophylaxis)",
              value: "Medium Risk",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.quiz {
  height: 100%;

  &__hero {
    background: linear-gradient(
      135deg,
      var(--v-theme-primary, #1867c0) 0%,
      #0d47a1 100%
    );
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: radial-gradient(
        circle at 50% 100%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 60%
      );
      pointer-events: none;
    }
  }

  &__hero-container {
    position: relative;
    z-index: 1;
  }

  &__start-btn {
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
    }
  }

  &__content {
    background-image: radial-gradient(
      var(--v-theme-grey-lighten-2) 1px,
      transparent 1px
    );
    background-size: 24px 24px;
    background-color: var(--v-theme-grey-lighten-4);
  }

  &__card {
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  &__card-header {
    background: linear-gradient(
      135deg,
      var(--v-theme-primary, #1867c0) 0%,
      #1565c0 100%
    );
  }

  &__option-card {
    border-width: 2px !important;
    border-color: rgba(0, 0, 0, 0.12) !important;
    cursor: pointer;

    &:hover:not(.quiz__option-card--selected) {
      border-color: rgba(0, 0, 0, 0.24) !important;
      background-color: rgba(0, 0, 0, 0.02);
    }

    &--selected {
      border-color: var(--v-theme-primary) !important;
    }
  }

  &__radio {
    // Ensures the radio takes full width for better click area
    ::v-deep .v-label {
      opacity: 1;
      color: rgba(0, 0, 0, 0.87);
      font-weight: 500;
    }
  }

  &__result-chip {
    height: 64px !important;
    border-radius: 32px;
  }

  .min-vh-100 {
    min-height: calc(
      100vh - 130px
    ); // Adjusting for typical app bar and footer height
  }

  .transition-all {
    transition: all 0.3s ease;
  }

  [v-cloak] {
    display: none;
  }
}
</style>
