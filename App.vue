<template>

  <app-navigator></app-navigator>

</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";

import Inicio from "./inicio.vue";
import Lista from "./lista.vue";
import DetalheLista from "./detalheLista.vue";
import CadItens from "./cadItens.vue";
import SelItens from "./selItens.vue";
import AltLista from "./altlista.vue";
import AltItens from "./altitens.vue";

const StackNavigator = createStackNavigator(
  {
    Home: Inicio,
    Lista:Lista,
    DetalheLista:DetalheLista,
    CadItens:CadItens, 
    SelItens:SelItens,
    AltLista:AltLista,
    AltItens:AltItens,
  },
 {
    initialRouteName: 'Home',
    headerMode: "none"
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
}
</script>

</script>

<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.text-color-primary {
  color: blue;
}
</style>
