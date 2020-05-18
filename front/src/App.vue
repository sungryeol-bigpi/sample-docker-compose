<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="50px" height="50px" />
    <input type="text" v-model="targetUrl" />
    <p>
      request status:
      <span :class="apiState">{{apiState}}</span>
    </p>
    <button @click="onRequest">request</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data: () => ({
    apiState: 'init',
    targetUrl: 'http://localhost:3000',
  }),
  methods: {
    async onRequest() {
      const url = `${this.targetUrl}/ping`;
      this.apiState = 'requesting';
      try {
        const req = await axios.get(url);
        if (req.data.message !== 'success') throw Error('fail!');
        this.apiState = 'success';
      } catch (err) {
        this.apiState = 'fail';
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.success {
  color: green;
}
.fail {
  color: red;
}
</style>
