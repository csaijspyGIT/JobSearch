import {
  Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, SIZES, icons } from '../../constants';
import useFetch from '../../hook/useFectch';

const tabs = ["Qualifications", "Responsibilities", "About"];


const JobDetails = () => {
  const params = useLocalSearchParams();

  console.log("ID:" , params.id);

  const router = useRouter();

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id
  });

  const [refreshing, setRefreshing] = useState(false);
  const checkData = data.length === 0;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  },[]);


  const displayTabContent = () => {

    switch (activeTab) {
      case "About":
        return <JobAbout
              title = "About"
              points = {data[0].job_description ?? ['No data provided']}
        />
      case "Qualifications":
        return <Specifics
          title="Qualifications"
          points={data[0].job_highlights?.Qualifications ?? ['N/A']}
        />
      case "Responsibilities":
        return <Specifics
          title="Responsibilities"
          points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
        />
    }
  }


  return (
    <SafeAreaView style={{
      backgroundColor: COLORS.lightWhite,
      flex: 1
    }}>

      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite
          },
          headerTitle: "",
          headerLeft: () => {
            return (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                handlePress={() => router.back()}
              />
            )
          },
          headerRight: () => {
            return (
              <ScreenHeaderBtn
                iconUrl={icons.share}
                dimension="70%" />
            )
          },
          headerShadowVisible: false,
          headerBackVisible: false
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : checkData ? (
            <Text>No data</Text>
          ) : (
            <View
              style={{
                padding: SIZES.medium,
                paddingBottom: 100
              }}
            >
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                Location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
              
            </View>
          )}
        </ScrollView>
        <JobFooter 
                title ="Apply"
                link = {data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}
        />

      </>

    </SafeAreaView>
  )
}

export default JobDetails;