import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { SETLEADERBOARD } from '../redux'

export default function Finish({ route, navigation }) {
    const { name, seconds } = route.params
    const leaderBoard = useSelector(state => state.leaderBoards)
    const dispatch = useDispatch()
    console.log(leaderBoard, "<<<<<<<<Dadadda")

    return (
        <View style={styles.container}>
            <Text style={{ padding: 10, fontSize: 42 }}> Congratulations, {name}!!! {seconds}</Text>
            <Text style={{ padding: 10, fontSize: 42 }}> LeaderBoards : {JSON.stringify(leaderBoard)}</Text>

            {leaderBoard && leaderBoard.map((x,i) => {
                    <View key={i}>
                        <Text style={{ padding: 10, fontSize: 22 }}>{x.name}  {x.seconds}</Text>

                    </View>
            })}
            
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
