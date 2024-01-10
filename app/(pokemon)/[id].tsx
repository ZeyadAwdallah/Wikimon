import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Pokemon, getPokemonDetailes } from '@/api/pokeapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [details, setDetails] = useState<Pokemon | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigation = useNavigation();

  useEffect(() => {
    const load = async () => {
      try {
        const loadedDetails: any = await getPokemonDetailes(id!);
        setDetails(loadedDetails);
        navigation.setOptions({
          title: loadedDetails.name.charAt(0).toUpperCase() + loadedDetails.name.slice(1),
        });
        const storedIsFavorite = await AsyncStorage.getItem(`favorite-${id}`);
        setIsFavorite(storedIsFavorite === 'true');
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons name={isFavorite ? 'star' : 'star-outline'} size={22} color={'#331122'} />
        </TouchableOpacity>
      ),
    });
  }, [isFavorite]);

  const toggleFavorite = async () => {
    if (!isFavorite) {
      await AsyncStorage.setItem(`favorite-${id}`, 'true');
    } else {
      await AsyncStorage.setItem(`favorite-${id}`, 'false');
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={{ padding: 10 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#331122"  style={[styles.loadingIndicator,{paddingTop:200}]} />
      ) : details ? (
        <>
          <View style={[styles.card, { alignItems: 'center' }]}>
            <Image source={{ uri: details.sprites.front_default }} style={{ width: 200, height: 200 }} />
            <Text style={styles.name}>
              #{details.id} {details.name}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={[styles.name, { textAlign: 'center' }]}>Stats</Text>
            {details.stats.map((item: any) => (
              <Text style={styles.stats} key={item.stat.name}>
                {item.stat.name} : {item.base_stat}
              </Text>
            ))}
          </View>
        </>
      ) : (
        <Text>Error loading data</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    elevation: 10,
    gap: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  name: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
  },
  stats: {
    fontSize: 18,
    padding: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page;
