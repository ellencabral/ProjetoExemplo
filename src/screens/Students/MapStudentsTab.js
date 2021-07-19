import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {StudentContext} from '../../context/StudentProvider';

const MapStudentsTab = () => {
  const [mapType, setMapType] = useState('standard');
  const [markers, setMarkers] = useState([]);
  const {students} = useContext(StudentContext);

  useEffect(() => {
    let m = [];
    students.map(a => {
      m.push({
        key: a.uid,
        coords: {
          latitude: Number(a.latitude),
          longitude: Number(a.longitude),
        },
        title: a.sigla,
        description: a.name,
        image: require('../../assets/images/person_map_accent.png'),
      });
    });
    setMarkers(m);
  }, [students]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map => (this.map = map)}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={true}
        onPress={e => {
          Alert.alert(
            'Coordenadas',
            'latitude= ' +
              e.nativeEvent.coordinate.latitude +
              'longitude= ' +
              e.nativeEvent.coordinate.longitude,
          );
        }}
        initialRegion={{
          //região onde deve focar o mapa na inicialização
          latitude: -31.766108372781073,
          longitude: -52.35215652734042,
          latitudeDelta: 0.015, //baseado na documentação
          longitudeDelta: 0.0121, //baseado na documentação
        }}>
        {markers.map(marker => {
          return (
            <Marker
              key={marker.key}
              coordinate={marker.coords}
              title={marker.title}
              description={marker.description}
              draggable
              image={marker.image}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default MapStudentsTab;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
