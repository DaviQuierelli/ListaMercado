<template>
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        
            <slot></slot>
       
         </ScrollView>
    </SafeAreaView>
</template>

<script>
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';

    export default {
        name:'conteudo',
    }
</script>

<style>
.container{
   flex: 1;
    marginTop: Constants.statusBarHeight,
    }

  .scrollView {
    backgroundColor: pink;
    marginHorizontal: 20;
  }

  .item{
    padding: 20;
    marginVertical: 8;
    marginHorizontal: 16;
  }
  .title {
    fontSize: 32;
  }

</style>