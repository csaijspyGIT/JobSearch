import React from 'react';
import { useState } from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from "../constants";
import { Nearbyjobs, Popularjobs, Welcome, ScreenHeaderBtn } from "../components";

const Home = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    return (
        
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.lightWhite,
                paddingHorizontal: 10
            }}
        >
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.lightWhite
                    },
                    headerShadowVisible: false,
                    headerTitle: "",
                    headerLeft: () => {
                        return (
                            <ScreenHeaderBtn iconUrl = {icons.menu} dimension = "60%" />
                        )
                    },
                    headerRight: () => {
                        return (
                            <ScreenHeaderBtn iconUrl = {images.rijan} dimension ="100%" />
                        )
                    }
                }}
            />

            <ScrollView showsVerticalScrollIndicator = {false}>
                <View>
                    <Welcome 
                        searchTerm = {searchTerm}
                        setSearchTerm = {setSearchTerm}
                        handleClick = {()=>{
                            searchTerm && router.push(`/search/${searchTerm}`) 
                        }}
                    />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>

        </SafeAreaView>

    )
}


export default Home;
