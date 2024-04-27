import { ScrollView, Text, View } from "react-native"
import Onboarding from "react-native-onboarding-swiper"
import Lottie from "lottie-react-native"
import tw from "twrnc"
import { useRef } from "react"
import { useNavigation } from "@react-navigation/native"

const OnboardingScreen = () => {
  const navigation = useNavigation()

  const animationsRef = useRef(null)
  const handleDone = () => {
    navigation.navigate("Main" as never)
  }

  return (
    <ScrollView>
      <View>
        <Onboarding
          onDone={handleDone}
          onSkip={() => navigation.navigate("Main" as never)}
          pages={[
            {
              backgroundColor: "#7077A1",
              image: (
                <View style={tw`w-[450px] h-[350px]`}>
                  <Lottie
                    style={tw`flex-1`}
                    ref={animationsRef}
                    source={require("../../assets/animations/todo3.json")}
                    autoPlay
                    loop
                  />
                </View>
              ),
              title: "lottie 1",
              subtitle: "Done with React Native Onboarding Swiper",
            },
            {
              backgroundColor: "#637A9F",
              image: (
                <View style={tw`w-[350px] mt-4 h-[350px]`}>
                  <Lottie
                    style={tw`flex-1`}
                    ref={animationsRef}
                    source={require("../../assets/animations/todo2.json")}
                    autoPlay
                    loop
                  />
                </View>
              ),

              title: "Onboarding",
              subtitle: "Done with React Native Onboarding Swiper",
            },
            {
              backgroundColor: "#424769",
              image: (
                <View style={tw`w-[350px]  h-[350px]`}>
                  <Lottie
                    style={tw`flex-1`}
                    ref={animationsRef}
                    source={require("../../assets/animations/todo1.json")}
                    autoPlay
                    loop
                  />
                </View>
              ),

              title: "Onboarding",
              subtitle: "Done with React Native Onboarding Swiper",
            },
          ]}
        />
      </View>
    </ScrollView>
  )
}

export default OnboardingScreen
