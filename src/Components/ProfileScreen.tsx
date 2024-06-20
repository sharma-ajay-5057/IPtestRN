import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React, { useContext } from 'react';
import AppContext, { AppContextType } from '../Context/AppContext';
import IMAGES from './Constants';

const { width } = Dimensions.get('window');

const ProfileScreen: React.FC = () => {
  const { state, selected } = useContext(AppContext) as AppContextType;

  return (
    <>
      <View style={styles.carouselItem}>
        {selected === null || IMAGES[selected] == null ? (
          <View>
            <Text>No image selected</Text>
          </View>
        ) : (
          <Image source={IMAGES[selected]} style={styles.carouselImage} />
        )}
      </View>
      <View style={styles.infoContainer}>
        <View>
          <View style={styles.infoSection}>
            <Text style={styles.infoText}>IP Address</Text>
            <Text style={styles.dataText}>{state?.ip}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoText}>Location</Text>
            <Text style={styles.dataText}>
              {!!state?.region && state?.region + ', ' + state?.country}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.infoSection}>
            <Text style={styles.infoText}>Timezone</Text>
            <Text style={styles.dataText}>
              {!!state?.timezone?.abbr && state?.timezone?.abbr + ' ' + state?.timezone?.utc}
            </Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoText}>ISP</Text>
            <Text style={styles.dataText}>{state?.connection?.isp}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  carouselItem: {
    padding: 10,
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
  },
  infoContainer: {
    top: 70,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 7,
  },
  infoSection: {
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataText: {
    color: '#fff',
  },
});
