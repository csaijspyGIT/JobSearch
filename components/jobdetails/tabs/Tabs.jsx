import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import styles from './tabs.style';
import { COLORS, SIZES, icons } from '../../../constants';

const TabButton = ({ name, activeTab, setActiveTab }) => {
  return (
    <TouchableOpacity
      style={styles.btn(name, activeTab)}
      onPress={() => setActiveTab(name)}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>

    </TouchableOpacity>
  )
}



const Tabs = ({ tabs, activeTab, setActiveTab }) => {

 

  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{
          columnGap: SIZES.small
        }}
      />

    </View>
  )
}

export default Tabs;