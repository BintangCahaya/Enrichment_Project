import { Image } from "expo-image";
import { ImageSourcePropType } from "react-native";

type iconName = "bed" | "profile" | "google";

type iconProps = {
    name: iconName;
    size?: number;
    color?: string;
};

const icons : Record<iconName, ImageSourcePropType> =  {
    bed: require("../assets/images/bed.png"),
    profile: require("../assets/images/profile.png"),
    google: require("../assets/images/googleIcon.png"),
    // lamp: require("../assets/icons/lamp.png"),
};

export default function CustomIcon({name, size, color} : iconProps){

    return(
        <Image source={icons[name]} style={{height: size, width: size, tintColor: color}}/>
    );
}