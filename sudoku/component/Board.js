import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid"

export default function Board() {
    const [number, setNumber] = useState([])
    // const [board, setBoard] = useState([])

    function board(number) {
        let newnum = number.board
        console.log(newnum.toString(), "<<<<<<<<<<newnum")
        let numstring = newnum.toString().replaceAll(',', '')
        console.log(numstrin, "<<<<<<<<<<NUMSTRING")
        let arr = []
        let count = 0
        for (let i = 0; i < 9; i++) {
            let tmp = []
            for (let j = 0; j < 9; j++) {
                tmp.push(numstring[count])
                count++
            }
            arr.push(tmp)
        }
        console.log(arr, "<<<<<<<<HASIL ARR")
        return arr
    }
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
                alert(response.status)
            })
            .catch(console.warn)
    }

    useEffect(() => {
        fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
            .then(response => response.json())
            .then(data => {
                setNumber(data)
                board(data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    return (
        <View style={styles.container}>
            <Text>{JSON.stringify(number.board)}</Text>
            {/* <Text>{JSON.stringify(board(number))}</Text> */}
            {/* <Grid>
                <Col><Text>1</Text></Col>
                <Col><Text>1</Text></Col>
                <Col><Text>1</Text></Col>
                
            </Grid>
            <Grid>
                <Col><Text>1</Text></Col>
                <Col><Text>1</Text></Col>
                <Col><Text>1</Text></Col>
            </Grid>
            <Grid>
                <Col><Text>1</Text></Col>
                <Col><Text>1</Text></Col>
                <Col><Text>1</Text></Col>
            </Grid> */}



            <Button
                onPress={() => {
                    validate(number)
                }}
                title="Finish"
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
