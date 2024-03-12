import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, deleteUser, reauthenticateWithCredential } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDwtwKEFW5PSaObJ9zX2bfRM0Ng_rKuWkI",
    authDomain: "project-curaprox.firebaseapp.com",
    projectId: "project-curaprox",
    storageBucket: "project-curaprox.appspot.com",
    messagingSenderId: "221653476291",
    appId: "1:221653476291:web:4e90fd87f21709899dd376",
    measurementId: "G-77D300065N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;

export async function uploadToFirebase(file, fallBackUrl = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg") {
    try {

        const tailFile = file.name.split('.')[file.name.split('.').length - 1]
        const storage = getStorage(app);
        const imagesRef = ref(storage, `image_${Date.now() * Math.random()}.${tailFile}`);

        let res = await uploadBytes(imagesRef, file)
        let url = await getDownloadURL(res.ref)
        return url
    } catch (err) {
        return fallBackUrl
    }
}

export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    try {
        let result = await signInWithPopup(auth, provider);
        return result;
    } catch (err) {
        return false
    }
}

export async function loginWithGithub() {
    const provider = new GithubAuthProvider();
    const auth = getAuth(app);
    try {
        let result = await signInWithPopup(auth, provider);
        return result;
    }
    catch (err) {
        return false
    }
}

export async function reauthenticate() {
    const credential = promptForCredentials();
    //gọi hàm reauthenticateWithCredential() để xác thực lại người dùng với chứng chỉ 
    //(credential) đã nhập.
    reauthenticateWithCredential(user, credential)
        .then(() => {
            // lúc này đã call api thành công và xác thực cho tất cả các tài khoản nằm trong phần users của
            //authentication của firebase
        }).catch((error) => {
            //lỗi
        });
}

export async function logout() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            deleteUser(user)
                .then(() => {
                    // xóa thành công
                })
                .catch((error) => {
                    console.log('error', error);
                });
        } else {
            console.log('No user is currently authenticated.');
        }
    });
}