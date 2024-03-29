import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './nearbyjobcard.style';

const NearbyJobCard = ({ job, handleNavigate }) => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigate(job)}
    >
      <TouchableOpacity
        style={styles.logoContainer}
      >
        <Image
          source={{ uri: job.employer_logo }}
          style={styles.logoImage}
          resizeMode='contain'
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName}
              numberOfLines={1}
        >
          {job.job_title}
        </Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard;