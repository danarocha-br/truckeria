import { takeLatest, put, all } from 'redux-saga/effects';
import cuid from 'cuid';

import ActionTypes from './types';
import { truckProfileError, truckProfileSuccess } from './actions';

export function* createFoodTruckProfile({
  payload: { firebase, firestore, values },
}) {
  const user = firebase.auth().currentUser;
  const imageName = cuid();
  const dbPath = 'truckprofile';
  const storagePath = `${user.uid}/images/foodtruck_profile`;
  const files = values.files;

  try {
    const createdProfile = yield firestore.collection(dbPath).add({
      ...values,
      files: values.files[0].name || [],
      userId: user.uid,
      createdAt: new Date(),
    });

    yield put(
      truckProfileSuccess({
        ...values,
        userId: user.uid,
        ownedBy: user.displayName,
        createdAt: new Date(),
      })
    );

    if (files.length === 0) {
      return;
    }
    yield firebase.uploadFile(storagePath, files, dbPath, {
      metadataFactory: (downloadURL) => {
        return { fileURL: downloadURL };
      },
      documentId: createdProfile.id,
    });
  } catch (error) {
    console.log(error);
    yield put(truckProfileError(error));
  }
}

export default all([
  takeLatest(ActionTypes.TRUCK_PROFILE_REQUEST, createFoodTruckProfile),
]);