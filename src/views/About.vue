<template>
  <div class="about">
    <v-container class="about__container">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-card class="about__card elevation-3 rounded-xl mb-8">
            <div class="about__header bg-primary text-white pa-8 pa-md-10">
              <h1
                class="about__main-title text-h3 text-md-h2 font-weight-bold mb-4"
              >
                Why it is important to get tested
              </h1>
              <h2
                class="about__sub-title text-h5 text-md-h4 font-weight-light opacity-80"
              >
                Why get tested for HIV
              </h2>
            </div>

            <v-card-text class="about__content pa-8 pa-md-10 text-body-1">
              <section class="about__section mb-10">
                <h3
                  class="about__section-title text-h4 font-weight-medium mb-2 text-primary"
                >
                  GETTING TESTED FOR HIV
                </h3>
                <h4
                  class="about__section-subtitle text-h6 font-weight-regular mb-4 text-medium-emphasis"
                >
                  THE IMPORTANCE OF TESTING
                </h4>
                <p class="about__text mb-4">
                  Condomless anal sex, condomless vaginal sex, or sharing
                  injecting equipment are all activities that can put you at
                  risk of HIV by allowing bodily fluids (e.g. blood, semen,
                  rectal fluid, pre-ejaculatory fluid (pre-cum) or vaginal
                  fluid) to enter your body, and possibly your bloodstream.
                </p>
                <p class="about__text">
                  Being tested regularly for HIV is simple, quick and made
                  convenient with multiple testing sites in major cities across
                  Australia as well as testing being made available through
                  General Practitioners. There are also a number of
                  community-based testing services around the country, including
                  those that are led by peers.
                </p>
              </section>

              <v-divider class="mb-10"></v-divider>

              <section class="about__section mb-10">
                <h3
                  class="about__section-title text-h4 font-weight-medium mb-4 text-primary"
                >
                  REGULARITY IS KEY
                </h3>
                <p class="about__text mb-4">
                  Gay men and other men who have sex with men are recommended to
                  have a full sexual health check (tests for all STIs, including
                  HIV), at least once a year, and up to four times a year if
                  they are in one or more of these categories:
                </p>
                <v-list class="about__list bg-transparent" lines="one">
                  <v-list-item class="about__list-item px-0 mb-2">
                    <template v-slot:prepend>
                      <v-icon color="primary" class="mr-3"
                        >mdi-check-circle-outline</v-icon
                      >
                    </template>
                    <v-list-item-title
                      class="about__list-text text-wrap text-body-1"
                      >have had any condomless anal sex</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item class="about__list-item px-0 mb-2">
                    <template v-slot:prepend>
                      <v-icon color="primary" class="mr-3"
                        >mdi-check-circle-outline</v-icon
                      >
                    </template>
                    <v-list-item-title
                      class="about__list-text text-wrap text-body-1"
                      >have more than 10 sexual partners in 6
                      months</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item class="about__list-item px-0 mb-2">
                    <template v-slot:prepend>
                      <v-icon color="primary" class="mr-3"
                        >mdi-check-circle-outline</v-icon
                      >
                    </template>
                    <v-list-item-title
                      class="about__list-text text-wrap text-body-1"
                      >participate in group sex</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item class="about__list-item px-0 mb-2">
                    <template v-slot:prepend>
                      <v-icon color="primary" class="mr-3"
                        >mdi-check-circle-outline</v-icon
                      >
                    </template>
                    <v-list-item-title
                      class="about__list-text text-wrap text-body-1"
                      >use crystal meth.</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </section>

              <v-divider class="mb-10"></v-divider>

              <section class="about__section mb-10">
                <h3
                  class="about__section-title text-h4 font-weight-medium mb-4 text-primary"
                >
                  UNDERSTANDING HIV RAPID TESTING
                </h3>
                <p class="about__text mb-4">
                  Traditional HIV testing, where blood is drawn and sent to the
                  laboratory for testing can take several days or more to get a
                  result. Rapid Testing uses a pinprick of the finger (or oral
                  fluid, depending on the test) and returns results within 10 to
                  20 minutes.
                </p>
                <p class="about__text">
                  Most rapid HIV tests detect HIV antibodies; however some can
                  also test for the presence of the virus itself. A ‘reactive’
                  (or preliminary positive) result on a rapid HIV test is not a
                  HIV diagnosis, as rapid HIV tests produce a small number of
                  false positive results. For this reason,
                  <strong class="font-weight-bold"
                    >a reactive rapid HIV test result must always be confirmed
                    by laboratory tests</strong
                  >.
                </p>
              </section>

              <v-divider class="mb-10"></v-divider>

              <section class="about__section mb-10">
                <h3
                  class="about__section-title text-h4 font-weight-medium mb-4 text-primary"
                >
                  HIV SELF-TESTING
                </h3>
                <p class="about__text mb-4">
                  HIV self-testing (also known as home-based testing) is where
                  HIV testing is conducted in the home or similar environment by
                  a community member. They use the same technology as rapid HIV
                  tests. HIV self-testing will be an important testing option
                  for many people in Australia. There are currently no HIV
                  self-testing kits approved by Australia’s Therapeutic Goods
                  Administration (TGA). AFAO and other HIV organisations are
                  hopeful Australia will have HIV self-testing in the near
                  future.
                </p>
                <p class="about__text mb-4">
                  Although no HIV self-tests have been approved in Australia, it
                  is possible to purchase tests over the internet. If you are
                  considering this option ensure that you select a test that is:
                </p>
                <v-list class="about__list bg-transparent mb-6" lines="one">
                  <v-list-item class="about__list-item px-0 mb-2">
                    <template v-slot:prepend>
                      <v-icon color="primary" class="mr-3"
                        >mdi-check-circle-outline</v-icon
                      >
                    </template>
                    <v-list-item-title
                      class="about__list-text text-body-1 text-wrap"
                      >safe and credible</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item class="about__list-item px-0 mb-2">
                    <template v-slot:prepend>
                      <v-icon color="primary" class="mr-3"
                        >mdi-check-circle-outline</v-icon
                      >
                    </template>
                    <v-list-item-title
                      class="about__list-text text-body-1 text-wrap"
                      >approved by relevant authorities in comparable
                      countries</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item class="about__list-item px-0 mb-2 align-start">
                    <template v-slot:prepend>
                      <v-icon color="primary" class="mr-3 mt-1"
                        >mdi-check-circle-outline</v-icon
                      >
                    </template>
                    <v-list-item-title
                      class="about__list-text text-body-1 text-wrap"
                    >
                      <div class="mb-2">
                        approved specifically for home use, so the test:
                      </div>
                      <ul class="about__nested-list ml-5 text-medium-emphasis">
                        <li class="mb-1">
                          is designed to be able to be used by people at home
                          (rather than clinicians), and
                        </li>
                        <li>
                          has instructions for home use (rather than
                          instructions for a clinician which may be difficult to
                          understand)
                        </li>
                      </ul>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
                <v-alert
                  type="info"
                  variant="tonal"
                  class="about__alert rounded-lg"
                  icon="mdi-information"
                >
                  Some HIV test kits sold online are advertised for home use,
                  but the product supplied is for use by clinicians (including
                  instructions for clinicians).
                </v-alert>
              </section>

              <v-divider class="mb-10"></v-divider>

              <section class="about__section mb-10">
                <h3
                  class="about__section-title text-h4 font-weight-medium mb-4 text-primary"
                >
                  WHERE TO TEST
                </h3>
                <p class="about__text mb-4">
                  You can find details for a range of clinics where you can get
                  tested, including public sexual health clinics, on the
                  <a
                    href="http://www.thedramadownunder.info/clinics/"
                    target="_blank"
                    rel="noopener"
                    class="about__link text-primary font-weight-bold"
                    >Drama Downunder</a
                  >,
                  <a
                    href="http://endinghiv.org.au/"
                    target="_blank"
                    rel="noopener"
                    class="about__link text-primary font-weight-bold"
                    >Ending HIV</a
                  >
                  and
                  <a
                    href="http://www.timetotest.org.au/"
                    target="_blank"
                    rel="noopener"
                    class="about__link text-primary font-weight-bold"
                    >Time to Test</a
                  >
                  websites. Although these websites are targeted to gay men and
                  other men who have sex with men, most testing services listed
                  on these websites see all people. The Ending HIV and Time to
                  Test websites also indicate which services offer rapid
                  testing.
                </p>
                <p class="about__text mb-4">
                  Sexual health clinics provide free and confidential testing
                  services. You can download the
                  <em class="font-italic"
                    >Register of Public Sexual Health Clinics</em
                  >
                  from
                  <a
                    href="https://www.racp.edu.au/fellows/resources/sexual-health-medicine-resources"
                    target="_blank"
                    rel="noopener"
                    class="about__link text-primary font-weight-bold"
                    >here</a
                  >.
                </p>
                <p class="about__text mb-4">
                  If you feel more comfortable being tested by a gay friendly
                  doctor, your local
                  <a
                    href="https://www.afao.org.au/about-afao/members/"
                    class="about__link text-primary font-weight-bold"
                    >AIDS Council</a
                  >
                  can advise on where to find one.
                </p>
                <p class="about__text">
                  Aboriginal and Torres Strait Islander people can find details
                  of where to test on the
                  <a
                    href="http://bettertoknow.org.au/"
                    target="_blank"
                    rel="noopener"
                    class="about__link text-primary font-weight-bold"
                    >Better to Know</a
                  >
                  website.
                </p>
              </section>

              <v-divider class="mb-10"></v-divider>

              <section class="about__section">
                <h3
                  class="about__section-title text-h4 font-weight-medium mb-4 text-primary"
                >
                  SIGNS &amp; SYMPTOMS
                </h3>
                <p class="about__text mb-4">
                  The process of becoming HIV positive is referred to as
                  seroconversion. When this occurs some people exhibit signs and
                  symptoms known as a ‘seroconversion illness’.
                </p>
                <p class="about__text mb-6">
                  While they may be easy to overlook, signs may include a rash,
                  fever, aching body, fatigue or a simple persistent flu-like
                  illness.
                </p>
                <v-alert
                  type="warning"
                  variant="tonal"
                  class="about__alert rounded-lg"
                  icon="mdi-alert"
                  border="start"
                >
                  It is important to note that many people do not present
                  symptoms shortly after exposure to HIV. For this reason, it is
                  important to test regularly in order to be aware of your HIV
                  and sexual health status as often as possible.
                </v-alert>
              </section>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style lang="scss" scoped>
.about {
  background-color: #f5f7fa;
  min-height: 100vh;

  &__container {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  &__card {
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    &:hover {
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
    }
  }

  &__header {
    background: linear-gradient(
      135deg,
      var(--v-theme-primary, #1867c0) 0%,
      #0d47a1 100%
    );
    position: relative;
    overflow: hidden;

    // Add a subtle pattern/overlay to the header
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: radial-gradient(
        circle at top right,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 60%
      );
      pointer-events: none;
    }
  }

  &__content {
    color: rgba(0, 0, 0, 0.87);
  }

  &__text,
  &__list-text {
    line-height: 1.8;
  }

  &__link {
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    padding: 0 2px;
    border-bottom: 2px solid transparent;

    &:hover {
      border-bottom-color: currentColor;
      opacity: 0.8;
    }
  }

  &__nested-list {
    padding-left: 1.5rem;
    list-style-type: disc;

    li {
      line-height: 1.6;
    }
  }

  &__alert {
    border-width: 2px;
  }
}
</style>
