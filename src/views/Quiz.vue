<template>
  <div id="app" v-cloak>
    <v-content>
      <section>
        <v-parallax :src="require('@/assets/dark.jpg')" height="600">
          <v-layout column align-center justify-center class="white--text">
            <div v-if="!showQuiz">
              <h1 class="white--text mb-2 display-1 text-xs-center">RISK CALCULATOR</h1>

              <div
                class="subheading mb-3 text-xs-center"
              >Use this calculator to find out the risk associated to scenarios based on anal sex and where condoms are not being used.</div>

              <v-btn
                class="blue lighten-2 mt-5"
                dark
                large
                v-on:click="showQuizMethod"
              >How safe are you?</v-btn>
            </div>
            <div v-if="showQuiz" class="large-12 columns">
              <h1>{{ quiz.title }}</h1>

              <div class="callout">
                <div :key="index" v-for="(question, index) in quiz.questions">
                  <!-- Hide all questions, show only the one with index === to current question index -->
                  <div v-show="index === questionIndex">
                    <h3>{{ question.text }}</h3>

                    <ol>
                      <!-- for each response of the current question -->
                      <li v-for="response in question.responses">
                        <label>
                          <input
                            type="radio"
                            v-bind:value="response.value"
                            v-bind:name="index"
                            v-model="userResponses[index]"
                          >
                          {{response.text}}
                        </label>
                      </li>
                    </ol>

                    <!-- The two navigation buttons -->
                    <!-- Note: prev is hidden on first question -->
                    <v-btn
                      class="blue lighten-2 mt-5"
                      dark
                      v-if="questionIndex > 0"
                      v-on:click="prev"
                    >prev</v-btn>

                    <v-btn class="blue lighten-2 mt-5" dark v-on:click="next">next</v-btn>
                  </div>
                </div>

                <!-- Last page, quiz is finished, display result -->
                <div v-show="questionIndex === quiz.questions.length">
                  <h3>Your Results</h3>
                  <p>You are: {{ score() }}</p>
                </div>
              </div>
            </div>
          </v-layout>
        </v-parallax>
      </section>
    </v-content>
  </div>
</template>

<script>
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader

export default {
  name: "home",
  //components: {}
  data() {
    return {
      quiz: {},
      questionIndex: 0,
      userResponses: Array(),
      showQuiz: false
    };
  },
  methods: {
    // Go to next question
    next: function() {
      this.questionIndex++;
      console.log(this.userResponses);
    },
    // Go to previous question
    prev: function() {
      this.questionIndex--;
    },

    showQuizMethod: function() {
      this.showQuiz = true;
    },

    score: function() {
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
    }
  },

  created: function() {
    this.quiz = {
      title: "Risk Calculator",

      questions: [
        {
          text: "Your HIV status?",
          responses: [
            {
              text: "I am not sure",
              value: "Medium Risk"
            },
            {
              text: "Negative",
              value: "Low Risk"
            },
            {
              text: "Positive",
              value: "High Risk"
            }
          ]
        },
        {
          text: "Your partners HIV status?",
          responses: [
            {
              text: "I am not sure",
              value: "Medium Risk"
            },
            {
              text: "Negative",
              value: "Low Risk"
            },
            {
              text: "Positive",
              value: "High Risk"
            }
          ]
        },
        {
          text: "What are the ways you are reducing the risk?",
          responses: [
            {
              text: "Undetectable",
              value: "Low Risk"
            },
            {
              text: "Pulling out",
              value: "High Risk"
            },
            {
              text: "PrEP (Pre-Exposure Prophylaxis)",
              value: "Medium Risk"
            }
          ]
        }
      ]
    };
  }
};
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