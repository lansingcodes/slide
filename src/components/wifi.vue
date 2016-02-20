<template>
  <div class="wifi-container">
    <h2>WIFI</h2>
    <table>
      <tbody>
        <tr>
          <th>ssid</th>
          <td>
            <dynamic-invisible-textarea
              default-value="300 Room"
            ></dynamic-invisible-textarea>
          </td>
        </tr>
        <tr>
          <th>pw</th>
          <td>
            <dynamic-invisible-textarea
              default-value="success!"
            ></dynamic-invisible-textarea>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import DynamicInvisibleTextarea from './dynamic-invisible-textarea'

  export default {
    components: {
      DynamicInvisibleTextarea
    }
  }
</script>

<style scoped>
  .wifi-container h2 {
    line-height: 1;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 300;
    text-align: right;
  }
  .wifi-container {
    position: absolute;
    top: 0;
    right: 0;
  }
  .wifi-container th, .wifi-container td textarea {
    text-align: right;
    vertical-align: middle;
  }
  .wifi-container th {
    font-weight: 300;
  }
  .wifi-container td textarea {
    font-weight: 400;
  }
  .wifi-container td textarea {
    width: 100px;
  }
</style>
