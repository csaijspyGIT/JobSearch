import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './popularjobs.style';
import { useRouter } from 'expo-router';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { SIZES, COLORS } from '../../../constants';
import useFetch from '../../../hook/useFectch';


const Popularjobs = () => {
  const router = useRouter();

  const {data, isLoading, error} = useFetch("search",{
    query:'React developer',
    num_pages: 1
  });

  const [selectedJob, setSelectedJob] = useState("");

  const handleCardPress = (item) =>{
    setSelectedJob(item.job_id);
    router.push(`/job-details/${item.job_id}`);
  }

  // console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({item}) =>
                <PopularJobCard 
                  item = {item}
                  selectedJob={selectedJob}
                  handleCardPress={handleCardPress}
                />
            }
            contentContainerStyle = {{
              columnGap: 12
            }}
            keyExtractor={item=>item?.job_id}
            horizontal
          />
        )}
      </View>

    </View>
  )
}

export default Popularjobs;