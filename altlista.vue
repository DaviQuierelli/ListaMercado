<template>

    <view class="container">
            <cabecalho titulo="Alteração de Lista">
                <view class="topo">
                    <touchable-opacity :on-press="voltaHome">
                        <text class="botao">INÍCIO</text>
                    </touchable-opacity>
                    <touchable-opacity :on-press="() => excluirLista(cod)">
                        <text class="botaoexcluir">EXCLUIR</text>
                    </touchable-opacity>
                </view>
            </cabecalho>


    
        <text class="labeltext">Informe o nome da lista:</text>
        <view class="resto">
            <text-input class="inputtext"
                :style="{borderColor: 'gray', borderWidth: 1}"
                v-model="desc"
            />
            <touchable-opacity :on-press="() => gravaLista(cod,desc)">
                <text class="botaogravar">Gravar</text>
            </touchable-opacity>
        </view>
    </view>

</template>

<script>
import Lista from './lista.js';
import Cabecalho from './cabecalho.vue'
import Rodape from './rodape.vue'

    export default {
        components: { Cabecalho,Rodape },
        data() {
            return {
                cod: this.navigation.getParam('codigo'),
                desc: this.navigation.getParam('descricao'),
                lista: Lista
            }
        },
        props: {
            navigation: {
                type: Object
            }
        },
        methods: {
            voltaHome(){
                this.navigation.navigate("Home");
            },
            gravaLista(id,desc){
                //alert(this.desc);
                this.lista.update( this.cod,{descricao:this.desc} )
                .then( codigo => console.log('ok') )
                .catch( err => alert(err) ),
                //Toast.show({text: 'Lista alterada!',buttonText: 'Ok',type: "success",textStyle: { color: "white" },buttonTextStyle: { color: "white" },buttonStyle: { backgroundColor: "gray" }})
                this.navigation.navigate("Home");
            },
            excluirLista(cod){
                this.lista.remove(cod)
                .then( updated => console.log('ok') )
                .catch( err => alert(err) )
                //Toast.show({text: 'Lista excluída!',buttonText: 'Ok',type: "danger",textStyle: { color: "white" },buttonTextStyle: { color: "white" },buttonStyle: { backgroundColor: "gray" }})
                this.navigation.navigate("Home");
            }
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
        padding: 10px;
        height: 50px;
}
.botaogravar{
    background-color: green;
    padding: 15px;
    width: 100%;
    margin-left: 5%;
    border-radius: 5px;
    color: white;
    }

.resto{
    flexDirection: row;
    padding: 10px;;
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