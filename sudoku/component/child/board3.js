import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid"

export default function Board() {
    
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
