import { View, Text, SafeAreaView, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect} from 'react';
import useFetch from '../../hook/useFectch';
import styles from '../../styles/search';
import { COLORS, SIZES, icons, images } from '../../constants';
import { NearbyJobCard, ScreenHeaderBtn } from '../../components';

const Search = () => {
    const router = useRouter();
    const params = useGlobalSearchParams();
 
    const [page, setPage] = useState(1);


    const { data, isLoading, error } = useFetch('search', {
        query: `React developer ${params.id}`,
        page: page.toString()
    }, page);

    const handlePagination = (direction) =>{
        if (direction === 'left' && page > 1) {
            setPage(page - 1)
        } else if (direction === 'right') {
            setPage(page + 1)  
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, flex: 1, padding: SIZES.medium }}>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.lightWhite
                    },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTitle: "",
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="70%"
                        />
                    )
                }}
            />


            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <NearbyJobCard
                        job={item}
                        handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
                    />
                )}
                showsVerticalScrollIndicator = {false}
                contentContainerStyle ={{
                    rowGap: SIZES.medium
                }}
                keyExtractor={(item) => item?.job_id}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id}</Text>
                            <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>

                            <View style={styles.loaderContainer}>
                                {isLoading ? (
                                    <ActivityIndicator color={COLORS.primary} size="large" />
                                ) : error && (
                                    <Text>Something went wrong</Text>
                                )}
                            </View>
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <>
                        <View style={styles.footerContainer}>
                            <TouchableOpacity
                                style={styles.paginationButton}
                                onPress={()=>handlePagination("left")}
                            >
                                <Image
                                    source={icons.chevronLeft}
                                    resizeMode='contain'
                                    style={styles.paginationImage}
                                />
                            </TouchableOpacity>

                            <View style ={styles.paginationTextBox}>
                                <Text style ={styles.paginationText}>{page}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.paginationButton}
                                onPress={()=>handlePagination("right")}
                            >
                                <Image
                                    source={icons.chevronRight}
                                    resizeMode='contain'
                                    style={styles.paginationImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            />


        </SafeAreaView>
    )
}

export default Search