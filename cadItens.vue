<template>
  <SafeAreaView style="{styles.container}">
    <ScrollView style="{styles.scrollView}">
        <view class="container">
            <cabecalho titulo="Cadastro de Itens">
                <view class="topo">
                    <touchable-opacity :on-press="voltaHome">
                        <text class="botao">INÍCIO</text>
                    </touchable-opacity>
                    <touchable-opacity :on-press="() => voltaDetalhe(cod)" v-if="tela=='busca'">
                      <text class="botao">Voltar</text>
                    </touchable-opacity>
                </view>
            </cabecalho>

            <text class="labeltext">Informe o item:</text>
            <view class="resto">
              <text-input
                class="inputtext"
                :style="{
                  height: 40,
                  borderColor: 'blue',
                  borderWidth: 1,
                  margin: 20,
                }"
                v-model="nomeitem"
              />
              <touchable-opacity :on-press="gravaItem">
                <text class="botaogravar">Gravar</text>
              </touchable-opacity>
            </view>

            <touchable-opacity
              v-for="item in dados"
              :key="item.codigo"
              :on-press="() => abreItens(item.codigo, item.descricao)"
              class="listas"
            >
              <Text class="listanome">{{ item.codigo }}:{{ item.descricao }}</Text>
            </touchable-opacity>
       </view>
    </ScrollView>
  </SafeAreaView>
</template>

<script>
import Itens from "./itens.js";
import Cabecalho from './cabecalho.vue'
import Rodape from './rodape.vue'

export default {
  components: { Cabecalho,Rodape },
  data() {
    return {
      tela: this.navigation.getParam('tela'),
      cod: this.navigation.getParam('codigo'),
      nomeitem: "",
      itens: Itens,
      dados: [],
      loading: false,
    };
  },
  props: {
    navigation: {
      type: Object,
    },
  },
  methods: {
    voltaHome() {
      this.navigation.navigate("Home");
    },
    voltaDetalhe(cod) {
      this.navigation.navigate("SelItens",{codigo:cod});
    },
    gravaItem() {
      if (this.nomeitem !=""){
        this.itens
          .create({ descricao: this.nomeitem })
          .then((codigo) => console.log("Criado: " + codigo))
          .catch((err) => alert(err));
        this.nomeitem = "";
      }else{
        alert('Informe o nome de um item!')
      }
      //this.navigation.navigate("CadItens");
    },
    abreItens(id, desc) {
      this.navigation.navigate("AltItens", { codigo: id, descricao: desc });
    },
  },
  updated() {
    //this.loading = true;
    this.itens.all().then((dados) => (this.dados = dados));
  },
  mounted() {
    /*this.itens.create( {descricao:'xoco'} )
            .then( codigo => console.log('Car created with id: '+ codigo) )
            .catch( err => console.log(err) ),*/
    // this.loading = true;
    this.itens.all().then((dados) => (this.dados = dados));
  },
};
</script>

<style scoped>
.titulo{font-size: 30px;text-align: center;}
.botao{
    background-color: purple;
    padding: 5;
    margin: 10px;
    width: 85%;
    border-radius: 10px;
    color: white;
}
.listanome{
    font-size: 30px;text-align: left;
}

.topo{
    flexDirection: row;
    justifyContent: space-between;
}
.rodape{
    bottom: 0;
}
.container{
        margin-top: 5%;
    }

.botaoexcluir {
  background-color: red;
  padding: 20;
  width: 100%;
  margin: 1%;
  border-radius: 10px;
  color: white;
}
.labeltext {
  padding: 1;
  width: 90%;
  margin-left: 5%;
  font-size: 20px;
}
.inputtext {
  border-radius: 5px;
  width: 50%;
  padding: 5;
}
.botaogravar {
  background-color: green;
  padding: 20;
  width: 80%;
  margin: 5%;
  border-radius: 10px;
  color: white;
}

.bt {
  margin: 5%;
  background-color: #ebebeb;
  flexDirection: row;
  justifyContent: space-between;  
}
.resto {
    flexDirection: row;
}
.listanome {
  font-size: 20px;
  text-align: left;
  margin: 1%;
}

.text {
  font-size: 42;
}
</style>
