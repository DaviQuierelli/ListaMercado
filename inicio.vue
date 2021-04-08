<template>
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <view class="container">
            <cabecalho titulo="TAREFAS 2.0">
                <view class="topo">
                    <touchable-opacity :on-press="NovaLista">
                        <text class="botao">NOVA LISTA</text>
                    </touchable-opacity>
                    <touchable-opacity :on-press="cadItens">
                        <text class="botao">CAD ITENS</text>
                    </touchable-opacity>
                </view>
            </cabecalho>

            <touchable-opacity v-for="item in dados" :key="item.codigo" :on-press="() => abreLista(item.codigo,item.descricao)" class="listas">
                <Text class="listanome">{{item.descricao}}</Text>
            </touchable-opacity>

            <!--rodape class="rodape" titulo="2021"></rodape-->
    
        </view>
        </ScrollView>
    </SafeAreaView>
</template>

<script>
import Lista from './lista.js';
import Cabecalho from './cabecalho.vue'
import Rodape from './rodape.vue'
import Conteudo from './conteudo.vue'

    export default {
        components: { Cabecalho,Rodape,Conteudo },
        data() {
            return {
                dados:[],
                lista: Lista,
            }
        },
        props: {
            navigation: {
                type: Object
            }
        },
        methods: {
            NovaLista(){
                this.navigation.navigate("Lista");
            },
            abreLista(id,desc) {
                this.navigation.navigate("DetalheLista",{codigo: id,descricao: desc});
            },
            cadItens() {
                this.navigation.navigate("CadItens");
            },
            teste() {
                this.navigation.navigate("teste");
            }
        },
        mounted(){
            /*this.lista.create( {descricao:'Mercado'} )
            .then( codigo => console.log('Car created with id: '+ codigo) )
            .catch( err => console.log(err) ),*/
            this.lista.all()
            .then( 
                dados => this.dados=dados,
            )
        },
        updated() {
             this.lista.all()
            .then( 
                dados => this.dados=dados,
            )
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

</style>