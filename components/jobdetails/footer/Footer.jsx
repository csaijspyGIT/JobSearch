import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Linking, Image } from 'react-native'

import styles from './footer.style';
import { icons } from '../../../constants';

const Footer = ({link}) => {
  const [activeHeart, setActiveHeart] = useState(false)

  return (
    <View style ={styles.container}>
      <TouchableOpacity
        style  = {styles.likeBtn}
        onPress = {()=>setActiveHeart(true)}
      >
          <Image 
            style = {styles.likeBtnImage(activeHeart)}
            resizeMode = "contain"
            source ={icons.heartOutline}
          />
      </TouchableOpacity>
      <TouchableOpacity style ={styles.applyBtn}>
          <Text style = {styles.applyBtnText}
            onPress={()=>Linking.openURL(link)}
          >
            Apply for job
          </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer