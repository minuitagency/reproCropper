import React, {useState, useGlobal} from 'reactn';
import {
  Image,
  View,
  Text,
  Pressable,
  Switch,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import ImagePicker from 'react-native-image-crop-picker';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Dialog from 'react-native-dialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import Crop from 'react-native-avatar-crop';

import styles from '../styles/main';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const formatOptionList = [
  {
    title: 'Portrait',
    aspectRatio: 3 / 2,
    dimensions: {height: 1000, width: 1000 * (2 / 3)},
  },
  {
    title: 'Paysage',
    aspectRatio: 2 / 3,
    dimensions: {height: 1000, width: 1000 * (3 / 2)},
  },
  {
    title: 'Carré',
    aspectRatio: 1,
    dimensions: {width: 1000, height: 1000},
  },
];

export default function AddPicture({pictureData = {}, importedPicture = {}}) {
  const [albumList, setAlbumList] = useGlobal('albumList');
  const [, setlastGalleryRefresh] = useGlobal('lastGalleryRefresh');

  const [pictureFormat, setPictureFormat] = useState(
    pictureData?.pictureFormat || 1,
  );
  const [picturePath, setPicturePath] = useState(
    importedPicture?.data || pictureData?.picturePath || null,
  );
  const [onePage, setOnePage] = useState(pictureData?.onePage || false);
  const [pictureComment, setPictureComment] = useState(
    pictureData?.pictureComment || '',
  );
  const [pictureAlbum, setPictureAlbum] = useState(
    pictureData?.pictureAlbum || null,
  );

  const [showNewAlbum, setShowNewAlbum] = useState(false);
  const [newAbumName, setNewAbumName] = useState('');

  const {aspectRatio} = formatOptionList[pictureFormat];

  const openCropPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'picture',
    }).then(image => {
      setPicturePath(image.path);
    });
  };

  const validateNewAlbum = () => {
    setAlbumList([...albumList, newAbumName]);
    setNewAbumName(null);
    setShowNewAlbum(false);
  };

  const addPicture = async () => {
    try {
      const imageObject = {
        pictureResizeDate: moment().valueOf(),
        picturePath: await crop().uri,
        pictureFormat,
        onePage,
        pictureComment,
        pictureAlbum,
      };

      await AsyncStorage.setItem(
        pictureData?.key || moment().valueOf().toString(),
        JSON.stringify(imageObject),
      );

      setlastGalleryRefresh(moment().valueOf());
      Actions.pop();
    } catch (e) {
      console.log(e);
    }
  };

  let crop = async quality => ({uri: '', width: 0, height: 0});

  const CROPPING_ZONE = responsiveWidth(50);

  return (
    <>
      <ScrollView
        style={[styles.containerMain]}
        contentContainerStyle={{paddingBottom: responsiveHeight(30)}}>
        <SegmentedControl
          values={formatOptionList.map(({title}) => title)}
          selectedIndex={pictureFormat}
          onChange={event => {
            setPictureFormat(event.nativeEvent.selectedSegmentIndex);
          }}
          style={{marginBottom: responsiveHeight(2)}}
        />

        <Pressable onPress={() => openCropPicker()}>
          {picturePath ? (
            <Crop
              cropShape={'rect'}
              source={{uri: picturePath}}
              width={'100%'}
              height={responsiveHeight(40)}
              cropArea={{
                width: CROPPING_ZONE,
                height: CROPPING_ZONE * aspectRatio,
              }}
              onCrop={cropCallback => (crop = cropCallback)}
            />
          ) : (
            <View
              style={[
                styles.containerCenter,
                {
                  paddingVertical: responsiveHeight(5),
                  backgroundColor: colors.lightGrey,
                },
              ]}>
              <Text style={fonts.regular}>Ajouter une photo</Text>
            </View>
          )}
        </Pressable>

        <View style={styles.separatorHorizontal} />

        <View style={styles.containerRowSpaceBetween}>
          <Text style={fonts.regular}>Photo pleine page</Text>
          <Switch value={onePage} onValueChange={setOnePage} />
        </View>

        <View style={styles.separatorHorizontal} />

        <View
          style={[
            styles.containerRowSpaceBetween,
            {marginBottom: responsiveHeight(1)},
          ]}>
          <Text style={fonts.regular}>Album</Text>

          <Pressable onPress={() => setShowNewAlbum(true)}>
            <Text style={[fonts.regular, {color: colors.mainBlue}]}>
              Nouveau
            </Text>
          </Pressable>
        </View>

        <ScrollView horizontal>
          {albumList
            .filter(albumName => albumName)
            .map(albumName => {
              const isSelected = pictureAlbum === albumName;

              return (
                <Pressable
                  onPress={() => setPictureAlbum(albumName)}
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
                    style={[
                      fonts.regular,
                      {color: isSelected ? colors.mainWhite : colors.mainBlack},
                    ]}>
                    {albumName}
                  </Text>
                </Pressable>
              );
            })}
        </ScrollView>

        <View style={styles.separatorHorizontal} />

        <Text style={[fonts.regular, {marginBottom: responsiveHeight(1)}]}>
          Commentaire
        </Text>

        <TextInput
          numberOfLines={3}
          multiline={true}
          value={pictureComment}
          onChangeText={setPictureComment}
          style={{
            padding: 20,
            height: 150,
            borderWidth: 1,
            borderColor: colors.lightGrey,
            color: colors.mainBlack,
            borderRadius: 10,
          }}
        />
      </ScrollView>

      {picturePath && (
        <Pressable
          onPress={() => addPicture()}
          style={[
            styles.containerCenter,
            {
              alignSelf: 'center',
              position: 'absolute',
              bottom: 30,
              width: '60%',
              height: 50,
              borderRadius: 150,
              backgroundColor: colors.mainBlue,
            },
          ]}>
          <Text
            style={[
              fonts.regular,
              {color: colors.mainWhite, fontWeight: '600'},
            ]}>
            {pictureData?.key ? 'Modifier la photo' : 'Ajouter la photo'}
          </Text>
        </Pressable>
      )}

      <Dialog.Container visible={showNewAlbum}>
        <Dialog.Title>Nouvel album</Dialog.Title>
        <Dialog.Description>
          Saisissez le nom du nouvel album.
        </Dialog.Description>

        <Dialog.Input value={newAbumName} onChangeText={setNewAbumName} />

        <Dialog.Button label={'Valider'} onPress={validateNewAlbum} />
      </Dialog.Container>
    </>
  );
}
