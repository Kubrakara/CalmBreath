// utils/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCeXrTR8Nt8VnPT\nyHniGOpsQakO0oFUr/Z9gdJZgbOecreTgM43pfXZzJhN/1HVJzxTit6pMhUwMsRv\nNgp3Q45R0qIOCg9o2oM8nVvtpD/NFEBlgzT7Zu0QW5ZKSILQf6ztS4I8wFtEJ4no\nc9mePfcwIi3QKjf3onlHkZQIbX2AW69Kn495kLanIRmXEGwzafEJHLuEpf0LXWii\naTmzbKK2etqOWavKgDUQJDNaVZk+Y1/a+JokyIlOHGmFPsgaGWJyQSNv/UKGLjyX\nr0MNmNUyYe9ovKMRyUyx68JyH0LnodcZl9C14Upwk3AosVIrbjAjUePuFUfmw2jz\nSCAsTvILAgMBAAECggEAG+KaHRM3WlvQljxI9b4kXL5s+Y6oNhSrpqq6sobrbR1O\n5Jp79QF0Wg6zzJwFuS3o6d7cWNdYMr3lp51Q13IeN5sKbMVptDExhXVBsATJNR95\nPUaOiCu11zkBLAA7hGHOvZObkX3fNA9wMW1gpoPLp/6EqZAdfa1uhGMGOTuqKvTy\nvya4qXeqpOFBiUfM1Sjs5PJKpddhf21c/HpbjMrYf9ufDczSdp3hfwYaOffH3+zj\n+gPoe0TO/TaNUJz1QGucqOw/W5R8A2aOkoKgXhL9guGf8eeCgkO/aga28kp8sRgX\nGxPy4oCMqpCT1dE6F8TD/rmqyaSwKZ0cVA7Uim9ZwQKBgQDYdGLwzYOSTwWw7ql4\nOlrz50X863zpifwRnXDT3DW27JSKjqtDspG0EsCpf0HNiA7cMdCIWW/eLCaHGraf\nO1I9BIlOLp32ICHyWmGEpbbNb/PSg9J3WGs/wyPS05V0YXsBxPhtJhLLcFJjT6Hq\nKPILt3bZ5QAaBS/iAHNDzAYbQQKBgQC7TbDcTAGxNGcusxZ0FEMnpA8JOX0JozFY\nZfzBqOJYu6pfGN/tlHrXchEgw/McMZI5H1NimRpNOXbX4scfbBjn8WiJ7l8veOz0\naqUN45Z6gF9MH+1M/rjZMSeYz4BYaTpLwnraAbzJ+45/xE4XUCVACpsDkqaBE/wh\nD80YEbV2SwKBgQDRa3Gah0vnz1qzP4VpVBRRbI4zUOcu0Ji3tjrGT4UMsUJZ+ATN\nX8RGk+ohU4UnxJ6T/gJDGTz5mH/CMV9FGdDMRkpOAR5FVftiDn3RJ7+AbfNZ1r5X\nR42kSDmtrZYo3nNzV83/VFnUyJx9hzshYXIlUeDEmiIKCsC0CTl7+7ZgwQKBgCus\n+BrGlnZt08mt9QRoXSh3NxJdl2yR40XLsl6uNOmgCSBXuo+52dM3RAsx5hSi8ofj\naBxLuzhat/2rYedP25bqUggnz4ZQWmC8JXTRpxs1qAMmRr13gD8VGTim2jTDhNZ5\nqRAA67bls9rTOapyA92lG3R/09exg09qUdbU+k11AoGBAIBgqTo8eg6hwz9lzf1y\nVOQV/HKkdlwfFrJNZo1z7PXIkaKYCiVgA2GJcDj8tzowC0X1d1CmgHQ8ys0OBxNx\nwmkER/1aqXbc+JRUgn4mqANGLhHimZpKstdcvJYL5djgnD6O/6qjOcCty2PR3Xqi\nzYWNEArmotgOPOo0Pml1z4d2\n-----END PRIVATE KEY-----\n",
  authDomain: "calmbreath-efa5f.firebaseapp.com",
  projectId: "calmbreath-efa5f",
  storageBucket: "calmbreath-efa5f.appspot.com",
  messagingSenderId: "106506970601196935777",
  appId: "1:106506970601196935777:web:exampleappid123",
};


// Initialize Firebase app (prevent re-init in dev)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firestore methods
export { db, collection, addDoc, query, where, getDocs, serverTimestamp };
