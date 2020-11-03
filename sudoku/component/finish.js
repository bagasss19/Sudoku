import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text,TextInput,  View, Button } from 'react-native'
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

export default function Home({ route, navigation }) {
    const { name } = route.params

    return (
        <View style={styles.container}>
                <Text style={{ padding: 10, fontSize: 42 }}> Congratulations, {name}! !</Text>

                
                <Button
                    onPress={() =>
                        navigation.navigate('Home')}
                    title="Back To Home"
                    color="#841584"
                />
                <StatusBar style="auto" />
            </View>
    );
}

const styles = StyleSheet.create({
                container: {
                flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
