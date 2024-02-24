import React from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import { SIZES, icons } from '../../../constants';
import { useRouter } from 'expo-router';

import styles from './welcome.style';

const jobTypes = ["Full-time", "Part-time", "Contractor", "FreeLancer"]


const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {

  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Rijan</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={handleClick}
        >
          <Image
            style={styles.searchBtnImage}
            source={icons.search}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>

      <View
        style={styles.tabsContainer}
      >
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.tab(activeJobType, item)}
                onPress={() => {
                  setActiveJobType(item)
                  router.push(`/search/${item}`)
                }}
              >
                <Text style={styles.tabText(activeJobType, item)}> {item} </Text>
              </TouchableOpacity>
            )
          }}
          contentContainerStyle={{
            columnGap: SIZES.small
          }}
          keyExtractor={item => item}
          horizontal
        />
      </View>

    </View>
  );
}

export default Welcome;