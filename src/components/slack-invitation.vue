<template>
  <div class="slack-invitation">
    <p>Join the conversation at</p>
    <img src="../assets/images/slack-icon.png" alt="Slack">
    <a href="http://slack.lansing.codes/" target="_blank">
      <strong>slack.lansing.codes</strong>
    </a>
  </div>
</template>

<style lang="scss" scoped>
  @import '../scss/globals';

  $slack-invitation-line-height: 20px;
  $slack-invitation-font-size: 18px;

  .slack-invitation {
    width: 100%;
    line-height: $slack-invitation-line-height;
    position: absolute;
    bottom: 0;
    text-align: center;
    pointer-events: none;

    a {
      pointer-events: all;
    }

    img {
      height: $slack-invitation-line-height;
      vertical-align: middle;
    }
    strong {
      line-height: $slack-invitation-line-height;
      font-size: $slack-invitation-font-size;
      vertical-align: middle;
    }
  }
</style>
