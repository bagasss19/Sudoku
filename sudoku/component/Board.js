import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid"

export default function Board({ route, navigation }) {
    const [number, setNumber] = useState([])
    const { level, name } = route.params
    const [isLoading, setLoading] = useState(true)

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');

    function validate(number) {
        fetch('https://sugoku.herokuapp.com/validate', {
            method: 'POST',
            body: encodeParams(number),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.status)
                if (response.status == 'solved') {
                    Alert.alert("Good Job!", 'You solve this Puzzle!',
                        [
                            { text: "Ok", onPress: () =>  navigation.navigate('Finish', {
                                name
                            }) }
                        ])
                } else {
                    Alert.alert("This Puzzle is unsolved", "You put wrong answer")
                }
            })
            .catch(console.warn)
    }

    function solve(number) {
        setLoading(true)
        fetch('https://sugoku.herokuapp.com/solve', {
            method: 'POST',
            body: encodeParams(number),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setNumber({ board: response.solution })
                setLoading(false)
            })
            .catch(console.warn)
    }

    function fetchData() {
        fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
            .then(response => response.json())
            .then(data => {
                setNumber(data)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
        return <View style={styles.container}>
            <Text style={styles.title}>Loading...</Text>
        </View>
    }
    return (
        <View style={[styles.container]}>
            <Text style={{ padding: 10, fontSize: 42 }}> Level : {level} !</Text>
            <Text>{JSON.stringify(number.board)}</Text>


            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {number.board.map((x, i) =>
                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }} key={i}>
                        {x.map((y, a) => {
                            return <View
                                style=
                                {{
                                    width: 30, height: 30, backgroundColor: 'white',
                                    borderColor: "black", borderWidth: 1
                                }} key={a}>

                                <TextInput
                                    style={{ height: 30, textAlign: "center" }}
                                    // onChangeText={console.log("berubah")}
                                    maxLength={1}
                                    keyboardType={"numeric"}
                                    defaultValue={`${y}`} />

                            </View>

                        })}
                    </View>
                )}
            </View>


            <View style={styles.margin}>
            <Button
                onPress={() => {
                    validate(number)
                }}
                title="Finish"
                color="#841584"
            />
            </View>


            <View style={styles.margin2}>
            <Button
                onPress={() => {
                    solve(number)
                }}
                title="Solve"
                color="#841584"
            /></View>
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
    margin: {
        marginBottom: 10
    },
    margin2: {
        marginBottom: 30
    },
});
