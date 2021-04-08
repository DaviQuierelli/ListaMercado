<template>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <view class="container">
            <cabecalho titulo="Seleciona Itens">
                <view class="topo">
                    <touchable-opacity :on-press="voltaHome">
                        <text class="botao">INÍCIO</text>
                    </touchable-opacity>
                    <touchable-opacity :on-press="() => cadItens(cod,'busca')">
                        <text class="botaocad">CAD ITENS</text>
                    </touchable-opacity>
                    <touchable-opacity :on-press="() => voltar(cod)">
                        <text class="botao">VOLTAR</text>
                    </touchable-opacity>
                </view>
            </cabecalho>
    
            <text class="labeltext">Informe o item:</text>
            <view class="resto">
                <text-input class="inputtext"
                    :style="{height: 40, borderColor: 'gray', borderWidth: 1}"
                    v-model="nomeitem" 
                />
                <touchable-opacity :on-press="buscaItem">
                    <text class="botaocad">Buscar</text>
                </touchable-opacity>
            </view>   

            <touchable-opacity v-for="item in dados" :key="item.codigo"  :on-press="() => gravaItens(item.codigo,cod)" class="listas">
                <Text class="listanome">{{item.descricao}}</Text>
            </touchable-opacity>
        </view>
      </ScrollView>
    </SafeAreaView>
</template>

<script>
import Itens from './itens.js';
import Detalhe from './detalhelista.js'
import store from './store/index';
import Cabecalho from './cabecalho.vue'
import Rodape from './rodape.vue'

import {View, StyleSheet, ScrollView,SafeAreaView} from 'react-native';

    export default {
        components: { Cabecalho,Rodape },
        data() {
            return {
                cod: this.navigation.getParam('codigo'),
                nomeitem:'',
                itens: Itens,
                detalhe:Detalhe,
                dados:[],
                loading: false,
            }
        },
        props: {
            navigation: {
                type: Object
            },
        },
        methods: {
            voltaHome(){
                this.navigation.navigate("Home");
            },
            voltar(id){
                this.navigation.navigate("DetalheLista",{codigo: id});
            },
            cadItens(cod,txt){
                this.navigation.navigate("CadItens",{codigo:cod,tela: txt});
            },
            buscaItem(){
                 this.itens.findByBrand(this.nomeitem) 
                    .then( dados => this.dados=dados, )
                    .catch( err => alert(err) )
            },
            gravaItens(coditem,codlista) {
                this.detalhe.create( {codlista:codlista,coditem:coditem,realizado:0} )
                .then( codigo => console.log('Grava Detalhe: '+ codigo) )
                .catch( err => console.log(err) ),
                store.commit('additem')
                //Toast.show({text: 'Item incluído!',buttonText: 'Ok',type: "success"})
                this.navigation.navigate("DetalheLista",{codigo: codlista});
            },
        },
     
    }
</script>

<style>
.titulo{font-size: 12px;text-align: center;color: white;}
.botao{
    background-color: purple;
    padding: 5;
    margin: 10px;
    width: 100%;
    border-radius: 10px;
    color: white;
}
.labeltext{
    padding: 1;
    width: 90%;
    margin-left: 5%;
    font-size: 20px;
}
.inputtext{
        border-radius: 5px;
        width: 50%;
        padding: 5;
        margin: 2%;
}
.botaocad{
    background-color: green;
    padding: 5;
    width: 70%;
    margin: 5%;
    border-radius: 10px;
    color: white;
    }

.resto{
    flexDirection: row;
}
.listanome{
    font-size: 20px;text-align: left;
    margin: 1%;
}
.container {
    flex: 1;
    marginTop: 20;
  }
.topo{
    flexDirection: row;
    justifyContent: space-between;
}
</style>