import CustomDrawer from '@/components/customDrawer';
import { Drawer }  from 'expo-router/drawer';

export default function DrawerLayout(){
    return(
        <Drawer 
            screenOptions={{ 
                headerShown: false, 
                drawerActiveBackgroundColor: 'transparent',
                drawerActiveTintColor: "#55C595",
                drawerInactiveTintColor: "#2B2B2B", 
                drawerLabelStyle: {fontFamily: 'LeagueSpartan_400Regular', fontSize: 18},
                drawerStyle: {width: '70%'}
            }} 
            drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen 
                name="(tabs)"
                options={{
                    drawerLabel: 'Home',
                    drawerItemStyle: {display: 'none'}
                }}
            />
            <Drawer.Screen 
                name="editKos"
                options={{
                    drawerLabel: 'Kos Setting',
                }}
            />
            <Drawer.Screen 
                name="announcement"
                options={{
                    drawerLabel: 'Make Announcement',
                }}
            />
            <Drawer.Screen 
                name="kosAsset"
                options={{
                    drawerLabel: 'Assets',
                }}
            />
        </Drawer>
    );
}