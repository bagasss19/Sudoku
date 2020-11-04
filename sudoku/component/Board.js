import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { FETCHBOARD, SETLOADING, GETBOARD } from '../redux'

export default function Board({ route, navigation }) {
    const board = useSelector(state => state.boards)
    // const number2 = useSelector(state => state.boards2)
    const isLoading = useSelector(state => state.loading)
    const dispatch = useDispatch()
    const { level, name } = route.params
    const [board2, setBoard] = useState([])
    //[[9,1,2,8,3,7,5,6,4],[3,4,5,1,2,6,7,8,9],[6,7,8,4,5,9,1,2,3]]

    function editBoard(x, y, val) {
        let tempBoard = JSON.parse(JSON.stringify(board2))
        console.log(tempBoard, "<<<<ASastempboardd")
        tempBoard.board[x][y] = Number(val)
        setBoard(tempBoard)
    }



    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');

    function validate(board) {
        fetch('https://sugoku.herokuapp.com/validate', {
            method: 'POST',
            body: encodeParams(board),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.status)
                if (response.status == 'solved') {
                    Alert.alert("Good Job!", 'You solve this Puzzle!',
                        [
                            {
                                text: "Ok", onPress: () => navigation.navigate('Finish', {
                                    name
                                })
                            }
                        ])
                } else {
                    Alert.alert("This Puzzle is unsolved", "You put wrong answer")
                }
            })
            .catch(console.warn)
    }

    function solve(board) {
        dispatch(SETLOADING(true))
        fetch('https://sugoku.herokuapp.com/solve', {
            method: 'POST',
            body: encodeParams(board),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.solution, "<<<<Sasas")
                dispatch(GETBOARD({ board: response.solution }))
                dispatch(SETLOADING(false))
            })
            .catch(console.warn)
    }

    useEffect(() => {
        dispatch(FETCHBOARD(level))
    }, [])

    useEffect(() => {
        setBoard(board)
    }, [board])

    if (isLoading) {
        return <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    }
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={[styles.container, { flex: 1 }]}>

                <Text style={{ padding: 10, fontSize: 42 }}> Level : {level}</Text>
                <Text>{JSON.stringify(board2 && board2.board)}</Text>


                <View style={[styles.margin, { flex: 1, flexDirection: 'row', flexWrap: 'wrap' }]}>
                    {board.board.map((x, i) =>
                        <View style={{ width: '33%', flexDirection: 'row', flexWrap: 'wrap', borderWidth: 2 }} key={i}>
                            {x.map((y, a) => {
                                return <View
                                    style=
                                    {{
                                        width: "33.3%", height: 50, backgroundColor: 'white',
                                        borderColor: "black", borderWidth: 1
                                    }} key={a}>

                                    <TextInput
                                        style={{ height: 50, textAlign: "center" }}
                                        onChangeText={value => {
                                            console.log(i, a, "<<<<<< x dan y")
                                            editBoard(i, a, value)
                                        }
                                        }
                                        maxLength={1}
                                        keyboardType={"numeric"}
                                        defaultValue={`${y}`}
                                        editable={y > 0 ? false : true} 
                                        />

                                </View>
                            })}
                        </View>
                    )}
                </View>


                <View style={[styles.margin, { alignItems: "center" }]}>
                    <Button
                        onPress={() => {
                            solve(board)
                        }}
                        title="Solve"
                        color="#841584"
                    /></View>

                <View style={[styles.margin2, { alignItems: "center" }]}>
                    <Button
                        onPress={() => {
                            validate(board2)
                        }}
                        title="Finish"
                        color="#841584"
                    />
                </View>

            </View>
        </ScrollView>
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
        marginBottom: 20
    },
    margin2: {
        marginBottom: 30
    }
});
