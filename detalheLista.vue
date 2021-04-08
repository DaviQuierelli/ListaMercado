<template>

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <view class="container">
            <cabecalho titulo="Itens da lista:">
                <text class="titulo" :key="index">{{index2}}</text>
                <view class="topo">
                    <touchable-opacity :on-press="voltaHome">
                        <text class="botao">INÍCIO</text>
                    </touchable-opacity>
                    <touchable-opacity :on-press="() => buscaItens(cod)">
                        <text class="botaobuscar">BUSCAR ITENS</text>
                    </touchable-opacity>
                    <touchable-opacity :on-press="() => altlista(cod,desc)">
                        <text class="botao">ALTERAR LISTA</text>
                    </touchable-opacity>
                </view>
            </cabecalho>

            <view v-for="item in dados" :key="item.codigo" class="itenslista">

            <Text class="listanome">{{item.descricao}}</Text> 

                <button
                :on-press="() => alterarItem(item.codigo,1)" v-if="item.realizado==0"
                title="Espera"
                class="espera"
                />
                <button
                :on-press="() => alterarItem(item.codigo,0)" v-else
                title="OK"
                color="purple"
                />

                <touchable-opacity :on-press="() => excluiItem(item.codigo)" >
                    <text class="excluir">Excluir</text>
                </touchable-opacity>

            </view>
        </view>
      </ScrollView>
    </SafeAreaView>
</template>

<script>
import detalheLista from './detalhelista.js';
import store from './store/index';
import Cabecalho from './cabecalho.vue'
import Rodape from './rodape.vue'

    export default {
        components: { Cabecalho,Rodape },
        data() {
            return {
                cod: this.navigation.getParam('codigo'),
                desc: this.navigation.getParam('descricao'),
                nomeitem:'',
                detalhe: detalheLista,
                dados:[],
                loading: false,
                index:0,
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
            altlista(id,desc){
                this.navigation.navigate("AltLista",{codigo: id,descricao: desc});
            },
            buscaItens(id){
                this.navigation.navigate("SelItens",{codigo: id});
            },
            excluiItem(id) {
                this.detalhe.remove(id)
                .then( updated => {
                    console.log(updated) 
                    this.contaDados()
                    //alert('sds')
                    //Toast.show({text: 'Item excluído!',buttonText: 'Ok',type: "danger",textStyle: { color: "yellow" },buttonTextStyle: { color: "white" },buttonStyle: { backgroundColor: "blue" }})
                })
                //.then(updated2=>{this.atualizar()})
                .catch( err => console.log(err))     
                //store.commit('removeitem')         
            },
            alterarItem(id,valor) {
                this.detalhe.update( id,{realizado:valor} )
                .then( codigo => console.log('ok') )
                .catch( err => alert(err) )
            },
            contaDados(){
                this.detalhe.contaDetalhe(this.cod)
                .then(conta =>{
                    this.index=conta
                    store.commit('inicio', {ini:this.index} )
                })
                .catch(err => {
                    alert(err)
                    this.dados=[]
                })
            }
        },
        updated(){
            //alert('up'+this.cod)
            this.detalhe.find(this.cod)
            .then( dados => {
                this.dados=dados 
            })
            .catch( err => {
                console.log(err)
                this.dados=[]    
                }
            )
        },
        mounted(){
            this.detalhe.find(this.cod)
            .then( dados => this.dados=dados )
            .catch( err => console.log(err))
            this.contaDados()
        },

        computed: {
            index2 : function(){
              return store.state.qtdeItens;
            }
        }
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
.excluir{
    background-color: red;
    padding: 8px;
    width: 50%;
    border-radius: 10px;
    color: white;
    margin-left: 20%;
    }    

.botaobuscar{
    background-color: green;
    padding: 5;
    margin-left: 10px;
    margin: 10px;
    width: 100%;
    border-radius: 10px;
    color: white;
    }
.bt{
    flexDirection: row;
    margin:0%;
    background-color: #ebebeb;
    justifyContent: space-between;
}
.itenslista{
    flexDirection: row;
    justifyContent:flex-end;
    margin: 2%;
}
.listanome{
    font-size: 20px;text-align: left;
    margin: 1%;
}
.rodape{
    bottom: 0;
}
.container{
        margin-top: 5%;
    }
  .text {
    fontSize: 42;
  }

  .ok{
    background-color: purple;
    padding: 10px;
    width: 100%;
    border-radius: 10px;
    color: white;
  }
  .espera{
    background-color: #cccccc;
    padding: 10px;
    width: 100%;
    border-radius: 10px;
    color: white;    
  }
  .topo{
    flexDirection: row;
    justifyContent: space-between;
}
</style>