import { StatusBar } from 'expo-status-bar';
import React, { useEffect , useState} from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native'
import { useSelector , useDispatch} from 'react-redux'
import { DEFAULT } from '../redux'

export default function Leaderboards({ navigation }) {
    const leaderBoard = useSelector(state => state.leaderBoards)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    console.log(leaderBoard, "<<<<<<<<Dadadda")


    // if (loading) {
    //     return <View style={styles.container}>
    //         <ActivityIndicator size="large" />
    //         <Text>Loading...</Text>
    //     </View>
    // }
    // useEffect(() => {
    //     dispatch(DEFAULT())
    //     setLoading(false)
    
    // }, [])
   
    return (
        <View style={styles.container}>
            <Text style={{ padding: 10, fontSize: 42 }}> LeaderBoards : {JSON.stringify(leaderBoard)}</Text>

            {leaderBoard && leaderBoard.maps ((x,i) => {
                    <View>
                        <Text>{x.name}          {x.seconds}</Text>

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
