<template>
   <view class="container">
            <cabecalho titulo="Alteração de Itens">
                <view class="topo">
                    <touchable-opacity :on-press="voltaHome">
                        <text class="botao">INÍCIO</text>
                    </touchable-opacity>
                    <touchable-opacity :on-press="voltar">
                        <text class="botao">VOLTAR</text>
                    </touchable-opacity>
                    <touchable-opacity :on-press="() => excluiItens(cod)">
                        <text class="botaoexcluir">EXCLUIR</text>
                    </touchable-opacity>
                </view>
            </cabecalho>
    
    
        <text class="labeltext">Informe o nome da lista:</text>
        <view class="resto">
            <text-input class="inputtext"
                :style="{height: 40, borderColor: 'blue', borderWidth: 1,margin: 20}"
                v-model="desc"
            />
            <touchable-opacity :on-press="gravaItens">
                <text class="botaogravar">Gravar</text>
            </touchable-opacity>
        </view>

    </view>

</template>

<script>
import Itens from './itens.js';
import Cabecalho from './cabecalho.vue'
import Rodape from './rodape.vue'

    export default {
        components: { Cabecalho,Rodape },
        data() {
            return {
                cod: this.navigation.getParam('codigo'),
                desc: this.navigation.getParam('descricao'),
                //nomelista:'',
                itens: Itens,
                loading: false,
            }
        },
        props: {
            navigation: {
                type: Object
            }
        },
        methods: {
            voltar(){
                this.navigation.navigate("CadItens");
            },
            voltaHome(){
                this.navigation.navigate("Home");
            },
            gravaItens(){
                this.loading = true;
                this.itens.update( this.cod,{descricao:this.desc} )
                .then( codigo => console.log('ok') )
                .catch( err => alert(err) ),
                this.navigation.navigate("CadItens");
            },
            excluiItens(cod){
                this.itens.remove(cod)
                .then( updated => console.log('ok') )
                .catch( err => alert(err) )
                this.navigation.navigate("CadItens");
            },
        },
    }
</script>

<style>
.titulo{font-size: 30px;text-align: center;}
.botao{
    background-color: purple;
    padding: 5;
    margin: 10px;
    width: 85%;
    border-radius: 10px;
    color: white;
}
.botaoexcluir{
    background-color: red;
    padding: 5;
    width: 100%;
    margin: 10px;
    border-radius: 10px;
    color: white;
    }    
.labeltext{
    padding: 5;
    width: 90%;
    margin: 5%;
    font-size: 20px;
}
.inputtext{
        border-radius: 5px;
        width: 50%;
        padding: 5;
}
.botaogravar{
    background-color: green;
    padding: 20;
    width: 100%;
    margin: 5%;
    border-radius: 10px;
    color: white;
    }

.resto{
    flexDirection: row;

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