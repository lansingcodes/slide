<template>
  <div class="slack-invitation">
    <p>Join the conversation at</p>
    <img src="../assets/images/slack-icon.png" alt="Slack">
    <a href="http://slack.lansing.codes/" target="_blank">
      <strong>slack.lansing.codes</strong>
    </a>
  </div>
</template>

<style scoped>
  .slack-invitation {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    pointer-events: none;
    line-height: 20px;
  }
  .slack-invitation a {
    pointer-events: all;
  }
  .slack-invitation img, .slack-invitation strong {
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    vertical-align: middle;
  }
</style>
