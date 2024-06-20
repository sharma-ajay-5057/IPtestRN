import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import IMAGES from './Constants';
import {NetworkInfo} from 'react-native-network-info';
import NetInfo from '@react-native-community/netinfo';
import AppContext, {AppContextType} from '../Context/AppContext';
import {ActivityIndicator} from 'react-native';

const {width, height} = Dimensions.get('window');

const DashboardScreen: React.FC = () => {
  const [ipAddress, setIPAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {state, setState, selected, setSelected} = useContext(
    AppContext,
  ) as AppContextType;

  useEffect(() => {
    NetworkInfo.getIPV4Address().then(ip => {
      setIPAddress(ip);
      fetchData();
    });
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert('Internet is disabled');
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://ipwho.is/${ipAddress}`);
      const data = await response.json();
      if (data?.success === false) {
        setError(data?.message);
      } else {
        setError(null);
        setState(data);
      }
      setLoading(false);
    } catch (error) {
      setError(error?.message);
      setLoading(false);
    }
  };

  const handleInputChange = (text: string) => {
    setIPAddress(text);
  };

  const handleSubmit = () => {
    console.log('Submitting IP address');
    fetchData();
  };

  const renderCarouselItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          selected === index ? setSelected(null) : setSelected(index);
        }}>
        <View style={styles.carouselItem}>
          <Image
            source={IMAGES[index]}
            style={[
              styles.carouselImage,
              {
                borderWidth: selected === index ? 5 : 0,
                borderColor: 'red',
                borderRadius: 10,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{height: height}}>
      <ScrollView>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#3261e3',
            }}>
            <Text style={styles.dashboardTitle}>IP Tracker</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter IP Address"
              value={ipAddress}
              onChangeText={handleInputChange}
            />
            {error && <Text style={styles.error}>Error: {error}</Text>}
            <TouchableOpacity
              onPress={() => fetchData()}
              color={'green'}
              style={{
                backgroundColor: 'skyblue',
                padding: 10,
                borderRadius: 10,
                marginBottom: 10,
                width: 80,
                
              }}>
              {loading ? (
                <ActivityIndicator size='small' color="#0000ff" />
              ) : (
                <Text style={{color: 'white', fontWeight: 'bold',textAlign:'center'}}>Search</Text>
              )}
            </TouchableOpacity>
            {/* <Button title={<ActivityIndicator  color={'blue'} /> } onPress={handleSubmit} color={'green'} /> */}
            <View style={styles.infoContainer}>
              <View>
                <View style={styles.infoSection}>
                  <Text style={styles.infoText}>IP Address</Text>
                  <Text style={styles.dataText}>{!!state && state?.ip}</Text>
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
                    {!!state?.timezone?.abbr &&
                      state?.timezone?.abbr + ' ' + state?.timezone?.utc}
                  </Text>
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.infoText}>ISP</Text>
                  <Text style={styles.dataText}>
                    {!!state && state?.connection?.isp}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <Carousel
              data={IMAGES}
              renderItem={renderCarouselItem}
              sliderWidth={width}
              itemWidth={width * 0.8}
              layout="default"
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  dashboardTitle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  error: {
    color: 'red',
  },
  infoContainer: {
    top: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  carouselItem: {
    width: width * 0.8,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dataText: {
    color: '#fff',
  },
});
