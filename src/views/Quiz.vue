<template>
  <div id="app" v-cloak>
    <v-main>
      <section>
        <v-parallax :src="require('@/assets/dark.jpg')">
          <v-row
            align="center"
            justify="center"
            class="text-white"
            style="height: 600px"
          >
            <v-col cols="12" class="text-center">
              <div v-if="!showQuiz">
                <h1 class="text-white mb-2 text-h4 text-center">
                  RISK CALCULATOR
                </h1>

                <div class="text-subtitle-1 mb-3 text-center">
                  Use this calculator to find out the risk associated to
                  scenarios based on anal sex and where condoms are not being
                  used.
                </div>

                <v-btn
                  class="bg-blue-lighten-2 mt-5"
                  dark
                  size="large"
                  v-on:click="showQuizMethod"
                  >How safe are you?</v-btn
                >
              </div>
              <div v-if="showQuiz">
                <v-card
                  class="mx-auto pa-6"
                  max-width="600"
                  elevation="8"
                  rounded="lg"
                >
                  <v-card-title class="text-h5 text-center mb-2">
                    {{ quiz.title }}
                  </v-card-title>

                  <v-card-text>
                    <div
                      :key="index"
                      v-for="(question, index) in quiz.questions"
                    >
                      <div v-show="index === questionIndex">
                        <div class="text-h6 mb-2 text-left">
                          Question {{ index + 1 }} of
                          {{ quiz.questions.length }}
                        </div>
                        <v-divider class="mb-4"></v-divider>
                        <div class="text-h6 mb-4 text-left">
                          {{ question.text }}
                        </div>

                        <v-radio-group
                          v-model="userResponses[index]"
                          :error-messages="
                            errorIndex === index ? errorMessage : ''
                          "
                          @update:modelValue="clearError"
                        >
                          <v-radio
                            v-for="response in question.responses"
                            :key="response.text"
                            :label="response.text"
                            :value="response.value"
                            color="blue-lighten-2"
                            class="mb-2"
                          ></v-radio>
                        </v-radio-group>

                        <v-card-actions class="justify-center mt-2">
                          <v-btn
                            variant="outlined"
                            color="blue-lighten-2"
                            v-if="questionIndex > 0"
                            v-on:click="prev"
                            prepend-icon="mdi-arrow-left"
                            >Previous</v-btn
                          >

                          <v-btn
                            color="blue-lighten-2"
                            variant="flat"
                            v-on:click="next"
                            append-icon="mdi-arrow-right"
                            >{{
                              questionIndex === quiz.questions.length - 1
                                ? "See Results"
                                : "Next"
                            }}</v-btn
                          >
                        </v-card-actions>
                      </div>
                    </div>

                    <!-- Last page, quiz is finished, display result -->
                    <div v-show="questionIndex === quiz.questions.length">
                      <v-icon size="64" color="blue-lighten-2" class="mb-4"
                        >mdi-chart-bar</v-icon
                      >
                      <div class="text-h5 mb-4">Your Results</div>
                      <v-chip size="x-large" color="blue-lighten-2" label>
                        {{ score() }}
                      </v-chip>
                      <v-card-actions class="justify-center mt-6">
                        <v-btn
                          variant="outlined"
                          color="blue-lighten-2"
                          v-on:click="restart"
                          prepend-icon="mdi-restart"
                          >Take Again</v-btn
                        >
                      </v-card-actions>
                    </div>
                  </v-card-text>

                  <v-progress-linear
                    :model-value="progressPercent"
                    color="blue-lighten-2"
                    height="6"
                    rounded
                    class="mt-2"
                  ></v-progress-linear>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-parallax>
      </section>
    </v-main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "home",
  data() {
    return {
      quiz: {} as {
        title: string;
        questions: {
          text: string;
          responses: { text: string; value: string }[];
        }[];
      },
      questionIndex: 0,
      userResponses: Array<string | undefined>(),
      showQuiz: false,
      errorMessage: "",
      errorIndex: -1,
    };
  },
  computed: {
    progressPercent(): number {
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

    score: function (): string {
      //find the highest occurence in responses
      const modeMap: Record<string, number> = {};
      let maxEl = this.userResponses[0] ?? "";
      let maxCount = 1;
      for (let i = 0; i < this.userResponses.length; i++) {
        const el = this.userResponses[i];
        if (el == null) continue;
        if (modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;
        if (modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }
      return maxEl;
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
});
</script>

<style scoped>
#app {
  min-height: 100vh;

  background: #bbc7ce;
}

#app > .row {
  background: #fff;
}

h1 {
  margin-bottom: 20px;
}

[v-cloak] {
  display: none;
}
</style>
