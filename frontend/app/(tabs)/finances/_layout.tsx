import { Stack } from "expo-router";

export default function FinancesLayout(){
    return(
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: {backgroundColor: '#55C595'},
             headerTitleStyle: {fontFamily: 'LeagueSpartan_700Bold', fontSize: 24, fontWeight: 'bold', },
            headerTintColor: '#fff'
        }}>
            <Stack.Screen name="index" options={{title: 'Finance'}}/>
            <Stack.Screen name="transaction" options={{title: 'Transaction History'}}/>
        </Stack>
    );
}