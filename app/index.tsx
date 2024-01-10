import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { Pokemon, getPokemon } from '@/api/pokeapi'
import { ScrollView } from 'react-native-gesture-handler'
import {Ionicons} from '@expo/vector-icons'

const page = () => {
const [pokemon,setPokemon] = useState<Pokemon[]>([])

  useEffect(()=>{
    const load =async () => {
      const result = await getPokemon();
      setPokemon(result);
    };
    load()
  })
  return (
    <ScrollView>
     {pokemon.map((p)=>(
      <Link href={`/(pokemon)/${p.id}`} key={p.id} asChild>
        <TouchableOpacity>
          <View style={styles.item}>
            <Image source={{uri:p.image}} style={styles.preview}/>
            <Text style={styles.itemText}>
              {p.name}
            </Text>
            <Ionicons name="chevron-forward-outline" size={24}/>
            </View>
        </TouchableOpacity>
      </Link>
     ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  item:{
   padding:30,
   height:80,
   flexDirection:"row",
   alignItems:"center",
   justifyContent:"center",
   borderBottomWidth:.5,
   borderRadius:15,
   borderColor:"#0f0f0f"
  },
  itemText:{
    fontSize:18,
    textTransform:"capitalize",
    flex:1,
  },
  preview:{
  width:100,
  height:100,
  }
})
export default page