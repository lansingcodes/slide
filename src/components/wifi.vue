<template>
  <div class="wifi-container">
    <h2>WIFI</h2>
    <table>
      <tbody>
        <tr>
          <th>ssid</th>
          <td>
            <dynamic-invisible-textarea
              name="wifiSSID"
              default-value="300 Room"
            ></dynamic-invisible-textarea>
          </td>
        </tr>
        <tr>
          <th>pw</th>
          <td>
            <dynamic-invisible-textarea
              name="wifiPW"
              default-value="success!"
            ></dynamic-invisible-textarea>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  // COMPONENTS
  import DynamicInvisibleTextarea from './dynamic-invisible-textarea'

  export default {
    // COMPONENTS
    components: {
      DynamicInvisibleTextarea
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/globals';

  // HEADING
  $wifi-heading-margin-bottom: 10px;
  $wifi-heading-font-size: 20px;
  $wifi-headding-font-weight: $default-font-weight;

  // LABELS
  $wifi-label-font-weight: $default-font-weight;

  // FIELDS
  $wifi-field-width: 100px;
  $wifi-field-font-weight: $bolded-font-weight;

  .wifi-container {
    position: absolute;
    top: 0;
    right: 0;

    h2 {
      line-height: 1;
      margin-top: 0;
      margin-bottom: $wifi-heading-margin-bottom;
      font-size: $wifi-heading-font-size;
      font-weight: $wifi-headding-font-weight;
      text-align: right;
    }

    th, td textarea {
      text-align: right;
      vertical-align: middle;
    }

    th {
      font-weight: $wifi-label-font-weight;
    }

    td textarea {
      width: $wifi-field-width;
      font-weight: $wifi-field-font-weight;
    }
  }
</style>
