<template>
 
  <view class="container">
        <cabecalho titulo="Nova lista">
            <view class="topo">
                <touchable-opacity :on-press="voltaHome">
                    <text class="botao">Início</text>
                </touchable-opacity>
            </view>
        </cabecalho>

        <conteudo>
    
            <text class="titulo">Informe o nome da lista:</text>
    
            <text-input class="inputtext"
                :style="{height: 40, borderColor: 'blue', borderWidth: 1,margin: 20}"
                v-model="nomelista"
            />
            <touchable-opacity :on-press="gravaLista">
                <text class="botaogravar">Gravar</text>
            </touchable-opacity> 
        </conteudo>
        <!--rodape class="rodape" titulo="2021"></rodape-->
  </view>

</template>

<script>
import Lista from './lista.js';
import Cabecalho from './cabecalho.vue'
import Rodape from './rodape.vue'
import Conteudo from './conteudo.vue'

    export default {
        data() {
            return {
                cod: this.navigation.getParam('codigo'),
                desc: this.navigation.getParam('descricao'),
                nomelista:'',
                lista: Lista
            }
        },
        components: { Cabecalho,Rodape,Conteudo },
        props: {
            navigation: {
                type: Object
            }
        },
        methods: {
            voltaHome(){
                this.navigation.navigate("Home");
            },
            gravaLista(){
                if (this.nomelista !=""){
                    this.lista.create( {descricao:this.nomelista} )
                    .then( codigo => console.log('Criado com sucesso: '+ codigo) )
                    .catch( err => console.log(err) ),
                    //Toast.show({text: 'Lista criada!',buttonText: 'Ok',type: "success",textStyle: { color: "white" },buttonTextStyle: { color: "white" },buttonStyle: { backgroundColor: "gray" }})
                    this.navigation.navigate("Home");
                }else{
                    alert('Informe o nome de uma lista!')
                }
            }
        },
    }
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
.container{
margin-top: 25px;
}
.topo{
    flexDirection: row;
    justifyContent: space-between;
}
.botaogravar{
    background-color: green;
    padding: 5;
    margin: 10px;
    width: 35%;
    border-radius: 10px;
    color: white;
}
.rodape{
    bottom: -135%;
}
</style>