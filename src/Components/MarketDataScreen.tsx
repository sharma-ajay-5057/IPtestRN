import {LineChart} from 'react-native-chart-kit';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import axios from 'axios';

interface PriceData {
  // date: string;
  close: number;
  high: number;
  low: number;
  open: number;
}

const WebSocketComponent: React.FC = () => {
  const [prices, setPrices] = useState<PriceData[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get<PriceData[]>(
          'https://api.tiingo.com/tiingo/fx/audusd/prices?startDate=2024-01-01&resampleFreq=1Day&token=ef545a75c55090cdf448eb33ef4aabce4e7ad694',
        );
        setPrices(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err);
        } else {
          setError(new Error('An unexpected error occurred'));
        }
      }
    };

    fetchPrices();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!prices) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <LineChart
          data={{
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').width / 1.5}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 24,
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          AUD USD
        </Text>
      </View>
      <FlatList
        data={prices}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        keyExtractor={item => item.date}
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={{fontSize: 24, marginBottom: 10}}>Close</Text>
            <Text style={{fontSize: 24, marginBottom: 10}}>High</Text>
            <Text style={{fontSize: 24, marginBottom: 10}}>Low</Text>
            <Text style={{fontSize: 24, marginBottom: 10}}>Open</Text>
          </View>
        )}
        renderItem={({item}) => (
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              {parseFloat(item.close).toFixed(4)}
            </Text>
            <Text style={styles.priceText}>
              {parseFloat(item.high).toFixed(4)}
            </Text>
            <Text style={styles.priceText}>
              {parseFloat(item.low).toFixed(4)}
            </Text>
            <Text style={styles.priceText}>
              {parseFloat(item.open).toFixed(4)}
            </Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
  priceContainer: {
    // marginBottom: 10,
    padding: 5,
    // backgroundColor: '#f0f0f0',
    // borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 14,
  },
});

export default WebSocketComponent;
