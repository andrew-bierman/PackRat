import { View } from 'react-native';
import { RHeading, RStack, RButton, RText, RIconButton } from '@packrat/ui';
import { FontAwesome } from '@expo/vector-icons';
import { NODE_ENV, WEB_CLIENT_ID } from '@env';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
// import useLogin from "../hooks/useLogin";
// import { useAuth } from "../auth/provider";
import { Link, useRouter } from 'expo-router';
// import { signInWithGoogle } from "../auth/firebase";
// import { signInWithGoogle } from "../auth/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signInWithGoogle } from '../store/authStore';
import { InformUser } from '../utils/ToastUtils';
import useTheme from '../hooks/useTheme';
import { useForm } from 'react-hook-form';
import { InputText, InputTextRules } from '~/components/InputText';
import { Regex } from '~/utils/regex';
import useCustomStyles from '~/hooks/useCustomStyles';
import { useSession } from '../context/auth';
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const { sessionSignIn } = useSession();
  const styles = useCustomStyles(loadStyles);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const demoUser = {
    email: 'email52@email.com',
    password: '12345678',
  };

  const enableGoogleLogin = WEB_CLIENT_ID && WEB_CLIENT_ID !== '';

  const router = useRouter();

  const dispatch = useDispatch();

  // const { loginUserWithEmailAndPassword, loginUserWithGoogle } = useLogin();

  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);

  // if (user?._id) {
  //   InformUser({
  //     title: 'Login sucessfully',
  //     placement: 'top-right',
  //     duration: 3000,
  //     style: {
  //       backgroundColor: currentTheme.colors.textPrimary,
  //     },
  //   });
  //   router.push('/');
  // }
  if (error) {
    InformUser({
      title: 'Wrong-password',
      duration: 3000,
      placement: 'top-right',
      style: { backgroundColor: currentTheme.colors.error },
    });
  }

  // const { loginUserWithEmailAndPassword, loginUserWithGoogle } = useLogin();

  // Add Google auth-related variables
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID || 'default',
  });

  const auth = useSelector((state) => state.auth);

  // Add useEffect hook to listen for auth state changes
  useEffect(() => {
    if (auth.isLoggedIn) {
      // router.push("/");
    }
  }, [auth, router]);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      dispatch(signInWithGoogle({ idToken: id_token })).then(({ payload }) => {
        if (!payload) return;
        if (payload.token) {
          sessionSignIn(payload.token);
        }
      });
    }
  }, [response]);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [code, setCode] = useState("");

  // const [status, setStatus] = useState("login");
  // const [error, setError] = useState("");

  // const dispatch = useDispatch();

  // // const { signInWithEmailPasswordProvider, signInWithGoogleProvider } =
  // //   useAuth();

  // const { loginUserWithEmailAndPassword, loginUserWithGoogle } = useLogin();

  // const router = useRouter();

  // const [token, setToken] = useState("");
  // const [user, setUser] = useState(null);
  // const [accessToken, setAccessToken] = useState(null);

  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId: WEB_CLIENT_ID,
  // });

  /**
   * Handles the login process.
   *
   * @param {Object} data - The data object containing the email and password.
   * @return {void}
   */
  const handleLogin = (data) => {
    const { email, password } = data;
    dispatch(signIn({ email, password })).then(({ payload }) => {
      if (!payload) return;
      if (payload.token) {
        sessionSignIn(payload.token);
      }
    });
  };

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     loginUserWithGoogle(id_token);
  //   }
  // }, [response]);

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     setAccessToken(response.authentication.accessToken);
  //     accessToken && fetchUserInfo();
  //   }
  // }, [response, accessToken]);

  // const fetchUserInfo = async () => {
  //   let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   const userInfo = await response.json();
  //   setUser(userInfo);
  // };

  // useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { authentication } = response;
  //     const credential = app.auth.GoogleAuthProvider.credential(authentication.idToken, authentication.accessToken);
  //     app.auth().signInWithCredential(credential).then((userCredential) => {
  //       const user = userCredential.user;
  //       const email = user.email;
  //       loginUser.mutate({ email, password: "", from: "GoogleSignIn" });
  //       signIn({ email, password: "", from: "GoogleSignIn" });
  //       router.push("/");
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //   }
  // }, [response]);

  // const checkCode = () => {
  //   setError(null)
  //   Axios.post(`${api}/user/checkcode`, { email: email, code: code }).then((res) => {
  //     if (res.data.message == "success") {
  //       setStatus("confirm")
  //     } else {
  //       setError(res.data.message)
  //     }
  //   }).catch(() => {
  //     setError("Error on your browser")
  //   })
  // }
  // const emailExists = () => {
  //   setError(null)
  //   Axios.post(`${api}/user/emailexists`, { email: email }).then((res) => {
  //     if (res.data.message == "success") {
  //       setStatus("verification")
  //     } else {
  //       setError(res.data.message)
  //     }
  //   }).catch(() => {
  //     setError("Error on your browser")
  //   })
  // }
  // const updatePassword = () => {
  //   setError(null)
  //   Axios.post(`${api}/user/updatepassword`, { email: email, password: password }).then((res) => {
  //     if (res.data.message == "success") {
  //       setStatus("login")
  //     } else {
  //       setError(res.data.message)
  //     }
  //   }).catch(() => {
  //     setError("Error on your browser")
  //   })
  // }

  return (
    <RStack>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={{ paddingTop: '32px', width: '90%', maxWidth: '290px' }}>
          <RHeading fontSize={32} color="#212121" fontWeight="semibold">
            Welcome
          </RHeading>
          <RHeading
            color="grey"
            fontWeight="medium"
            fontSize={14}
            style={{ marginTop: '8px' }}
          >
            Sign in to continue!
          </RHeading>

          <RStack style={{ marginTop: '16px', gap: '8px' }}>
            <InputText
              label="Email ID"
              keyboardType="email-address"
              control={control}
              name="email"
              rules={InputTextRules.email}
            />
            <InputText
              label="Password"
              secureTextEntry
              control={control}
              name="password"
              rules={InputTextRules.password}
            />

            <RButton
              disabled={!isValid}
              onPress={handleSubmit(handleLogin)}
              style={{ marginTop: '16px' }}
              backgroundColor="mediumpurple"
            >
              Sign in
            </RButton>
            <RStack
              style={{
                marginTop: '16px',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <RText fontSize={14} color="grey">
                I'm a new user.
              </RText>
              <Link href="/register">
                <RText
                  style={{
                    color: '#818cf8',
                    fontWeight: 400,
                    fontSize: 12,
                  }}
                >
                  Sign Up
                </RText>
              </Link>
            </RStack>

            <RStack style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Link href="/password-reset">
                <RText
                  style={{
                    color: '#818cf8',
                    fontWeight: 400,
                    fontSize: 12,
                  }}
                >
                  Reset Password?
                </RText>
              </Link>
            </RStack>
            {/* Google Login starts */}
            <RStack
              style={{
                marginTop: '8px',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <RText color="grey" fontWeight="medium" fontSize={14}>
                Or
              </RText>
            </RStack>

            {/* Google Login */}
            {enableGoogleLogin && (
              <RStack
                style={{
                  marginTop: '8px',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <RIconButton
                  disabled={!request}
                  onPress={async () => await promptAsync()}
                  backgroundColor="red"
                  style={{ width: '100%', color: 'white' }}
                  icon={
                    <FontAwesome
                      name="google"
                      size={16}
                      color={currentTheme.colors.white}
                    />
                  }
                >
                  Sign in with Google
                </RIconButton>
              </RStack>
            )}

            {/* Demo Login for Development start */}
            {NODE_ENV !== 'production' && (
              <RStack
                style={{
                  marginTop: '8px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <RButton
                  style={{ width: '100%' }}
                  disabled={!request}
                  onPress={() => handleLogin(demoUser)}
                  backgroundColor="purple"
                >
                  Demo User
                </RButton>
              </RStack>
            )}
            {/* Demo Login for Development end */}
          </RStack>
        </View>
      </View>
    </RStack>
  );
}

const loadStyles = () => ({
  container: {
    marginTop: 20,
    height: 300,
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  map: {
    flex: 1,
    width: '90%',
  },
});
