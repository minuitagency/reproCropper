import React, {useState, useEffect, useGlobal} from 'reactn';
import {Image, View, Text, Pressable, ScrollView} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Grid from 'react-native-grid-component';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles/main';
import colors from '../styles/colors';

export default function PictureGallery() {
  const [albumList, setAlbumList] = useGlobal('albumList');
  const [lastGalleryRefresh] = useGlobal('lastGalleryRefresh');

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [allPictures, setAllPictures] = useState([]);

  useEffect(() => {
    getAllPictures();
  }, [lastGalleryRefresh]);

  const getAllPictures = async () => {
    try {
      const pictureList = [];

      const keys = (await AsyncStorage.getAllKeys()) || [];
      const values = await AsyncStorage.multiGet(keys);

      values.map(pictureData =>
        pictureList.push({...JSON.parse(pictureData[1]), key: pictureData[0]}),
      );

      setAlbumList(
        [...new Set(pictureList.map(({pictureAlbum}) => pictureAlbum))].filter(
          albumName => albumName,
        ),
      );

      setAllPictures(pictureList);
    } catch (e) {
      console.log(e);
    }
  };

  const renderPictureItem = (pictureData, i) => {
    const {picturePath} = pictureData;

    return (
      <Pressable
        onPress={() => Actions.push('AddPicture', {pictureData})}
        style={[
          {
            backgroundColor: 'red',
            flex: 1,
            width: '100%',
            height: responsiveHeight(30),
          },
        ]}
        key={i}>
        <Image
          resizeMode={'cover'}
          style={{flex: 1, width: '100%', height: '100%'}}
          source={{uri: picturePath}}
        />
      </Pressable>
    );
  };

  return (
    <View style={[styles.containerMain, {padding: 0}]}>
      {albumList.length > 0 && (
        <View style={{height: 50, marginVertical: 10, paddingHorizontal: 10}}>
          <ScrollView horizontal>
            {albumList.map(albumName => {
              const isSelected = selectedAlbum === albumName;

              return (
                <Pressable
                  onPress={() =>
                    setSelectedAlbum(isSelected ? null : albumName)
                  }
                  style={[
                    styles.containerItem,
                    {
                      backgroundColor: isSelected
                        ? colors.mainBlue
                        : colors.lightGrey,
                      marginRight: 10,
                    },
                  ]}>
                  <Text
                    style={{
                      color: isSelected ? colors.mainWhite : colors.mainBlack,
                    }}>
                    {albumName}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}

      <Grid
        style={{flex: 1}}
        renderItem={renderPictureItem}
        renderPlaceholder={() => <View style={{width: '100%'}} />}
        data={allPictures.filter(({pictureAlbum = null}) => {
          if (!selectedAlbum) {
            return true;
          }

          return pictureAlbum === selectedAlbum;
        })}
        numColumns={2}
      />

      <Pressable
        onPress={() => Actions.push('AddPicture')}
        style={[
          styles.containerCenter,
          {
            position: 'absolute',
            bottom: 40,
            right: 40,
            backgroundColor: colors.mainBlue,
            width: responsiveWidth(20),
            height: responsiveWidth(20),
            borderRadius: 250,
          },
        ]}>
        <Image
          source={require('../assets/plus.png')}
          resizeMode={'contain'}
          style={{
            tintColor: colors.mainWhite,
            width: '40%',
            height: '40%',
          }}
        />
      </Pressable>
    </View>
  );
}
